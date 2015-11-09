
default:
	docker build -t command .
	docker run --rm -v $(CURDIR):/data \
		-v /usr/bin/docker-static:/usr/bin/docker \
		-v /var/run/docker.sock:/var/run/docker.sock \
		command

shell:
	docker run -v $(CURDIR):/data \
		--rm -it \
		-v /usr/bin/docker-static:/usr/bin/docker \
		-v /var/run/docker.sock:/var/run/docker.sock \
		--entrypoint bash \
		command
