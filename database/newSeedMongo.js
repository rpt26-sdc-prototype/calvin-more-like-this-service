
// createCSVmongo();

const {createCSVmongo, createCSVmongoDrain} = require('./newIndex.js');

// createCSVtags();
// createCSVmysql();
// createCSVmysqlDrain();

const fs = require('fs');
const csv = require('csv-write-stream');
const writeDoc = csv();
const {createRandomTags, createRandomConnections, tagsArray} = require('./tags_connections.js');

const mongoStream = fs.createWriteStream('mongo.csv');
var dataMongo = 'id,tags.0,tags.1,tags.2,tags.3,tags.4,similar.0,similar.1,similar.2,similar.3,similar.4,similar.5,similar.6,similar.7,similar.8,similar.9\n';
mongoStream.write(dataMongo, 'utf8');

createCSVmongoDrain(mongoStream, 'utf-8', () => {
  mongoStream.end();
  console.log('done writing mongo CSV');
})