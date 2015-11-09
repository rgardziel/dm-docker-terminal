.PHONY: fake
build:
	docker build -t dindterm dindterm

# this is the webserver/npm process - each connection should then
# create a new dind container for each user
run: stop
	docker run -d -it -p 3000:3000 --name term --privileged dindterm

stop:
	docker rm -vf term || true

butterfly:
	docker run \
    --env PASSWORD=hairy \
    --env PORT=57575 \
    -p 3000:57575 \
    -d garland/butterfly

fake:
	docker run --name some-nginx -v $(CURDIR)/fake/:/usr/share/nginx/html:z -d -p 80:80 -p 443:443 nginx

fake-s3:
	docker build -t fake-s3 -f Dockerfile.fake-s3 .
	docker run --rm -it --env-file aws.env fake-s3 bash
