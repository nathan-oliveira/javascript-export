IMAGE_URL=""
BACKGROUND_URL=""

curl "http://localhost:3000/joinImages?url=$IMAGE_URL&background=$BACKGROUND_URL"
autocannon --renderStatusCode -c500 "http://localhost:3000/joinImages?url=$IMAGE_URL&background=$BACKGROUND_URL"
