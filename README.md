# Steam More-Like-This

> This service displays related games based on the tags each game is assigned so users can browse games that are more likely to suit their interests

## Related Projects
  You can find the updated versions of this project here:
  - https://github.com/rpt26-sdc-prototype

  You can find original version of this project here:
  - https://github.com/rpt26-fec-pathfinder/anthony-photo-gallery-service
  - https://github.com/rpt26-fec-pathfinder/james-metadata-service
  - https://github.com/rpt26-fec-pathfinder/calvin-more-like-this-service
  - https://github.com/rpt26-fec-pathfinder/tim-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
Updated usage:

Original usage:
> Assuming you have webpack and mongo on your computer already.
> If you are using Mongo, you will need to change the path in mongoose.connect() to your personal path. File is in database/index.js.
> Run seed script by typing 'npm run seed' in terminal
> Run build script by typing 'npm run build' in terminal
> Start server by typing 'npm run start' in terminal

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install -g mongodb
npm install
```
## API
See the web sequence diagram here:
https://www.websequencediagrams.com/files/render?link=UsLeSPKAIkX15x3pasLFXnhy9t1ge6LgJJVQybFFDuUHUvOUPlPkVp5gjPThaXG5

GET /:id
Send HTML file for that game based on ID

GET /morelikethis/:id
Send array of similar games' data
If no game data can be acquired, default text is sent

{
  id: integer,
  title: string,
  price: integer,
  releaseDate: string,
  reviewCount: integer,
  reviewRating: string,
  headerImage: string,
  gallery: [strings]
}

Note that if data is unavailable, price will be a string

POST /morelikethis
Used by a service that handles adding new games to the Steam shop
Expected data: JSON object

{
  id: integer,
  tags: [strings],
  similarGames: [integers]
}

Send back success or error
