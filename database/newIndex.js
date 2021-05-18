const fs = require('fs');
const csv = require('csv-write-stream');
const writeDoc = csv();
const {createRandomTags, createRandomConnections, tagsArray} = require('./tags_connections.js');

var dataAmount = 1000000;



const createCSVmongo = async () => {
  console.time('seedMongo');
  writeDoc.pipe(fs.createWriteStream('./mongo.csv'));
  for (var i = 1; i <= dataAmount; i++) {
    var tags = createRandomTags(tagsArray);
    tags = tags.tagNames;
    writeDoc.write({
      id: i,
      tags: tags,
      similarGames: createRandomConnections(dataAmount, i)
    })
  }
  writeDoc.end();
  console.timeEnd('seedMongo');
};

const createCSVmysql = async () => {
  console.time('seedMySQL');
  writeDoc.pipe(fs.createWriteStream('mysql.csv'));
  for (var i = 1; i <= dataAmount; i++) {
    var tags = createRandomTags(tagsArray);
    tags = tags.tagIndices;
    var similar = createRandomConnections(dataAmount, i);
    writeDoc.write({
      id: i,
      tag1: tags[0],
      tag2: tags[1],
      tag3: tags[2],
      tag4: tags[3],
      tag5: tags[4],
      similar0: similar[0],
      similar1: similar[1],
      similar2: similar[2],
      similar3: similar[3],
      similar4: similar[4],
      similar5: similar[5],
      similar6: similar[6],
      similar7: similar[7],
      similar8: similar[8],
      similar9: similar[9]
    });
  }
  writeDoc.end();
  console.timeEnd('seedMySQL');
}

const createCSVgames = async (cb) => {
  console.time('games');
  writeDoc.pipe(fs.createWriteStream('./CSVs/games.csv'));
  for (var i = 1; i <= dataAmount; i ++) {
    writeDoc.write({
      id: i
    });
  }
  writeDoc.end();
  console.timeEnd('games');
  // cb();
};

const createCSVtags = async (cb) => {
  writeDoc.pipe(fs.createWriteStream('./tags.csv'));
  for (var i = 0; i < tagsArray.length; i++) {
    writeDoc.write({
      id: i,
      tag: tagsArray[i]
    });
  }
  writeDoc.end();
  // cb();
};

const createCSVgames_tags = async (cb) => {
  console.time('games_tags');
  writeDoc.pipe(fs.createWriteStream('./CSVs/games_tags.csv'));
  for (var i = 1; i <= dataAmount; i++) {
    var tags = createRandomTags(tagsArray);
    tags = tags.tagIndices;
    for (var j = 0; j < 5; j++) {
      writeDoc.write({
        game: i,
        tag: tags[j]
      });
    }
  }
  writeDoc.end();
  console.timeEnd('games_tags');
  // cb();
};

const createCSVsimilar = async () => {
  console.time('similar');
  writeDoc.pipe(fs.createWriteStream('./CSVs/similar.csv'));
  for (var i = 1; i <= dataAmount; i++) {
    var similar = createRandomConnections(dataAmount, i);
    for (var j = 0; j < 10; j++) {
      writeDoc.write({
        primary_game: i,
        linked_game: similar[j]
      });
    }
  }
  writeDoc.end();
  console.timeEnd('similar');
};

module.exports = {
  createCSVmongo,
  createCSVgames,
  createCSVgames_tags,
  createCSVsimilar,
  createCSVtags,
  createCSVmysql
};