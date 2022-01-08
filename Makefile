include .env

DB_CONNECTION_STRING=postgres://${VITE_PG_USER}:${VITE_PG_PASSWORD}@${VITE_PG_HOSTNAME}:${VITE_PG_PORT}/${VITE_PG_DB}?sslmode=disable
DB_CONTAINER_NAME=health-database
DB_IMAGE_TAG=14-alpine
db_volume=$(DB_CONTAINER_NAME)-data

db-start:
	docker run \
		--detach \
		--rm \
		--name $(DB_CONTAINER_NAME) \
		--env POSTGRES_DB=${VITE_PG_DB} \
		--env POSTGRES_USER=${VITE_PG_USER} \
		--env POSTGRES_PASSWORD=${VITE_PG_PASSWORD} \
		--publish ${VITE_PG_PORT}:5432 \
		--mount type=volume,source=$(db_volume),destination=$(pg_dir)/data \
		postgres:$(DB_IMAGE_TAG)
	@echo Database started! Connect to it using '$(DB_CONNECTION_STRING)'

db-attach:
	docker attach $(DB_CONTAINER_NAME)

db-stop:
	docker stop $(DB_CONTAINER_NAME)

db-clean:
	docker rm --force $(DB_CONTAINER_NAME)
	docker volume rm $(db_volume)

migrations_dir=./db/migrations

migrate-create:
	migrate create -dir $(migrations_dir) -seq -ext sql $(NAME)

migrate-up:
	migrate -path $(migrations_dir) -database $(DB_CONNECTION_STRING) up $(N)

migrate-down:
	migrate -path $(migrations_dir) -database $(DB_CONNECTION_STRING) down $(N)

migrate-drop:
	migrate -path $(migrations_dir) -database $(DB_CONNECTION_STRING) drop

migrate-goto:
	migrate -path $(migrations_dir) -database $(DB_CONNECTION_STRING) goto $(V)

migrate-version:
	migrate -path $(migrations_dir) -database $(DB_CONNECTION_STRING) version

.PHONY: db-start db-attach db-stop db-clean migrate-create migrate-up migrate-down migrate-drop migrate-goto migrate-version
