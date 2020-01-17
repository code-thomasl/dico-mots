const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs')
const cheerio = require('cheerio');
const fetch = require('node-fetch');
var iconv = require('iconv-lite');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

// Create Express server
const app = express();
app.use(bodyParser.json()); 
const port = process.env.PORT || 5000;

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))

  } catch (err) {
    console.error(err)
  }
}

const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomWord = (length, file) => {
  let words = loadData()
}


app.use(cors());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//  extended: true
//}));
//app.use(express.json());
//app.use(bodyParser.json());

app.use(express.urlencoded())
app.use(bodyParser.text());

if(process.env.NODE_ENV === 'production')
{
  //Set static folder
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// Connection to MongoDB database
const uri = "mongodb+srv://code-thomasl:kqPMlFGQdMDSnzmx@cluster0-hyons.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Building routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.get('/randomize', (req, res) => {
  console.log(req.body);
  let word = loadData('./words-list.json');

  word = JSON.parse(word);
  //res.send(word[word.length-1]);
  res.send(word[getRandomInt(0, word.length-1)]);
/*
  if(fs.existsSync(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`)) {
    console.log('File already exists!');
    res.send(loadData(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`));

  } else {
    fetchWordFromDist(word);
    //res.send(word);
    res.send(loadData(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`));
  }
*/
  res.end()
});

app.post('/sendform', (req, res) => {
  const word = req.body;
  console.log(req.body);
  console.log(`OK SOMETHING HAPPENING HERE`);
  console.log(`Response from the form : ${word}`);
  console.log(word);

  if(fs.existsSync(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`)) {
    console.log('File already exists!');
    res.send(parseFileSendProper(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`));

  } else {
    console.log("File doesn't exist");
    fetchWordFromDist(word)

    res.send('Please click SUBMIT to display');
    //res.send(word);
    //res.send(loadData(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`));
  }

  res.end()
});

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
/*
app.post('/sendform', (req, res) => {
  const word = req.body.name;
  console.log(req.body);
  console.log(`OK SOMETHING HAPPENING HERE`);
  console.log(`Response from the form : ${word}`);
  console.log(word);
  //...
  res.end()
})
*/

//working function to fetch DATA from a word
/*
fetch(url)
  .then(res => res.arrayBuffer())
  .then(arrayBuffer => iconv.decode(new Buffer(arrayBuffer), 'iso-8859-1').toString())
  .then(converted => {
    const $ = cheerio.load(converted, { decodeEntities: false });
    storeData($("CODE").text(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);

    //console.log(converted)
  }).catch(error => {
    console.log(error);
  });
*/

// Fetch the correct word from distant dump server and store the data in a file
// @TODOS
// - Check if file doesn't already exists for the specific word
// - Create a parser for the dump received BEFORE saving into a file
// - Send the parsed response directly to the FRONTEND
const fetchWordFromDist = (word) => {
  const url = `http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${word}`

  fetch(url)
  .then(res => res.arrayBuffer())
  .then(arrayBuffer => iconv.decode(new Buffer(arrayBuffer), 'iso-8859-1').toString())
  .then(converted => {
    const $ = cheerio.load(converted, { decodeEntities: false });
    storeData($("CODE").text(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);

    //console.log(converted)
  }).catch(error => {
    console.log(error);
  });
}

const parseFileSendProper = (file) => {
  let data = loadData(file);

  data = JSON.parse(data);

  return data;
}