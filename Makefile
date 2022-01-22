include .env

DB_CONNECTION_STRING=postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=disable
DB_CONTAINER_NAME=health-database
DB_IMAGE_TAG=14-alpine
db_volume=$(DB_CONTAINER_NAME)-data

db-start:
	docker run \
		--detach \
		--rm \
		--name $(DB_CONTAINER_NAME) \
		--env POSTGRES_DB=${PGDATABASE} \
		--env POSTGRES_USER=${PGUSER} \
		--env POSTGRES_PASSWORD=${PGPASSWORD} \
		--publish ${PGPORT}:5432 \
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

migrations_dir=$(shell pwd)/db/migrations
migrations_container_dir=/migrations

migrate_cmd=docker run -i --mount type=bind,source=$(migrations_dir),destination=$(migrations_container_dir) --network host migrate/migrate
migrate_exec_cmd=$(migrate_cmd) -path=$(migrations_container_dir) -database $(DB_CONNECTION_STRING)

migrate-create:
	$(migrate_cmd) create -dir $(migrations_container_dir) -seq -ext sql $(NAME)

migrate-up:
	$(migrate_exec_cmd) up $(N)

migrate-down:
	$(migrate_exec_cmd) down $(N)

migrate-drop:
	$(migrate_exec_cmd) drop

migrate-goto:
	$(migrate_exec_cmd) goto $(V)

migrate-version:
	$(migrate_exec_cmd) version

jwk:
	node generate-jwk.js

.PHONY: db-start db-attach db-stop db-clean migrate-create migrate-up migrate-down migrate-drop migrate-goto migrate-version
