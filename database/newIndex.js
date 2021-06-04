const fs = require('fs');
const csv = require('csv-write-stream');
const writeDoc = csv();
const {createRandomTags, createRandomConnections, tagsArray} = require('./tags_connections.js');

var dataAmount = 5e6;

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

const createCSVgamesDrain = async (writer, encoding, cb) => {
  console.time('createCSVgamesDrain');
  var i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++;
      var data = `${i}\n`;
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
};

const createCSVtags_gamesDrain = async (writer, encoding, cb) => {
  console.time('createCSVtags_gamesDrain');
  var i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++;
      var tags = createRandomTags(tagsArray);
      tags = tags.tagIndices;
      for (var j = 0; j < 5; j++) {
        var data = `${i},${tags[j]}\n`;
        if (i === dataAmount) {
          writer.write(data, encoding, cb);
          console.timeEnd('createCSVtags_gamesDrain');
        } else {
          ok = writer.write(data, encoding);
        }
      }
    } while (i < dataAmount && ok);
    if (i < dataAmount) {
      writer.once('drain', write);
    }
  }
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

const createCSVsimilarDrain = async (writer, encoding, cb) => {
  console.time('createCSVsimilarDrain');
  var i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++;
      var similar = createRandomConnections(dataAmount, i);
      for (var j = 0; j < 10; j++) {
        var data = `${i},${similar[j]}\n`;
        if (i === dataAmount) {
          writer.write(data, encoding, cb);
          console.timeEnd('createCSVsimilarDrain');
        } else {
          ok = writer.write(data, encoding);
        }
      }
    } while (i < dataAmount && ok);
    if (i < dataAmount) {
      writer.once('drain', write);
    }
  }
};

module.exports = {
  createCSVtags,
  createCSVmysqlDrain,
  createCSVmongoDrain,
  createCSVgamesDrain,
  createCSVtags_gamesDrain,
  createCSVsimilarDrain
};