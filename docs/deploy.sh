#!/usr/bin/env sh

# abort on errors
set -e

# copy changes.md
cp ../changes.md ./zh/

# build
npm run docs:build
#vuepress build .

ossutil rm oss://jsteditor-docs/ -rf
ossutil cp -rf assets/image oss://jsteditor-docs/assets/image
ossutil cp -rf .vitepress/dist  oss://jsteditor-docs/
