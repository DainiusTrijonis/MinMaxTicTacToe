import React from 'react';
import './App.css';

import ResetButton from './ResetButton'
import Tile from './Tile'
import Announcement from './Announcement'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      gameBoard: 
        [' ', ' ', ' ',
         ' ', ' ', ' ',
         ' ', ' ', ' ']
      ,
      turn: 'x',
      winner: null,
      maxPlayer: 'x',
      minPlayer: 'o'
    }

  }

  tie(board) {
    var moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  winner(board,player) {
    if (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
      ) {
      return true;
    } else {
      return false;
  }
  }
  copyBoard(board){
    return board.slice(0);
  }
  validMove(move, player, board) {
    var newBoard = this.copyBoard(board);
    if(newBoard[move] === ' '){
      newBoard[move] = player;
      return newBoard;
    } else
      return null;
  }

  findAiMove(board) {
    var bestMoveScore = 100;
    let move = null;
    //Test Every Possible Move if the game is not already over.
    if(this.winner(board, 'x') || this.winner(board, 'o' || this.tie(board))) {
      return null;
    }
    for(var i = 0; i < board.length; i++){
      let newBoard = this.validMove(i, this.state.minPlayer, board);
      //If validMove returned a valid game board
      if(newBoard) {
        var moveScore = this.maxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }

  minScore(board) {
    if (this.winner(board, 'x')) {
      return 10;
    } else if (this.winner(board, 'o')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      var bestMoveValue = 100;
      let move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(i, this.state.minPlayer, board);
        if (newBoard) {
          var predictedMoveValue = this.maxScore(newBoard);
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      //console.log("Best Move Value(minScore):", bestMoveValue);
      return bestMoveValue;
    }
  }
  maxScore(board) {
    if(this.winner(board, 'x')) {
      return 10;
    } else if(this.winner(board, 'o')) {
      return -10;
    } else if(this.tie(board)) {
      return 0;
    } else {
      var bestMoveValue = -100;
      let move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(i, this.state.maxPlayer, board);
        if (newBoard) {
          var predictedMoveValue = this.minScore(newBoard);
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      return bestMoveValue;
    }

  }
  gameLoop(move) {
    try {

    
    let player =this.state.turn;
    let currentGameBoard = this.validMove(move,player,this.state.gameBoard);
    if(this.winner(currentGameBoard,player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      })
      return;
    }
    if(this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'd'
      })
      return;
    }
    player = 'o'
    currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard);
    if(this.winner(currentGameBoard,player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      })
      return;
    }
    if(this.tie(currentGameBoard)){
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'd'
      })
      return;
    }
    this.setState({
      gameBoard: currentGameBoard
    })
    }catch(e) {console.log(e)}
  }

  resetBoard() {
    this.setState({
      gameBoard: [
        ' ',' ',' ',
        ' ',' ',' ',
        ' ',' ',' '
      ],
      turn: 'x',
      winner: null,
      maxPlayer: 'x',
      minPlayer: 'o'
    })
  }

  render() {

    return (
      <div className="">
        <div className= "">
          <h1>Tic-Tac-Toe</h1>
          <Announcement winner = {this.state.winner}/>
          <ResetButton reset={this.resetBoard.bind(this)}/>
        </div>
        <div className='board'>

          {this.state.gameBoard.map(function(value,i){
            return(
              <Tile
                key={i}
                loc={i}
                value={value}
                gameLoop={this.gameLoop.bind(this)}/>
            );
          }.bind(this))}


        </div>

      </div>
    );
  }
}