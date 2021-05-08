// const { Game } = require('../database/index.js');
// const { Game } = require('./mysqlindex.js');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const { newGame, insertTags } = require('./mysqlindex.js');



// 62 random words that will be used for 'tags' in database
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 1
  }
});

const tagsArray = lorem.generator.words;

// create table of tag names
//////// uncomment when running fresh, leave commented when refactoring other functions ////////

// insertTags(tagsArray, (err, result) => {
//   if (err) {
//     res.send(err);
//   } else {
//     console.log('success')
//   }
// });

const createRandomTags = (tags) => {
  let randomTags = [];
  while (randomTags.length < 5) {
    let randomIndex = Math.floor(Math.random() * tags.length);
    let tag = tags[randomIndex];
    if (randomTags.indexOf(tag) === -1) {
      randomTags.push(tag);
    }
  }
  return randomTags;
};

// ///// Seed my database function /////

// // const seedGames = async () => {
const seedGames = () => {
  console.log('Begin seeding database...');
  for (let i = 1; i <= 1000; i++) {
    var id = i;
    var tags = createRandomTags(tagsArray);
    newGame(id, tags, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('successfully added game', i)
      }
    });
  }
  console.log('complete')
}

console.time('seedGames');
seedGames();
console.timeEnd('seedGames');

//   for (let i = 1; i <= 100; i++) {

//     // refactor this line
//     let gameEntry = new Game({
//       id: i,
//       tags: createRandomTags(tagsArray),
//       similarGames: []
//     });

//     // await gameEntry.save()
//     //   .catch(err => {
//     //     console.log('Error saving game', err);
//     //   });
//   }
// // refactor this line
//   await Game.find().sort({ id: 1 })
//     .then((games) => {
//       let gameTags;
//       let similarGames = [];

//       for (let i = 0; i < games.length; i++) {
//         gameTags = games[i].tags;

//         for (let j = 0; j < games.length; j++) {

//           if (similarGames.length < 10) {
//             let found = gameTags.some(tag => games[j].tags.indexOf(tag) >= 0);
//             if (found && (games[i].id !== games[j].id) && (similarGames.indexOf(games[j].id) === -1)) {
//               similarGames.push(games[j].id);
//             }
//           } else {
//             // refactor this line
//             Game.updateOne({ id: games[i].id }, { $set: { similarGames: similarGames } })
//               .catch(err => console.log('Error with update', err));
//             similarGames = [];
//             break;
//           }
//         }
//       }
//     })
//     .catch(err => {
//       console.log('Error querying database', err);
//     });
//   setTimeout(() => {
//     console.log('Finished seeding');
//     process.exit();
//   }, 1000);
// };
// console.time('seed');
// seedGames();
// console.timeEnd('seed');

// module.exports = {tagsArray, createRandomTags, seedGames};