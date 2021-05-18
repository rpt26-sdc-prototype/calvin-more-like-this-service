const LoremIpsum = require('lorem-ipsum').LoremIpsum;

// 62 random words that will be used for 'tags' in database
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 1
  }
});

const tagsArray = lorem.generator.words;

const createRandomTags = (tags) => {
  let randomTags = [];
  let randomTagIndices = [];
  while (randomTags.length < 5) {
    let randomIndex = Math.floor(Math.random() * tags.length);
    let tag = tags[randomIndex];
    if (randomTags.indexOf(tag) === -1) {
      randomTags.push(tag);
      randomTagIndices.push(randomIndex);
    }
  }
  return {tagNames: randomTags, tagIndices: randomTagIndices};
};

const createRandomConnections = (max, exclude) => {
  let randomConnections = [];
  while (randomConnections.length < 10) {
    let randomConnection = Math.floor(Math.random() * max);
    if (randomConnections.indexOf(randomConnection) === -1 && randomConnection !== exclude) {
      randomConnections.push(randomConnection);
    }
  }
  return randomConnections;
}

module.exports = {
  createRandomTags,
  createRandomConnections,
  tagsArray
}