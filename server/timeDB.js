var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   console.time('findGame');
//   if (err) throw err;
//   var dbo = db.db("steam");
//   var query = { id: 10000000 };
//   dbo.collection("games").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     db.close();
//     console.timeEnd('findGame');
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   console.time('addGame');
//   if (err) throw err;
//   var dbo = db.db("steam");
//   var query = {
//     id: 10000001,
//     tags: [2, 60, 45, 54, 8],
//     similarGames: [1234567, 7654321, 4567890, 9876543, 5, 123234, 456567, 765432, 23456, 987654]
//   };
//   dbo.collection("games").insertOne(query)
//   .then((result) => {
//     db.close();
//     console.timeEnd('addGame');
//   })
// });

// MongoClient.connect(url, function(err, db) {
//   console.time('updateGame');
//   if (err) throw err;
//   var dbo = db.db("steam");
//   dbo.collection("games").updateOne(
//     {id: 10000001},
//     {$push: {"similarGames": 55555}}
//     )
//   .then((result) => {
//     db.close();
//     console.timeEnd('updateGame');
//   })
// });

// MongoClient.connect(url, function(err, db) {
//   console.time('updateGame2');
//   if (err) throw err;
//   var dbo = db.db("steam");
//   dbo.collection("games").updateOne(
//     {id: 10000001},
//     {$pull: {"similarGames": 55555}}
//     )
//   .then((result) => {
//     db.close();
//     console.timeEnd('updateGame2');
//   })
// });


MongoClient.connect(url, function(err, db) {
  console.time('deleteGame');
  if (err) throw err;
  var dbo = db.db("steam");
  var query = { id: 10000001 };
  dbo.collection("games").deleteOne(query)
    .then(result => {
      db.close();
      console.timeEnd('deleteGame');
  });
});