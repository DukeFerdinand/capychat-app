#!/bin/bash

# This script is used to build the Android app.
# It is called from the root directory of the project.
# Path: build-android.sh

set -e

yarn build:android
# Not sure if this is needed
rm -rf android/app/src/main/res/drawable-*

cd ./android
./gradlew assembleRelease
