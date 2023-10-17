var gameURL = "https://statsapi.web.nhl.com/api/v1/game/";
var gameID;
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

var homeTeam;
var homeScore;
var awayTeam;
var awayScore;

// The ID of the game. The first 4 digits identify the season of the game (ie. 2017 for the 2017-2018 season). The next 2 digits give the type of game, where 01 = preseason, 02 = regular season, 03 = playoffs, 04 = all-star. The final 4 digits identify the specific game number. For regular season and preseason games, this ranges from 0001 to the number of games played. (1271 for seasons with 31 teams (2017 and onwards) and 1230 for seasons with 30 teams). For playoff games, the 2nd digit of the specific number gives the round of the playoffs, the 3rd digit specifies the matchup, and the 4th digit specifies the game (out of 7).

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomizeGameId() {
  let gameYear;
  let gameType;
  let gameNumber;

  gameYear = "2017";
  
  // prompt("What year would you like to play from?");
  
  gameType = "02";
  gameNumber = generateRandomNumber(1, 1271);
  gameNumber = gameNumber.toString().padStart(4, '0');

  gameID = gameYear + gameType + gameNumber;
  console.log(gameID);
  return gameID;
}

// leaderboard (modal) setup

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal){
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

// function store

randomizeGameId();

gameURL += gameID + "/feed/live";

// `https://statsapi.web.nhl.com/api/v1/game/${gameID}/boxscore`

fetch(gameURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(dayjs(data.gameData.datetime.dateTime).format("MMM DD, YYYY"))
    //home team and home score
    console.log(data.gameData.teams.home.name);
    console.log(data.gameData.teams.home.abbreviation);
    console.log(data.gameData.teams.home.conference.name);
    console.log(data.gameData.teams.home.division.name);
    console.log(data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals);
    var homePeople = data.liveData.boxscore.teams.home.onIce;
    homePeople.forEach(function(item) {
      fetch(`https://statsapi.web.nhl.com/api/v1/people/${item}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          let playerName = data.people[0].fullName;
          let playerNumber = data.people[0].primaryNumber;
          console.log(`${playerNumber} ${playerName}`);
        })
    })

    // away team and away score
    console.log(data.gameData.teams.away.name);
    console.log(data.gameData.teams.away.abbreviation);
    console.log(data.gameData.teams.away.conference.name);
    console.log(data.gameData.teams.away.division.name);
    console.log(data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals);
    var awayPeople = data.liveData.boxscore.teams.away.onIce;
    awayPeople.forEach(function(item) {
      fetch(`https://statsapi.web.nhl.com/api/v1/people/${item}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          let playerName = data.people[0].fullName;
          let playerNumber = data.people[0].primaryNumber;
          console.log(`${playerNumber} ${playerName}`);
        })
    })

    // venue the game took place at
    console.log(data.gameData.venue.name);


  })



