docker run \
  --name postgres \
  -e POSTGRES_USER=nathan
  -e POSTGRES_PASSWORD="senha001"
  -e POSTGRES_DB=heroes \
  -p 5432:5432
  -d \
  postgres

docker logs postgres

docker exec -it postgres psql --username nathan --dbname heroes

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);

SELECT * FROM warriors;

#mongodb

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=nathan \
  -e MONGO_INITDB_ROOT_PASSWORD=senha001
  -p 27017:27017 \
  -d \
  mongo:4

docker logs mongodb
