# Game-platform-pwr

A web application that allows players to create rooms in which they can chat with each other and play various games. Currently <i> Rock Paper Scissors Lizard Slock </i> and <i> TicTacToe </i>

> A project is made for scripting languages classes at the Wroclaw University of Technology.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Instalation](#instalation)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

The goal of the project is to meet this conditions:

1) Have a data base
2) Exhibit API for UI
3) Consume API
4) Have a UI
5) React in real-time on users inputs

---

1) Use MongoDB to store players record in all games.
2) Web application is connected to a server written in node.js & express.js. That connection allows users to create account and login to existed ones
3) Current game status & rooms and fetched from the server and displayed in the application
4) UI is build with vue.js with help of tailwindcss
5) WebSockets allow a two-sided connection, in the chat players can see messages coming from other users almost immediately


## Technologies

- Vue.js
- Tailwindcss
- Node.js
- Express.js
- WebSocket
- MongoDB
- JWT

## Instalation
  Navigate to folder and clone the repository
  ```
  git clone https://github.com/Enszyk/game-platform-pwr.git
  ```
  With docker:
  ```
  // Navigate to folder
  cd game-center-pwr
  
  // build project
  docker compose build
  
  // run project
  docker compose up
  ```
  Without docker:
  ```
  // Install dependencies for client and run vue.js server
  cd client/
  npm install
  npm run serve
  
  // Install dependencies for server and run it
  cd ..
  cd server/
  npm install
  npm run serve
  ```
  

## Features

- Create an account
- Log in to existed account
- Create a room with a given name and password (or set the room to be open for everyone)
- Chat within the room
- Chose game to play (as room's admin)
- Play TicTacToe against 1 player
- Play Rock Paper Scissors Lizard Slack against 1, 2 or 3 players
- Join random room
- When in the room player can just watch or participate in the game 
- Check current statistics (number of wins, draws and losses in all games) 

## Status

_almost complete_

### Todo 
  Deploy, small bugfixes
 
## Inspiration

Kurnik.pl

## Contact

Created by [@Enszyk](https://github.com/Enszyk/) - feel free to contact me!
