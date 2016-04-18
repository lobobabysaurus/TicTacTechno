.PHONY: clean
clean:
	rm -r dist

.PHONY: dist
dist: clean
	mkdir dist/
	zip -r dist/default.zip . .ebextensions

.PHONY: list_routes
list_routes:
	python manage.py list_routes

.PHONY: refresh_db
refresh_db:
	python manage.py refresh_db

.PHONY: serve
serve:
	python application.py

.PHONY: test
test:
	nosetests --failed

.PHONY: beanstalk_s3_dist
beanstalk_s3_dist: dist
	aws s3 cp dist/default.zip s3://tictactechnoapi/$(VERSION).zip

.PHONY: beanstalk_dist
beanstalk_dist: beanstalk_s3_dist
	aws elasticbeanstalk create-application-version \
		--application-name TicTacTechno \
		--version-label $(VERSION) \
		--description '$(VERSION)' \
		--source-bundle S3Bucket=tictactechnoapi,S3Key=$(VERSION).zip

.PHONY: beanstalk_deploy
beanstalk_deploy: beanstalk_dist
	aws elasticbeanstalk update-environment \
		--environment-name TicTacTechnoApi \
		--version-label $(VERSION) \
		--description build-$(VERSION)
