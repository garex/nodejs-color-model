#!/usr/bin/env bash

find ../lib -type f > list.txt
java -jar njsdoc-0.0.7.jar --list --html list.txt >  index.html

