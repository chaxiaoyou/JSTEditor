import {
  EventStreamContentType,
  fetchEventSource,
} from '@fortaine/fetch-event-source';
import dayjs from 'dayjs';
export enum ModuleOutputKeyEnum {
  // common
  userChatInput = 'userChatInput',
  finish = 'finish',
  responseData = 'responseData',
  history = 'history',
  answerText = 'answerText', //  answer module text key
  success = 'success',
  failed = 'failed',
  text = 'system_text',
  addOutputParam = 'system_addOutputParam',

  // dataset
  datasetIsEmpty = 'isEmpty',
  datasetUnEmpty = 'unEmpty',
  datasetQuoteQA = 'quoteQA',

  // context extract
  contextExtractFields = 'fields',

  // tf switch
  resultTrue = 'system_resultTrue',
  resultFalse = 'system_resultFalse',
}

const getErrText = (err: any, def = '') => {
  const msg: string = typeof err === 'string' ? err : err?.message || def || '';
  if (msg) {
    console.log('error =>', msg);
  }
  return msg;
};

enum sseResponseEventEnum {
  error = 'error',
  answer = 'answer', // animation stream
  response = 'response', // direct response, not animation
  moduleStatus = 'moduleStatus',
  appStreamResponse = 'appStreamResponse', // sse response request
}

type StartChatFnProps = {
  chatList: any[];
  messages: any[];
  controller: AbortController;
  variables: Record<string, any>;
  generatingMessage: (e: any) => void;
};

type StreamFetchProps = {
  url?: string;
  data: Record<string, any>;
  onMessage: StartChatFnProps['generatingMessage'];
  headers: any;
  abortCtrl: AbortController;
};
type StreamResponseType = {
  responseText: string;
  [ModuleOutputKeyEnum.responseData]: any[];
};
export const streamFetch = ({
  url = '/api/oa-ai/api/v1/chat/completions',
  data,
  onMessage,
  headers,
  abortCtrl,
}: StreamFetchProps) =>
  new Promise<StreamResponseType>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      abortCtrl.abort('Time out');
    }, 60000);

    // response data
    let responseText = '';
    let remainText = '';
    let errMsg = '';
    let responseData: any[] = [];
    let finished = false;

    const failedFinish = (err?: any) => {
      finished = true;
      reject({
        message: getErrText(err, errMsg || '响应过程出现异常~'),
        responseText,
      });
    };

    const finish = () => {
      if (errMsg) {
        return failedFinish();
      }
      return resolve({
        responseText,
        responseData,
      });
    };

    // animate response to make it looks smooth
    function animateResponseText() {
      // abort message
      if (abortCtrl.signal.aborted) {
        onMessage({ text: remainText });
        responseText += remainText;
        return finish();
      }

      if (remainText) {
        const fetchCount = Math.max(1, Math.round(remainText.length / 60));
        const fetchText = remainText.slice(0, fetchCount);

        onMessage({ text: fetchText });

        responseText += fetchText;
        remainText = remainText.slice(fetchCount);
      }

      if (finished && !remainText) {
        return finish();
      }

      requestAnimationFrame(animateResponseText);
    }
    // start animation
    animateResponseText();

    try {
      // auto complete variables
      const variables = data?.variables || {};
      variables.cTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

      const requestData = {
        method: 'POST',
        headers: headers,
        signal: abortCtrl.signal,
        body: JSON.stringify({
          ...data,
          variables,
          detail: true,
          stream: true,
        }),
      };

      // send request
      fetchEventSource(url, {
        ...requestData,
        async onopen(res) {
          clearTimeout(timeoutId);
          const contentType = res.headers.get('content-type');

          // not stream
          if (contentType?.startsWith('text/plain')) {
            return failedFinish(await res.clone().text());
          }

          // failed stream
          if (
            !res.ok ||
            !res.headers
              .get('content-type')
              ?.startsWith(EventStreamContentType) ||
            res.status !== 200
          ) {
            try {
              failedFinish(await res.clone().json());
            } catch {
              failedFinish(await res.clone().text());
            }
          }
        },
        onmessage({ event, data }) {
          if (data === '[DONE]') {
            return;
          }

          // parse text to json
          const parseJson = (() => {
            try {
              return JSON.parse(data);
            } catch (error) {
              return {};
            }
          })();

          if (event === sseResponseEventEnum.answer) {
            const text: string = parseJson?.choices?.[0]?.delta?.content || '';
            remainText += text;
          } else if (event === sseResponseEventEnum.response) {
            const text: string = parseJson?.choices?.[0]?.delta?.content || '';
            onMessage({ text });
            responseText += text;
          } else if (
            event === sseResponseEventEnum.moduleStatus &&
            parseJson?.name &&
            parseJson?.status
          ) {
            onMessage(parseJson);
          } else if (
            event === sseResponseEventEnum.appStreamResponse &&
            Array.isArray(parseJson)
          ) {
            responseData = parseJson;
          } else if (event === sseResponseEventEnum.error) {
            errMsg = getErrText(parseJson, '流响应错误');
          }
        },
        onclose() {
          finished = true;
        },
        onerror(e) {
          clearTimeout(timeoutId);
          failedFinish(getErrText(e));
        },
        openWhenHidden: true,
      });
    } catch (err: any) {
      clearTimeout(timeoutId);

      if (abortCtrl.signal.aborted) {
        finished = true;

        return;
      }
      console.log(err, 'fetch error');

      failedFinish(err);
    }
  });
