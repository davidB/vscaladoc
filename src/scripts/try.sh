#!/bin/sh
rm -rf docs
mkdir docs
SRC_HOME="$1"
DIST_HOME=/Users/robey/code/scala/vscaladoc-read-only/dist/@DIST_NAME@
java -jar $DIST_HOME/@DIST_NAME@.jar -classpath @DIST_CLASSPATH@ -d docs -sourcepath $SRC_HOME -format-markdown $(find $SRC_HOME -name '*.scala' -print)
