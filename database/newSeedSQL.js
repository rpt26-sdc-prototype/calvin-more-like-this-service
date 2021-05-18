const {
  createCSVmysql,
  createCSVtags,
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

const mysqlStream = fs.createWriteStream('mysql.csv');
var dataID = 'id\n';
mysqlStream.write(dataID, 'utf8');

createCSVmysqlDrain(mysqlStream, 'utf-8', () => {
  mysqlStream.end();
  console.log('done writing mysql CSV');
  // console.timeEnd('createCSVmysqlDrain');
})