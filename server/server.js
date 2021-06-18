const newrelic = require('newrelic');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { retrieveGameAtId } = require('../database/index.js');
const { getData } = require('./helper.js');
const { newSimilar } = require('./helper.js');
const { newEntry } = require('../database/index.js');
const { updateAdd } = require('../database/index.js');
const { updateDelete } = require('../database/index.js');
const { deleteEntry } = require('../database/index.js');
const { newID } = require('../database/index.js');




const dummyData = {
  id: null,
  title: null,
  price: null,
  releaseDate: null,
  reviewCount: null,
  reviewRating: null,
  headerImage: null,
  gallery: null
};


const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname + '/../public/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// why not working??
app.get('/', (req, res) => {
  var firstID = 1;
  res.redirect(`/${firstID}`);
})

// allows me to easily test random IDs with loader.io and also for myself
app.get('/test', (req, res) => {
  var randomID = Math.floor(Math.random() * 1e7 + 1);
  res.redirect(`/${randomID}`);
})

app.get('/loaderio-f6b96c7f918883fd6437d4d3825900ee/', (req, res) => {
  var options = {
    root: path.join(__dirname)
  };
  var fileName = 'verify.txt';
  res.sendFile(fileName, options);
});

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('public/dist/index.html'));
});


app.get('/morelikethis/:id', async (req, res) => {
  let id = req.params.id;

  // if (id > 100 || id < 0) {
    if (id > 10000000 || id < 0) {
    res.status(404).end('Game does not exist');
  } else {
    // retrieve tags from my database
    // altered schema to have 'similar' instead of 'similarGames' and need to adjust everything accordingly
    await retrieveGameAtId(id)
      .then(results => {
        console.log('results data:', results.similar)
        if (!results) {
          res.status(404).end();
        } else {
          return results.similar;
        }
      })
      .catch(err => console.log('Databse query error.', err))

      // retrieve teammates data
      .then(async similarGames => {
        let similarGamesData = [];
        for (let i = 0; i < similarGames.length; i++) {
          ////// placeholder until services are running /////
          // let sampleData = dummyData;
          // sampleData.id = similarGames[i];
          // similarGamesData.push(sampleData);
          //////
          similarGamesData.push(await getData(similarGames[i]));
        }
        res.status(200).send(similarGamesData);
      })
      .catch(err => console.log('GET request error.', err));
  }
});

// app.post('/morelikethis', (req, res) => {
//   newSimilar(req.params.tags)
//   .then((similarGames) => {
//     newEntry(req.params.id, req.params.tags, similarGames);
//   })
//   .catch(err => console.log('error with adding new game information:', err));
// });

app.post('/morelikethis', (req, res) => {
  var newGameID;
  try {
    newID((id) => {
      newGameID = id;
      console.log('newGameID', newGameID);
      newEntry(newGameID, req.body.tags.tagNames, req.body.similar);
    });
    res.end();
  } catch {
    console.log('error!');
    res.end();
  }
  // .catch(err => console.log('err'))
});

app.put('/morelikethis', (req, res) => {
  if (req.params.action === 'r') {
    updateDelete(req.params.id, req.params.item);
  } else if (req.params.action === 'a') {
    updateAdd(req.params.id, req.params.item);
  } else {
    console.err('Update not specified. Please clarify if you are removing or adding an item.')
  }
});

app.delete('/morelikethis', (req, res) => {
  deleteEntry(req.params.id);
})


module.exports = {app};





// app.post('/morelikethis', (req, res) => {
//   var newGameID;
//   newID((id) => {
//     newGameID = id;
//     console.log('newGameID', newGameID);
//     newEntry(newGameID, req.body.tags.tagNames, req.body.similar, ( err, result) => {
//       if (err) {
//         console.log('error:', err);
//         res.end();
//       } else {
//         console.log('result', result);
//         res.send(result);
//       }
//     });
//   });
//   // res.end()
//   // .catch(err => console.log('err'))
// });