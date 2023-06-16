#!/bin/bash
git checkout -b predev
git reset --soft `git log origin/master --oneline | tail -1 | awk '{print $1}'`
git add -A
git commit -m "deploy on `date +"%Y-%m-%dT%H:%M:%S%:z"`"
git push origin `git subtree split --prefix dist predev`:deploy --force
git checkout master
git branch -D predev