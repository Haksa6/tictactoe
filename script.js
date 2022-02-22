let statusText = document.getElementById('gameStatus');
const tiles = Array.from(document.querySelectorAll('.tile'))



const Player = (sign, playerNumber) => {
    const getSign = () => sign;
    const getPlayer = () => playerNumber;
    return {getSign, getPlayer};
}
const player1 = Player('X', 1);
const player2 = Player('O', 2);

const gameBoard = (() => {
    let gameState = ["", "", "", "", "", "", "", "", ""];
    const getState = () => gameState;

    const updateState = () => {
        for(let i = 0; i<tiles.length;i++){
            gameState[i] = tiles[i].textContent;
        }
    }


    const winningCondition1 = () => {
        for(i = 0; i < 9; i+=3){
            if(gameState[i] != "" && gameState[i] == gameState[i+1] && gameState[i] == gameState[i+2]){
                return true
            }
        }
        return false
    };
    const winningCondition2 = () => {
        for(i = 0; i < 3; i++){
            if(gameState[i] != "" && gameState[i] == gameState[i+3] && gameState[i] == gameState[i+6]){
                return true
            }
        }
        return false
    };
    const winningCondition3 = () => {
        if(gameState[0] != "" && (gameState[0] == gameState[4] && gameState[0] == gameState[8])){
            return true
        }
        if(gameState[2] != "" && (gameState[2] == gameState[4] && gameState[2] == gameState[6])){

            return true
        }
        return false
    };
    
    

    const clearTheBoard = () => gameState = ["", "", "", "", "", "", "", "", ""];

    return {updateState,getState,winningCondition1, winningCondition2, winningCondition3,clearTheBoard};
})();


const gameLogic = (() => {

    let gameActive = true;
    let currentPlayer = player1;
    
    const currentPlayerTurn = () => `It's Player ${currentPlayer.getPlayer()}'s turn`;

    const start = () => tiles.forEach(tile => tile.addEventListener('click', handleTileClick));


    const handlePlayerChange = () => {
        currentPlayer = currentPlayer.getSign() === "X" ? player2 : player1;
        statusText.textContent = currentPlayerTurn();
        console.log(currentPlayer.getSign())
    }


    const checkWinner = () => {
        let roundWon = false;
    
        if(gameBoard.winningCondition1() || gameBoard.winningCondition2() || gameBoard.winningCondition3()){
            roundWon = true;
        }

        if (roundWon) {
            console.log(roundWon);
            
            statusText.textContent = `Player ${currentPlayer.getPlayer()} has won!`;
            console.log(statusText.textContent);
            gameActive = false;
            stopGame();
            return true;
        }

        let state = gameBoard.getState()
        if(!state.some(v => v == "")){
            statusText.textContent = "ITS A DRAW!";
            stopGame();
            gameActive = false;
            return true;
        }
        return false;
    };

    const handleTileClick = (e) => {

        if(e.target.textContent == ""){
            e.target.textContent = currentPlayer.getSign();
            gameBoard.updateState();
            if(!checkWinner());
            if(gameActive){
                handlePlayerChange();
            }
            
        }
    };

    const restartGame = () => {
        gameBoard.clearTheBoard();
        tiles.forEach(tile => tile.textContent = "");
        start();
        statusText.textContent = `It's ${currentPlayer.getPlayer()}'s turn`;
        gameActive = true;
        currentPlayer = player1;
        statusText.textContent = currentPlayerTurn();
    };
    const stopGame = () => {
        tiles.forEach(tile => tile.removeEventListener("click", handleTileClick))
    }

    return{start, restartGame};
})();


gameLogic.start();
