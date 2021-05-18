const {createCSVmysql, createCSVtags, createCSVmysqlDrain} = require('./newIndex.js');

// createCSVtags();
// createCSVmysql();
// createCSVmysqlDrain();

const fs = require('fs');
const csv = require('csv-write-stream');
const writeDoc = csv();
const {createRandomTags, createRandomConnections, tagsArray} = require('./tags_connections.js');

const mysqlStream = fs.createWriteStream('mysql.csv');
var dataSet = 'id,tag0,tag1,tag2,tag3,tag4,similar0,similar1,similar2,similar3,similar4,similar5,similar6,similar7,similar8,similar9\n';
mysqlStream.write(dataSet, 'utf8');

createCSVmysqlDrain(mysqlStream, 'utf-8', () => {
  mysqlStream.end();
  console.log('done writing mysql CSV');
  // console.timeEnd('createCSVmysqlDrain');
})