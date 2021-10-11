#!/bin/sh

RIGHT_NOW=`date`

cd 'C:\Users\c60704\code\automate_cerberus_sit\'
bundle exec rspec spec/ola/forms/bar_study_loan_form_spec.rb --tag happy

if [ $?  -ne 0 ]; then
  echo "<html>
  <head>
    <style type=\"text/css\">
      .center { display: block; margin-left: auto; margin-right: auto; width: 30%; }
      body { background-color: red }
    </style>
  </head>
  <h1 class=\"center\">Test Ran: ${RIGHT_NOW}</h1>
  <body><img src=\"C:/Users/c60704/Pictures/failure.png\" class=\"center\"></body>
  </html>" > qa3_status.html
  start qa3_status.html
  exit 1
else
  echo "<html>
  <head>
    <style type=\"text/css\">
      .center { display: block; margin-left: auto; margin-right: auto; width: 30%; }
      body { background-color: green  }
    </style>
  </head>
  <h1 class=\"center\">Test Ran: ${RIGHT_NOW}</h1>
   <body><img src=\"C:/Users/c60704/Pictures/success.jpg\" class=\"center\"></body>
  </html>" > qa3_status.html
  start qa3_status.html
  exit 0
fi
