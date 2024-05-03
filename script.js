
// Set this constant to true to debug the placement of bombs without
// having to click on all cells to reveal them.
const CHEAT_REVEAL_ALL = false;

const ROWS_COUNT = 10;
const COLS_COUNT = 10;
const numberOfBombs = 6;

var defeat = false;
var victory = false;

// Cell constructor
function Cell() {
  this.discovered = false;
  this.isBomb = false;
  this.hasBeenFlagged = false;
}

// Initialize cells
var cells = Array(ROWS_COUNT);
for (var row = 0; row < ROWS_COUNT; row++) {
  cells[row] = Array(COLS_COUNT);
  for (var col = 0; col < COLS_COUNT; col++) {
    cells[row][col] = new Cell();
  }
}

//
// TODO: Task 1 - add some bombs at fixed positions.
/* function definedBomb() {
  cells[0][0].isBomb = true;
  cells[1][7].isBomb = true;
  cells[4][9].isBomb = true;
  cells[8][2].isBomb = true;
  cells[9][2].isBomb = true;
  cells[9][9].isBomb = true;
}

// call definedBomb function
definedBomb(); */



// TODO: Task 2 - Comment out the code of task 1. Instead of adding bombs in fixed places, add 10 of them in random places.
//                Add a BOMBS_COUNT constant so that you can easily change the amount of bombs placed. Put it next to the
//                other constants.
//

function randomBombs(randomRow, randomCol) {
  for(i=0; i<numberOfBombs; i++) {
    randomRow = Math.floor(Math.random() * ROWS_COUNT);
    randomCol = Math.floor(Math.random() * COLS_COUNT);
    cells[randomRow][randomCol].isBomb = true;
  }
}

randomBombs()


/* Task 3
Now that the bombs are randomly placed, experiment with changing the COLS_COUNT, ROWS_COUNT and BOMBS_COUNT values. Try to find a combination that feels good. */

// When COLS_COUNT, ROWS_COUNT and BOMBS_COUNT values are changed, the game is adapting to the new values. The game is still playable and the bombs are placed randomly.


// Once the game has been initialized, we "render" it.
render();


//
// Game functions definitions
//

function discoverCell(row, col) {
  //
  // TODO: Task 5 - Reveal cells when clicked.
  //

//Right now, I have 6 bombs for example in the playfield. When I click on a cell, I want to reveal it. 
    cells[row][col].discovered = true;

  // TODO: Task 6 - Discover neighbor cells recursively, as long as there are no adjacent bombs to the current cell.
  for(i = -1; i <= 1; i++) {
    for(j = -1; j <= 1; j++) {
      if(row + i >= 0 && row + i < ROWS_COUNT && col + j >= 0 && col + j < COLS_COUNT) {
        if(!(cells[row + i][col + j].isBomb)) {
          cells[row + i][col + j].discovered = true;
        } 
      }
      
    }
  }

  //
  // TODO: Task 8 - Implement defeat. If the player "discovers" a bomb (clicks on it without holding shift), set the variable defeat to true.
  //
  if(cells[row][col].isBomb) {
    defeat = true;
  
  }
}

function flagCell(row, col) {
  //
  // TODO: Task 7 - Implement flags. Flags allow the player to mark cells that they think contain a bomb.
  // When clicking a cell and holding shift, function flagCell() will be called for you.
  //
 /*  Improvement ideas:
- when clicking on an already flagged cell, remove the flag instead.
- prevent discovering a flagged cell.
- add a small paragraph above or below the grid to explain to the user that they can place flags by holding shift. */

  cells[row][col].hasBeenFlagged = true;
  console.log(`flagCell ${row}, ${col}`);



  
}





// This function is called once for each cell when rendering the game. The row and col of the current cell is
// passed to the functionn




function bombDetector(row, col) {
  if(row < 0 || row >= ROWS_COUNT || col < 0 || col >= COLS_COUNT) {
    return 0;
  } else{
    if(cells[row][col].isBomb) {
      return 1;
    } else {
      return 0;
    }
  }

}


function countAdjacentBombs(row, col) {
  //
  // TODO: Task 4 - Adjacent bombs are bombs in cells touching our cell (also diagonally). Implement this function
  //                so that it returns the count of adjacent cells with bombs in them. 
  //
  /* On each cell, we want to show the number of adjacent bombs. Adjacent bombs are bombs in cells touching our cell (also diagonally).

  When the playfield is rendered, the function countAdjacentBombs() is called once for each cell and a number is displayed in the cell if the return value is greater than 1.

  Implement this function so that it returns the correct number. */

  //for a cell in the middle of the playfield, define 8 adjacent cell

  let adjacentBombs = 0;

  for(i = -1; i <= 1; i++) {
    for(j = -1; j <= 1; j++) {
      adjacentBombs = adjacentBombs + bombDetector(row + i, col + j);
      
    }
  }
  console.log(`countAdjacentBombs ${row}, ${col}, ${adjacentBombs}`);
  return adjacentBombs;
}

function getBombsCount() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  return 0;
}

function getClearedCells() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  return 0;
}

function getTotalCellsToClear() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  return 0;
}

function checkForVictory() {
  //
  // TODO: Task 10 - Implement victory. If the player has revealed as many cells as they must (every cell that isn't a
  //                 bomb), set variable victory to true.
  //
  return 0;
}

//
// Rendering functions
//
function getMessage() {
  if (victory == true) {
    return "Well done! 👏🏼<br><br>Refresh the page to start again.";
  } else if (defeat) {
    return "Boom! 💥<br><br>Refresh the page to try again.";
  }
  return "";
}

// "Render" the game. Update the content of the page to reflect any changes to the game state.
function render() {
  var playfield = document.getElementById("playfield");
  var html = "";
  for (var row = 0; row < ROWS_COUNT; row++) {
    html += '<div class="row">';
    for (var col = 0; col < COLS_COUNT; col++) {
      var cell = cells[row][col];
      var cellText = "";
      var cssClass = "";
      var textColor = "";
      if (cell.discovered || CHEAT_REVEAL_ALL || defeat) {
        cssClass = "discovered";
        if (cell.isBomb) {
          cellText = "💣";
        } else {
          var adjBombs = countAdjacentBombs(row, col);
          if (adjBombs > 0) {
            cellText = adjBombs.toString();
            if (adjBombs == 1) {
              textColor = "blue";
            } else if (adjBombs == 2) {
              textColor = "green";
            } else if (adjBombs == 3) {
              textColor = "red";
            } else if (adjBombs == 4) {
              textColor = "black";
            }
          }
        }
      } else {
        if (cell.hasBeenFlagged) {
          cellText = "🚩"
        }
      }
      html += `<div class="cell ${cssClass}" style="color:${textColor}" onclick="onCellClicked(${row}, ${col}, event)">${cellText}</div>`;
    }
    html += "</div>"
  }
  playfield.innerHTML = html;

  // Defeat screen
  var body = document.getElementsByTagName("body")[0];
  if (defeat) {
    body.classList.add("defeat")
  }

  // Victory screen
  if (victory) {
    body.classList.add("victory")
  }

  // Update stats
  document.getElementById("bombs-count").innerText = getBombsCount().toString();
  document.getElementById("cleared-cells-count").innerText = getClearedCells().toString();
  document.getElementById("total-cells-to-clear").innerText = getTotalCellsToClear().toString();

  // Update message
  document.getElementById("message").innerHTML = getMessage();
}

// This function gets called each time a cell is clicked. Arguments "row" and "col" will be set to the relevant
// values. Argument "event" is used to check if the shift key was held during the click.
function onCellClicked(row, col, event) {
  if (event.shiftKey) {
    flagCell(row, col);
  } else {
    discoverCell(row, col);
  }
  checkForVictory();
  render();
}
