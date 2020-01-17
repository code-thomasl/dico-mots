import React from 'react';
import './App.scss';
import WordFormB from './components/view/WordFormB';
import JNavBar from './components/view/JNavBar';
import JFooter from './components/view/JFooter';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AboutPage from './components/view/AboutPage';

const term = 'elephant'
const url = `http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${term}`

function SearchForWord(url) {
  fetch(url)
  .then(res => res.json()).then(data => {
      data.map((word) => {
        console.log(word);
      });
  }).catch(err => {
      // code to handle request errors
  });
}


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <JNavBar />
        <div className="content-wrapper">
          <Switch>
            <Route path='/' component={WordFormB} exact />
            <Route path='/about' component={AboutPage} />
          </Switch>
          {/* <JResults word={word} definition={def}>
          </JResults>
          */}
        </div>
        <JFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
