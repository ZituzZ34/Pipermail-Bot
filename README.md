## Pipermail-Bot

Pipermail-bot is a bot that consumes pipermail lists, using them to send notifications every time there is a new message

## Use or Develop Bot

Clone the repository:

    git clone https://github.com/ZituzZ34/Pipermail-Bot


Install Dependecies:

    npm install

Node version:

Requires node v16 or higher.

Set config

    cd src/config
    touch index.ts

Now look at the config/types interface and make your own config in index.ts

Create directories

    mkdir data
    cd data
    mkdir mails
    mkdir database

Run project

    npm run compile
    npm run start


## Docker

Building the docker image:

1) Ensure the project has been compiled (see above)

2) Build:

    docker build -t pipermail-bot:latest -f docker/Dockerfile.pipermail-bot .

3) Run:

    docker run -it \
        -v $( pwd )/data/database:/root/pipermail-bot/data/database \
	    -v $( pwd )/data/mails:/root/pipermail-bot/data/mails \
        -v $( pwd )/data/config/config.json:/root/pipermail-bot/config.json \
        pipermail-bot:latest

