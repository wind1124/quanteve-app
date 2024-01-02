#!/bin/bash

current_version=`grep "\"version\"" package.json`
echo "当前版本号为: ${current_version#*:}"

read -p "请输入新版本号（eg: 1.0.0）:" version

# 一.替换 package.json 版本号
oldLine=`grep "\"version\"" package.json`
newLine='  "version": "'${version}'",'

sed -i "" "s/${oldLine}/${newLine}/g" package.json

# 二.替换 workflow android 版本号
# vname
android_release_line=`grep "VERSION_NAME:" .github/workflows/assemble_android_release.yml`
android_line="  VERSION_NAME: ${version}"

sed -i "" "s/${android_release_line}/${android_line}/g" .github/workflows/assemble_android_release.yml

# vcode
vcode="`echo $version | tr -d '.'`00"
android_release_line=`grep "VERSION_CODE:" .github/workflows/assemble_android_release.yml`
android_line="  VERSION_CODE: ${vcode}"

sed -i "" "s/${android_release_line}/${android_line}/g" .github/workflows/assemble_android_release.yml

# fix: https://github.com/fastlane/fastlane/issues/20458
# todo: remove this, and use the next code
#        versionCode 1
#        versionName "1.0"
android_version_code_line=`grep "        versionCode " android/app/build.gradle`
android_version_name_line=`grep "        versionName " android/app/build.gradle`
android_new_version_code_line="        versionCode ${vcode}"
android_new_version_name_line="        versionName \"${version}\""

sed -i "" "s/${android_version_code_line}/${android_new_version_code_line}/g" android/app/build.gradle
sed -i "" "s/${android_version_name_line}/${android_new_version_name_line}/g" android/app/build.gradle
