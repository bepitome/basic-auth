## Run the server locally
run:
	docker-compose -f docker-compose.yaml up -d

## Stop the server
stop:
	docker container stop mongo-express
	docker container stop mongodb