//// MONGO ////
const { Game } = require('../database/index.js');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
// const { bulkInsert } = require('../database/index.js');

//// MYSQL ////
const { bulkInsert, newGame } = require('../database/mysql/mysqlindex.js');






// 62 random words that will be used for 'tags' in database
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 1
  }
});

const tagsArray = lorem.generator.words;

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

///// Seed my database function /////

const seedGames = async (min, max) => {
  console.log('Begin seeding database...');
  console.time('actualSeedTime');
  // console.log('running with min and max ', min, max)

  var games = [];
    for (let i = min; i <= max; i++) {
      console.log('i', i)
      let gameEntry = {
        id: i,
        tags: createRandomTags(tagsArray),
        similarGames: createRandomConnections(max, i)
      };
      // newGame(gameEntry.id, gameEntry.tags, gameEntry.similarGames);
      // games.push(gameEntry);
    }
    console.log('here');
    // await bulkInsert(games, () => {
    //   console.log('callback');
    // });

  setTimeout(() => {
    console.log('Finished seeding');
    console.timeEnd('actualSeedTime');
    process.exit();
  }, 1000);
};

// var seedLots = async (total) => {
//   // console.time('actualSeedTime');
//   var start = 1;
//   var end = 100;

//   // for (var j = 0; j < 5; j++) {
//     await seedGames(start, end, () => {
//       if (end < total) {
//         start += 100;
//         end += 100;
//         seedGames(start, end);
//         console.log('start: ', start);
//       }
//     });
//     // start += 1000;
//     // end += 1000;
//   // }
//   // console.timeEnd('actualSeedTime');
// }
// seedLots(200);
// var total = 100000;
// var min = 1;
// var max = 50000;
// while (max <= total) {
  // seedGames(min, max, () => {
  //   min += 50000;
  //   max += 50000;
  // });

// }
seedGames(1, 20)
// .then(results => {
//   seedGames(1001, 2000);
// })
// .then(results => {
//   seedGames(2001, 3000);
// })


module.exports = {tagsArray, createRandomTags, seedGames};




// var min = 1;
// var max = 1000;

// var seed1000 = async (min, max) => {
//   var games = [];
//   for (let i = min; i <= max; i++) {
//     let gameEntry = {
//       id: i,
//       tags: createRandomTags(tagsArray),
//       similarGames: createRandomConnections(max, i)
//     };
//     games.push(gameEntry);
//   }
//   await bulkInsert(games);
// }

// for (var j = 0; j < total/1000; j++) {
//   await seed1000(min, max);
//   min += 1000;
//   max += 1000;
// }



  // let gameEntry = new Game({
  //   id: i,
  //   tags: createRandomTags(tagsArray),
  //   similarGames: []
  // });






  // await gameEntry.save()
  //   .catch(err => {
  //     console.log('Error saving game', err);
  //   });
  // games.push(gameEntry);

// console.log(games);

// await Game.find().sort({ id: 1 })
//   .then((games) => {
//     let gameTags;
//     let similarGames = [];

    // for (let i = 0; i < games.length; i++) {
    //   let gameTags = games[i].tags;
    //   let similarGames = games[i].similarGames;

    //   for (let j = 0; j < games.length; j++) {

    //     if (games[i].similarGames.length < 10) {
    //       let found = gameTags.some(tag => games[j].tags.indexOf(tag) >= 0);
    //       if (found && (games[i].id !== games[j].id) && (similarGames.indexOf(games[j].id) === -1)) {
    //         similarGames.push(games[j].id);
    //       }
    //     } else {
    //       let newGameEntry = new Game(games[i]);
    //       newGameEntry.save();
    //       // Game.updateOne({ id: games[i].id }, { $set: { similarGames: similarGames } })
    //       //   .catch(err => console.log('Error with update', err));
    //       // similarGames = [];
    //       break;
    //     }
    //   }
    // }
  // })
  // .catch(err => {
  //   console.log('Error querying database', err);
  // });