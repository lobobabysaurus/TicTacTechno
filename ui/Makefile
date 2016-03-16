JSBIN = node_modules/.bin
GULP = $(JSBIN)/gulp

gulp:
	$(GULP) $(COMMAND)

deploy: build
	aws s3 cp build/ s3://www.tictactechno.com --recursive

build:
	$(GULP) build

.PHONY: gulp build deploy
