
//TEST WITH REQUEST
/*
var request = require('request');
request(`http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${word}`, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})
*/

//TEST WITH AXIOS
/*
axios.get(`http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${word}`)
    .then(response => {
        console.log(response.data.status);
        // console.log(response.data);
        storeData(response.data, `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`)
        res.send(response.data.status);
    })
    .catch(error => {
        console.log(error);
    });
*/

/*

/*
fetch(url)
  .then(res => res.text())
  .then(data => {
      // Load the HTML into cheerio's DOM
      console.log(data);
      const $ = cheerio.load(data, { decodeEntities: false });
      // Print the text nodes of the <table> in the HTML
      //console.log($("CODE").text());
      storeData($("CODE").text(), `/Users/thomaslefebvre/git/projet-jeudemot/backend/words_files/${word}.json`);
  })
  .catch(error => {
    console.log(error);
  });
*/


const fs = require('fs')

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

//parsing file
const parseFileSendProper = (file) => {
  let data = loadData(file);

  data = JSON.parse(data);

  return data;
}

console.log(parseFileSendProper);

