const {
  createCSVmysqlDrain,
  createCSVgamesDrain,
  createCSVtags_gamesDrain,
  createCSVsimilarDrain
} = require('./newIndex.js');

// createCSVtags();
// createCSVmysql();
// createCSVmysqlDrain();

const fs = require('fs');
const csv = require('csv-write-stream');
const writeDoc = csv();
const {createRandomTags, createRandomConnections, tagsArray} = require('./tags_connections.js');

// const gamesStream = fs.createWriteStream('games.csv');
// var dataGames = 'id\n';
// gamesStream.write(dataGames, 'utf8');

// createCSVgamesDrain(gamesStream, 'utf-8', () => {
//   gamesStream.end();
//   console.log('done writing games CSV');
// });

// const tags_gamesStream = fs.createWriteStream('tags_games.csv');
// var dataGames_Tags = 'game,tag\n';
// tags_gamesStream.write(dataGames_Tags, 'utf8');

// createCSVtags_gamesDrain(tags_gamesStream, 'utf-8', () => {
//   tags_gamesStream.end();
//   console.log('done writing tags_games CSV');
// });

const similarStream = fs.createWriteStream('similar.csv');
var dataSimilar = 'primary_game,linked_game\n';
similarStream.write(dataSimilar, 'utf8');

createCSVsimilarDrain(similarStream, 'utf-8', () => {
  similarStream.end();
  console.log('done writing similar CSV');
});

// change numbers to start with 5m1 and total data to be 1e7 when done loading first CSV