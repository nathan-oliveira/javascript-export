echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "vingador", "age": "80"}' #correct!

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "vingador", "age": "18"}' #age incorrect!