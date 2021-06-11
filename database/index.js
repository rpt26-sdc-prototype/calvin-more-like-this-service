const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config();

// let MONGO_URI = 'mongodb://localhost:27017/steam';

// if (process.env.NODE_ENV === 'development') {
//   MONGO_URI = 'mongodb://localhost:27017/steam';
// }

var user = process.env.MONGO_USER;
var password = process.env.MONGO_PASSWORD;
var uri = process.env.MONGO_URI;

var options = {
  user: user,
  pass: password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose.connect(
  uri, options
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to ${uri}`);
});

const moreLikeThisSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  tags: [String],
  similar: [Number]
});

const Game = mongoose.model('Game', moreLikeThisSchema);

const insertCSV = () => {


};

// const bulkInsert = (arrayGames) => {
//   var bulk = db.games.initializeOrderedBulkOp();
//   for (var i = 0; i < arrayGames.length; i++) {
//     bulk.insert(arrayGames[i]);
//   }
//   bulk.execute();
// }

const bulkInsert = async (arrayGames, cb) => {
  // console.log('running')
  await Game.insertMany(arrayGames);
  cb();
}

const retrieveGameAtId = (id) => {
  return Game.findOne({id: id});
};

// post game function
const newEntry = (id, tags = [], similar = []) => {
  var game = new Game({
    id: id,
    tags: tags,
    similar: similar
  });
  game.save(function(err) {
    if (err) {
      console.log(err);
      return (err);
    }
  });
};

const updateAdd = (id, item) => {
  Game.updateOne(
    {"id": id},
    {$push: {"similar": item}}
  )
  .then(result => {
    console.log(result);
  });
};

const updateDelete = (id, item) => {
  Game.updateOne(
    {"id": id},
    {$pull: {"similar": item}}
  )
  .then(result => {
    console.log(result);
  });
}

const deleteEntry = (id) => {
  Game.deleteOne({"id": id})
  .then(result => {
    console.log(result);
  });
}

const newID = (cb) => {
  var newIDnum;
  Game.find().sort({id:-1}).limit(1)
  .then(result => {
    newIDnum = result[0].id + 1;
    cb(newIDnum);
  })
}

module.exports = {Game, retrieveGameAtId, newEntry, updateAdd, updateDelete, deleteEntry, bulkInsert, insertCSV, newID};
