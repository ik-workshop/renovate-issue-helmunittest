SHELL = /bin/sh -o pipefail
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

# CI_RENOVATE_DOCKER := renovate/renovate:37.33.3-full
# try with 36.40.3-full
CI_RENOVATE_DOCKER := renovate/renovate:36.40.3-slim

DOCKER_HELM_UNITITEST_IMAGE := helmunittest/helm-unittest:3.12.0-0.3.3

LOG_LEVEL := debug

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run: ## Nothing to RUN yet
	@docker run --rm -it \
		-e RENOVATE_TOKEN \
		-e LOG_LEVEL=$(LOG_LEVEL) \
		-v ${PWD}/config.js:/usr/src/app/config.js \
		-v ${PWD}/repos.json:/usr/src/app/repos.json \
		$(CI_RENOVATE_DOCKER) renovate --dry-run=false
