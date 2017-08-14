/* jshint esversion:6*/
const playerToken ='X';
const computerToken = 'O';

$(document).ready(function() {
  const grid = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  function isGameOver(grid) {
    //check horizontal
    for (var i = 0; i < 3; i++) {
      if (grid[i][0] !== ' ' &&
      grid[i][0] === grid[i][1] &&
      grid[i][0] === grid[i][2]) {
        return grid[i][0];
      }
    }

    //check vertical
    for (var j = 0; j < 3; j++) {
      if (grid[0][j] !== ' ' &&
      grid[0][j] === grid[1][j] &&
      grid[0][j] === grid[2][j]) {
        return grid[0][j];
      }
    }

    // check for diagonal top left to bottom right
    if (grid[0][0] !== ' ' &&
    grid[0][0] === grid[1][1] &&
    grid[0][0] === grid[2][2]) {
      return grid[0][0];
    }

    // check for diagonal top right to bottom left
    if (grid[0][2] !== ' ' &&
    grid[0][2] === grid[1][1] &&
    grid[0][2] === grid[2][0]) {
      return grid[0][2];
    }

    // check for any blanks
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(grid[i][j] === ' ' ) {
          return false;
        }
      }
    }
    return null;
  }

  //AI picks first random move
  function randomMoveAI() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(grid[i][j] === ' ' ) {
          return {
            i : i,
            j : j
          };
        }
      }
    }
  }


// minimax AI
function minimax(newGrid, depth, player){
  const gameState = isGameOver(newGrid);

  if (gameState === false) {
    const values = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const gridCopy = _.cloneDeep(newGrid);
        if (gridCopy[i][j] !== ' ') continue;
        gridCopy[i][j] = player;
        const value = minimax(gridCopy, depth + 1, (player === playerToken ? computerToken : playerToken));
        values.push({
          cost: value,
          cell:  {
            i: i,
            j: j,
          }
        });
      }
    }
    if (player === computerToken) {
      const max= _.maxBy(values, (v) => {
        return v.cost;
      });
      if (depth === 0)  {
        return max.cell;
      } else {
        return max.cost;
      }

    } else {
      const min= _.minBy(values, (v) => {
        return v.cost;
      });
      if (depth === 0)  {
        return min.cell;
      } else {
        return min.cost;
      }
    }
  } else if ( gameState === null ) {
    return 0;
  } else if ( gameState === playerToken ){
    return depth - 10;
  } else if ( gameState === computerToken ){
    return 10 - depth;
  }
}

function minimaxMoveAI(){
  return minimax(grid, 0, computerToken);
}
    $('.col').click(function() {
      const $this = $(this);
      $this.html(playerToken);
      const i = $this.data('i');
      const j = $this.data('j');
      grid[i][j] = playerToken;
      console.log(grid);

      let gameState = isGameOver(grid);

      if (gameState) {
        alert('game over: ' + gameState);
        return;

      } else {
        const move = minimaxMoveAI(); // type of AI
        grid[move.i][move.j] = computerToken;
        $('.col[data-i='+ move.i + '][data-j='+ move.j+']').html(computerToken);
      }

      gameState = isGameOver(grid);
      if (gameState) {
        alert('game over: ' + gameState);
        return;

      }
    });

    $('#restart').click(function() {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          grid[i][j] = ' ';
          $('.col[data-i='+ i + '][data-j='+ j+']').html(' ');

        }
      }
    });

  });
