# Dico-mots project

## Goal of this project

The goal of this project is to connect to http://www.jeuxdemots.org/rezo-dump.php, retrieve, store, cache, parse and display words definitions and relations with other words and expressions. It is basically a dictionnary (hence the name "Dico mots" -> mots being words in french).

## Local Setup

- ```git clone git@github.com:code-thomasl/dico-mots.git```
- open a terminal, go to the project's root and enter ```nodemon start```
- open a new terminal session, go to the client's folder (inside the project folder) and enter ```npm start```

## Online Access

The site is currently hosted on Heroku : https://morning-oasis-90398.herokuapp.com/
If you are trying to access the website and the link appear to be broken, it's possible it has been taken down or the link has changed since the end of the project; If so, feel free to contact me.

## Functionalities and specificities 

- can search for the definition of a specific word
- autocompletion (from most popular words of the french language)
- randomize button, gives a random words from the most popular words of the french language
- responsive UI
- time responsive answers
- choice of languages for the interface
- dark/light theme
- extensive documentation


## Current issues and necessary improvements

Parsing of the original dump is still a bit rough and needs further improvement to show the relations, definitions inside the refinements and allow interactions with those elements.
