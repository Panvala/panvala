# Helpers for common tasks
start-db:
	./scripts/dev/start-db.sh

deploy-api:
	./scripts/deploy-api.sh ${ENVIRONMENT}

deploy-frontend:
	./scripts/deploy-frontend.sh ${ENVIRONMENT}

publish-api:
	./scripts/build-api.sh
	./scripts/publish-api.sh

publish-frontend:
	./scripts/build-frontend.sh
	./scripts/publish-frontend.sh
