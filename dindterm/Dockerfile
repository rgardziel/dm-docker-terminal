FROM tianon/dind
MAINTAINER Sven Dowideit <SvenDowideit@home.org.au>

RUN apt-get update && apt-get install -yq npm
RUN apt-get install -yq nodejs-legacy

WORKDIR /webterm

# get the dependencies
ADD package.json /webterm/
RUN npm install

# add the rest of the source
ADD . /webterm

WORKDIR /root
ADD bashrc /root/.bashrc

CMD /webterm/start.sh
