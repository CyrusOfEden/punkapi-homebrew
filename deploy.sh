#!/usr/bin/env sh

set -e

yarn run build

cd dist

git init
git add -A
git commit -m 'Deploy'

git push -f git@github.com:knrz/punkapi-homebrew.git master:gh-pages

cd -
