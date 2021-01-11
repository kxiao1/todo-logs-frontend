#!/bin/sh
file="./src/constants.js"
echo "export const modes = { daily: ${1}, weekly: ${2} };" > ${file}
echo "export const serverAdd = \"${3}\";" >> ${file}
echo "export const authAdd = \"${4}\";" >> ${file}
echo "export const user = { username: \"${5}\", password: \"${6}\" };" >> ${file}
