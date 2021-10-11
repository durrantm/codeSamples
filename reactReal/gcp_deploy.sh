#!/bin/bash
printf "\n"
printf "**********************\n"
printf "* GCP deploy started *\n"
printf "**********************\n\n"
cp -v package.json package.json.save
test -f package.gcp_deploy.json && cp package.gcp_deploy.json package.json
npm run build
firebase deploy
mv -fv package.json.save package.json
printf "\nApp has been deployed to GCP\n\n"
printf "**********************\n"
printf " GCP deploy complete *\n"     
printf "**********************\n\n"