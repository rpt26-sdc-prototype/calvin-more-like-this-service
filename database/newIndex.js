const fs = require('fs');
const csv = require('csv-write-stream');
const writeDoc = csv();
const {createRandomTags, createRandomConnections, tagsArray} = require('./tags_connections.js');

var dataAmount = 1e7;

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

// const mysqlStream = fs.createWriteStream('mysql.csv');
// var dataSet = 'id,tag0,tag1,tag2,tag3,tag4,similar0,similar1,similar2,similar3,similar4,similar5,similar6,similar7,similar8,similar9\n';
// mysqlStream.write(dataSet, 'utf8');

// const mongoStream = fs.createWriteStream('mongo.csv');
// var dataMongo = 'id,tags.0,tags.1,tags.2,tags.3,tags.4,similar.0,similar.1,similar.2,similar.3,similar.4,similar.5,similar.6,similar.7,similar.8,similar.9\n';
// mongoStream.write(dataMongo, 'utf8');

const createCSVmysqlDrain = async (writer, encoding, cb) => {
  console.time('createCSVmysqlDrain');
  var i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++;
      var tags = createRandomTags(tagsArray);
      tags = tags.tagIndices;
      var similar = createRandomConnections(dataAmount, i);
      var data = `${i},${tags[0]},${tags[1]},${tags[2]},${tags[3]},${tags[4]},${similar[0]},${similar[1]},${similar[2]},${similar[3]},${similar[4]},${similar[5]},${similar[6]},${similar[7]},${similar[8]},${similar[9]}\n`;
      if (i === dataAmount) {
        writer.write(data, encoding, cb);
        console.timeEnd('createCSVmysqlDrain');
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i < dataAmount && ok);
    if (i < dataAmount) {
      writer.once('drain', write);
    }
  }
}

const createCSVmongoDrain = async (writer, encoding, cb) => {
  console.time('createCSVmongoDrain');
  var i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++;
      var tags = createRandomTags(tagsArray);
      tags = tags.tagNames;
      var similar = createRandomConnections(dataAmount, i);
      var data = `${i},${tags},${similar}\n`;
      if (i === dataAmount) {
        writer.write(data, encoding, cb);
        console.timeEnd('createCSVmongoDrain');
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i < dataAmount && ok);
    if (i < dataAmount) {
      writer.once('drain', write);
    }
  }
}

const createCSVmysql = async () => {
  console.time('seedMySQL');
  writeDoc.pipe(fs.createWriteStream('mysql.csv'));
  for (var i = 1; i <= dataAmount; i++) {
    var tags = createRandomTags(tagsArray);
    tags = tags.tagIndices;
    var similar = createRandomConnections(dataAmount, i);
    writeDoc.write({
      id: i,
      tag0: tags[0],
      tag1: tags[1],
      tag2: tags[2],
      tag3: tags[3],
      tag4: tags[4],
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

const createCSVgamesDrain = async (writer, encoding, cb) => {
  console.time('createCSVgamesDrain');
  var i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++;
      var tags = createRandomTags(tagsArray);
      tags = tags.tagIndices;
      var similar = createRandomConnections(dataAmount, i);
      var data = `${i},${tags[0]},${tags[1]},${tags[2]},${tags[3]},${tags[4]},${similar[0]},${similar[1]},${similar[2]},${similar[3]},${similar[4]},${similar[5]},${similar[6]},${similar[7]},${similar[8]},${similar[9]}\n`;
      if (i === dataAmount) {
        writer.write(data, encoding, cb);
        console.timeEnd('createCSVgamesDrain');
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i < dataAmount && ok);
    if (i < dataAmount) {
      writer.once('drain', write);
    }
  }
}

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
  createCSVmysql,
  createCSVmysqlDrain,
  createCSVmongoDrain
};