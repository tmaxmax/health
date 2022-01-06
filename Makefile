include .env

DB_CONTAINER_NAME=health-database
DB_IMAGE_TAG=14-alpine
db_volume=$(DB_CONTAINER_NAME)-data

db-start:
	docker run \
		--rm \
		--name $(DB_CONTAINER_NAME) \
		--env POSTGRES_DB=${VITE_PG_DB} \
		--env POSTGRES_USER=${VITE_PG_USER} \
		--env POSTGRES_PASSWORD=${VITE_PG_PASSWORD} \
		--publish ${VITE_PG_PORT}:5432 \
		--mount type=volume,source=$(db_volume),destination=/var/lib/postgresql/data \
		--detach \
		postgres:$(DB_IMAGE_TAG)	
	@echo Database started! Connect to it using postgres://${VITE_PG_USER}:${VITE_PG_PASSWORD}@${VITE_PG_HOSTNAME}:${VITE_PG_PORT}/${VITE_PG_DB}

db-attach:
	docker attach $(DB_CONTAINER_NAME)

db-stop:
	docker stop $(DB_CONTAINER_NAME)

clean-db:
	docker rm --force $(DB_CONTAINER_NAME)
	docker volume rm $(db_volume)

clean-kit:
	rm -rf .svelte-kit

clean-npm:
	rm -rf node_modules

clean: clean-db clean-kit clean-npm

.PHONY: db-start db-attach db-stop clean-db clean-kit clean-npm clean
