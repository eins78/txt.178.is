#!/bin/sh

FILE="$1"

pandoc -i "$FILE" -o "${FILE}.html" -t html5 --section --template=.papermill/template.html