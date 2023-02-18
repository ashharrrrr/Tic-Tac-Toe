const mainGameBoard = document.querySelector(".game-board");
const cellBlock = document.querySelectorAll(".cell");
const player1Button = document.querySelectorAll(".selection-btn-grp1");
const player2Button = document.querySelectorAll(".selection-btn-grp2");
const startButton = document.querySelector(".start-button");
const modal = document.querySelector(".player-selection");
const gameEndModal = document.querySelector(".game-end-modal");
const winner = document.querySelector(".winner");
const restartButton = document.querySelector(".restart");

const gameBoard = (() => {
  const boardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function printBoard(array) {
    let i = 0;
    let j = 0;
    cellBlock.forEach((element) => {
      element.textContent = array[i][j];
      element.dataset.xCoordinate = i;
      element.dataset.yCoordinate = j;
      j++;
      if (j > 2) {
        j = 0;
        i++;
      }
    });
    return cellBlock;
  }

  const gameEnd = (x, y) => {
    if (
      boardArray[0][0] === boardArray[0][1] &&
      boardArray[0][1] === boardArray[0][2] &&
      boardArray[0][0] !== "" &&
      boardArray[0][1] !== "" &&
      boardArray[0][2] !== ""
    ) {
      return true;
    }
    if (
      boardArray[1][0] === boardArray[1][1] &&
      boardArray[1][1] === boardArray[1][2] &&
      boardArray[1][0] !== "" &&
      boardArray[1][1] !== "" &&
      boardArray[1][2] !== ""
    ) {
      return true;
    }
    if (
      boardArray[2][0] === boardArray[2][1] &&
      boardArray[2][1] === boardArray[2][2] &&
      boardArray[2][0] !== "" &&
      boardArray[2][1] !== "" &&
      boardArray[2][2] !== ""
    ) {
      return true;
    }
    if (
      boardArray[0][0] === boardArray[1][0] &&
      boardArray[1][0] === boardArray[2][0] &&
      boardArray[0][0] !== "" &&
      boardArray[1][0] !== "" &&
      boardArray[2][0] !== ""
    ) {
      return true;
    }
    if (
      boardArray[2][1] === boardArray[1][1] &&
      boardArray[1][1] === boardArray[2][1] &&
      boardArray[0][1] !== "" &&
      boardArray[1][1] !== "" &&
      boardArray[2][1] !== ""
    ) {
      return true;
    }
    if (
      boardArray[0][2] === boardArray[1][2] &&
      boardArray[1][2] === boardArray[2][2] &&
      boardArray[0][2] !== "" &&
      boardArray[1][2] !== "" &&
      boardArray[2][2] !== ""
    ) {
      return true;
    }
    if (
      boardArray[0][0] === boardArray[1][1] &&
      boardArray[1][1] === boardArray[2][2] &&
      boardArray[0][0] !== "" &&
      boardArray[1][1] !== "" &&
      boardArray[2][2] !== ""
    ) {
      return true;
    }
    if (
      boardArray[0][2] === boardArray[1][1] &&
      boardArray[1][1] === boardArray[2][0] &&
      boardArray[0][2] !== "" &&
      boardArray[1][1] !== "" &&
      boardArray[2][0] !== ""
    ) {
      return true;
    }
    return false;
  };

  return { gameEnd, boardArray, printBoard };
})();

player1Button.forEach((element) => {
  element.addEventListener("click", (e) => {
    player1Button.forEach((btn) => {
      btn.classList.remove("focused-btn");
    });
    e.target.classList.add("focused-btn");
    modalObject["player1Choice"] = e.target.textContent;
    if (!modalObject.player1Choice) return;
    if (modalObject.player1Choice === "X") {
      modalObject.player2Choice = "O";
    } else if (modalObject.player1Choice === "O") {
      modalObject.player2Choice = "X";
    }
  });
});

player2Button.forEach((element) => {
  element.addEventListener("click", (e) => {
    modalObject.mode = e.target.textContent.trim();
  });
});

const modalObject = {
  player1Choice: "",
  player2Choice: "",
  mode: "",
};

const Player = (choice, turn) => {
  return { choice, turn };
};

startButton.addEventListener("click", gameLoop);

function gameLoop() {
  modal.classList.remove("show");
  gameBoard.printBoard(gameBoard.boardArray);

  const playerOne = Player(modalObject.player1Choice, true);
  const playerTwo = Player(modalObject.player2Choice, false);

  let iterations = 0;

  cellBlock.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (e.target.textContent !== "") return;

      const x = +e.target.dataset.xCoordinate;
      const y = +e.target.dataset.yCoordinate;
      console.log(x, y);

      if (modalObject.mode === "Human") {
        if (playerOne.turn) {
          e.target.textContent = playerOne.choice;
          gameBoard.boardArray[x][y] = playerOne.choice;
          playerOne.turn = !playerOne.turn;
          playerTwo.turn = !playerTwo.turn;
        } else if (playerTwo.turn) {
          e.target.textContent = playerTwo.choice;
          gameBoard.boardArray[x][y] = playerTwo.choice;
          playerOne.turn = !playerOne.turn;
          playerTwo.turn = !playerTwo.turn;
        }
      } else {

        if (playerOne.turn) {
          e.target.textContent = playerOne.choice;
          gameBoard.boardArray[x][y] = playerOne.choice;
          playerOne.turn = !playerOne.turn;
          playerTwo.turn = !playerTwo.turn;
          console.log("working");

          if(iterations !== 4){
          computerPlayer(playerTwo.choice);
          playerOne.turn = !playerOne.turn;
          playerTwo.turn = !playerTwo.turn;

          iterations++;
          }
        }
      }

      if (!playerOne.turn && gameBoard.gameEnd(x, y)) {
        winner.textContent = "Player 1 won!";
        gameEndModal.classList.add("show");
      } else if (!playerTwo.turn && gameBoard.gameEnd(x, y)) {
        winner.textContent = "Player 1 won!";
        gameEndModal.classList.add("show");
      }

      if (
        !gameBoard.gameEnd(x, y) &&
        gameBoard.boardArray[0][0] !== "" &&
        gameBoard.boardArray[0][1] !== "" &&
        gameBoard.boardArray[0][2] !== "" &&
        gameBoard.boardArray[1][0] !== "" &&
        gameBoard.boardArray[1][1] !== "" &&
        gameBoard.boardArray[1][2] !== "" &&
        gameBoard.boardArray[2][0] !== "" &&
        gameBoard.boardArray[2][1] !== "" &&
        gameBoard.boardArray[2][2] !== ""
      ) {
        winner.textContent = `It's a tie!`;
        gameEndModal.classList.add("show");
      }
    });
  });

  restartButton.addEventListener("click", () => {
    gameEndModal.classList.remove("show");

    modalObject.player1Choice = "";
    modalObject.player2Choice = "";

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameBoard.boardArray[i][j] = "";
      }
    }

    cellBlock.forEach((element) => {
      element.textContent = "";
    });

    playerOne.turn = true;
    playerTwo.turn = false;

    modal.classList.add("show");

    iterations = 0;
  });
}

function computerPlayer(value) {
  let i = Math.floor(Math.random() * 3);
  let j = Math.floor(Math.random() * 3);

  while (gameBoard.boardArray[i][j]) {
    i = Math.floor(Math.random() * 3);
    j = Math.floor(Math.random() * 3);
  }



  gameBoard.boardArray[i][j] = value;
  mainGameBoard.children[i].children[j].textContent = value;
}
