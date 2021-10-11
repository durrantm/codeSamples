cd ..
rm -rf "run_results.txt"
for i in `seq 5`;
  do
    rspec spec/* --tag smoke --format=documentation >> run_results.txt
  done