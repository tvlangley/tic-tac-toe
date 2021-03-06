'use strict'

const store = require('../store')

const newGameSuccess = function (data) {
  $('#message').text('New Game!')
  $('#message').css('background-color', 'green')
  store.game = data.game
  store.player = 'X'
  store.winner = ''
  console.log('store: ', store)
}

const newGameFailure = function (error) {
  $('#message').text('Error on new game')
  $('#message').css('background-color', 'red')
  console.error(error)
}

const gameStatsSuccess = function (data) {
  $('#message').text(`Completed games: ${data.games.length}`)
  $('#message').css('background-color', 'green')
  console.log('data: ', data.games.length)
}

const gameStatsFailure = function (error) {
  $('#message').text('Error on game stats')
  $('#message').css('background-color', 'red')
  console.error(error)
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  gameStatsSuccess,
  gameStatsFailure
}
