let gameState = ["", "", "", "", "", "", "", "", ""];


const Player = (sign, playerNumber) => {
    const getSign = () => sign;
    const getPlayer = () => playerNumber
    return {getSign, getPlayer};
}