# From Ubuntu LTS
FROM node:18.13.0

RUN npm install -g npm@9.4.2

# Install assimp
RUN apt-get update && apt-get install  libassimp-dev assimp-utils time -y

# Create user
RUN useradd -ms /bin/bash hxdr

# Switch user
USER hxdr
WORKDIR /home/hxdr

COPY ./task.sh .
COPY ./index.js .
COPY ./package.json .
RUN npm install

CMD "./task.sh"