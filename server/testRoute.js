const axios = require('axios');
const {
  createRandomTags,
  createRandomConnections,
  tagsArray
} = require('../database/tags_connections.js');

var request = {
  tags:createRandomTags(tagsArray),
  similar:createRandomConnections(10000000)
};

axios.post('http://localhost:4022/morelikethis', request);

module.exports = {request};