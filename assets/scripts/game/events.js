'use strict'

// const getFormFields = require(`../../../lib/get-form-fields`)
const gameLogic = require('./gameLogic')
const store = require('../store')

const api = require('./api')
const ui = require('./ui')

const onAddToBoard = function (event) {
  event.preventDefault()
  console.log('add to board ran!')

  // INCORPORATE GAME LOGIC FUNCTIONS!
  // target divs in row array
  $.each($('.row').children(), (index, value) => {
    if (value === event.target) {
      if (!store.game.over) {
        gameLogic.addToBoard(index)
        if (value.innerHTML === '') {
          value.innerHTML = store.player
          gameLogic.checkWinner()
          api.updateGame()
          if (store.winner === '') {
            gameLogic.switchPlayer()
            $('#message')[0].innerHTML = `${store.player}'s Turn`
          } else if (store.winner === 'tie') {
            $('#message')[0].innerHTML = 'Tie game!'
          } else {
            $('#message')[0].innerHTML = `${store.player} wins!`
          }
        } else {
          $('#message')[0].innerHTML = `Player ${store.player}: The space is taken, please choose again`
        }
      }
    }
  })
}

const onNewGame = function (event) {
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const onGameStats = function (event) {
  api.gameStats()
    .then(ui.gameStatsSuccess)
    .catch(ui.gameStatsFailure)
}

const addHandlers = () => {
  $('#gameboard').on('click', onAddToBoard)
  $('#new-game').on('click', onNewGame)
  $('#game-stats').on('click', onGameStats)
}

module.exports = {
  addHandlers
}
