# From Ubuntu LTS
FROM node:18.13.0
RUN apt-get update

RUN npm install -g npm@9.2.0

# Install assimp
RUN apt-get install -y libassimp-dev && apt-get install -y assimp-utils 

# Create user
RUN useradd -ms /bin/bash hxdr

# Switch user
USER hxdr
WORKDIR /home/hxdr

RUN cp /usr/lib/x86_64-linux-gnu/libGL.so.1 /home/hxdr/lib


COPY ./task.sh .
COPY ./index.js .
COPY ./package.json .
RUN npm install

CMD "./task.sh"