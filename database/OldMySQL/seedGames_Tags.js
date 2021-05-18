const {
  createCSVgames,
  createCSVgames_tags,
  createCSVsimilar,
  createCSVtags
} = require('./newIndex.js');
// const csvtojson = require("csvtojson");

console.time('tags');
createCSVgames_tags();
console.timeEnd('tags');