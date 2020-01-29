const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs')
const cheerio = require('cheerio');
const fetch = require('node-fetch');
var iconv = require('iconv-lite');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

require('dotenv').config();


// Create Express server
const app = express();
app.use(bodyParser.json()); 
const port = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;
let datastream;


app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Acces-Control-Allow-Headers", 
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === "OPTIONS")
  {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

const corsOptions = {
  origin: 'http://localhost:3000'
}

/*
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.configure(function() {
  app.use(allowCrossDomain);
  //some other code
}); 
*/   

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

const displayData = (data) => {
  try {
    return data;

  } catch (err) {
    console.error(err)
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
    setTimeout(functions[i], timeout);
  }
}

const randomWord = (length, file) => {
  let words = loadData()
}

// Cache middleware
/*
function cache(req, res, next) {
  const { word } = req.params;

  client.get(word, (err, data) => {
    if(err) throw err;

    if(data !== null) {
      res.send(setResponse(word, data));
    } else {
      next();
    }
  })
}
*/

// Set response
function setResponse(word, wordData) {
  return wordData;
}

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
  app.use(express.static('/build'));
  
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '/build', 'index.html'));
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

app.post('/sendform', async (req, res) => {
  const word = req.body;
  console.log(req.body);
  console.log(`OK SOMETHING HAPPENING HERE`);
  console.log(`Response from the form : ${word}`);
  console.log(word);
  res.set('Content-Type', 'text/html');


  if(fs.existsSync(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`)) {
    console.log('File already exists!');

    //Set data to Redis
    //client.setx(word, 3600, parseFileSendProper(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`))

    res.send(parseFileSendProper(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`));

  } else {
    console.log("File doesn't exist");
    
    console.log('REPONSE DEBUT');
    //fetchWordFromDist(word);  
    await allInFetch(word, res);
    console.log('REPONSE FIN');

    //res.send('Please click the Submit button to display result for : '+ word);
    
    //res.send('Please click SUBMIT to display');

    //res.send(word);
    //res.send(loadData(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`));
  }

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



function parseWordFromDist(word) {
    const url = `http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${word}`
  
    return fetch(url)
    .then(res => res.arrayBuffer())
    .then(arrayBuffer => iconv.decode(new Buffer(arrayBuffer), 'iso-8859-1').toString())
    .then(converted => {
      const $ = cheerio.load(converted, { decodeEntities: false });
      //storeData($("CODE").html(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);
      //storeData($("CODE").text(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);
      let def = /<def>(.|\n)*?<\/def>/gm;
      let rele = /(\d)/gm;
      let rels = /(\d)/gm;

      return $("CODE").html();
      //console.log(converted)
    })
    .then(response => {
      datastream = response;
    })
    .catch(error => {
      console.log(error);
    });
}

const allInFetch = (word, res) => {
  const url = `http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${word}`

  fetch(url)
  .then(res => res.arrayBuffer())
  .then(arrayBuffer => iconv.decode(new Buffer(arrayBuffer), 'iso-8859-1').toString())
  .then(converted => {
    const $ = cheerio.load(converted, { decodeEntities: false });
    storeData($("CODE").html(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);
    //storeData($("ClODE").text(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);

    return `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`
    //console.log(converted)
  })
  .then(response => res.send(parseFileSendProper(response)))
  .catch(error => {
    console.log(error);
  });


  //parseFileSendProper(`/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);
}

function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}

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
    storeData($("CODE").html(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);
    //storeData($("CODE").text(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);

    
    //console.log(converted)
  })
  .catch(error => {
    console.log(error);
  });
}

//maybe send back result as html with templating ?
const parseFileSendProper = (file) => {
  let data = loadData(file);

  let def = /<def>(.|\n)*?<\/def>/gm;
  let rele = /;'([^;]*)';/gm;


  data = JSON.parse(data);
  var result = '<strong>Définitions</strong><br />';
  result += data.match(def);
  result += '<hr />';

  result += '<strong>Relations</strong>';
  result += '<br />';
  result += '<br />';


  var matches = getMatches(data, rele, 1);


  result += matches;
  result += '<hr />';

  console.log("file has been parsed and sent")
  console.log(result);
  return result;
}