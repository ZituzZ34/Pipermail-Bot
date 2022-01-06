## Pipermail-Bot

Pipermail-bot is a bot that consumes pipermail lists, using them to send notifications every time there is a new message

## Use or Develop Bot

Clone the repository:

    git clone https://github.com/ZituzZ34/Pipermail-Bot


Install Dependecies:

    npm install


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


