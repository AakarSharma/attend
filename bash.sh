#!/bin/bash
rm /home/aakar/Design\ Project/attend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
ionic cordova build --release android
echo password|jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore /home/aakar/Design\ Project/attend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
rm attend.apk
zipalign -v 4 /home/aakar/Design\ Project/attend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk attend.apk
adb install attend.apk