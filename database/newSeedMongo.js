
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
var dataMongo = 'id,tags,similar\n';
mongoStream.write(dataMongo, 'utf8');

createCSVmongoDrain(mongoStream, 'utf-8', () => {
  mongoStream.end();
  console.log('done writing mongo CSV');
})