include .env

build:
	@docker compose build --no-cache

up:
	@docker compose up -d

watch:
	@docker compose up

down:
	@docker compose down

restart:
	@docker compose down
	@docker compose up -d

a :=
logs:
	@docker logs -f $(a)

logs-app:
	@make logs a=expoferr-web-app

logs-server:
	@make logs a=expoferr-web-server

a :=
c :=
exec:
	@docker compose exec $(a) $(c)

npm-prune:
	@make exec a=expoferr-web-app c="npm prune"

npm-build:
	@make exec a=expoferr-web-app c="npm run build"

b ?=
npm-install:
	@make exec a=expoferr-web-app c="npm install $(b)"

update:
	@make npm-install
	@make npm-build
	@make npm-prune
	@make restart

up ?=
watch ?=
install:
	@make build
	@echo
	@echo "Expoferr Bio Spot Web fully installed!"
	@echo
ifdef up
	@make up
else ifdef watch
	@make watch
endif
