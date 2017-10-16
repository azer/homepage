BIN=$(shell pwd)/node_modules/.bin

develop:
	@clear
	@$(BIN)/gatsby develop

install:
	@npm install

generate-album:
	@KEY=$(key) node generate-album

post:
	@clear
	@node generate-post.js

build:
	@$(BIN)/gatsby build

deploy:
	@$(MAKE) build
	@cd public && rm *.map
	@cd public && tar -cvf build.tar.gz *
	@scp public/build.tar.gz $(server):$(path)/.
	@ssh $(server) "cd $(path) && tar -xvf build.ta"
