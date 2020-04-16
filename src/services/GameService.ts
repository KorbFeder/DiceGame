import { Player } from "../models/Player-interface";
import { gameState } from '../models/gameState';
import { GameInfo } from "../models/GameInfo-interface";

let currPlayer = 0;

export default class GameService {
    constructor(
        private currentPlayer: number, 
        private setCurrentPlayer, 
        private players: Player[], 
        private setPlayers, 
        private currGameState: gameState,
        private setGameState,
        private sipPercentage: number,
        private gameMode: string
    ) {}

    public executeGame(result: number): GameInfo {
        if(this.players[this.currentPlayer] && this.gameMode === 'hard' && this.currGameState != gameState.restart && 
        this.currGameState != gameState.winnersNumber) {
            this.players[this.currentPlayer].cupFilled -= this.sipPercentage * result;
            this.setPlayers([...this.players]);
        }

        
        if(this.players[this.currentPlayer] && this.players[this.currentPlayer].cupFilled <= -1000000) {
            this.players[this.currentPlayer].cupFilled = 100;
            this.players[this.currentPlayer].beerNr++;
            this.setPlayers([...this.players]);
        }

        if(this.players[this.currentPlayer] && this.players[this.currentPlayer].cupFilled <= 0) {
            this.players[this.currentPlayer].cupFilled = -1000000;
            this.setPlayers([...this.players]);
        }

        switch(this.currGameState) {
            case gameState.firstWinner: 
                if(this.nextPlayerAnimation(result)) {
                    if(this.getWinnerOfFirstRound()) {
                        this.setGameState(gameState.winnersNumber);

                        return {playersInvolved: this.players.filter((player) => {
                            if(player.isWinner) {
                                return player;
                            }
                        }), currGameState: gameState.firstWinnerfound}
                    }
                }
                return {playersInvolved: [this.players[currPlayer]], currGameState: gameState.firstWinner};

            case gameState.winnersNumber:
                this.getWinnersNumber(result);
                this.setGameState(gameState.tryHitWinner);

                return {playersInvolved: [this.players[currPlayer], ...this.players.filter((player) => {
                    if(player.isWinner) {
                        return player;
                    }
                })], currGameState: gameState.winnersNumber};

            case gameState.tryHitWinner:
                if(this.nextPlayerAnimation(result)) {
                    if(this.tryToHitWinnerNumber()) {
                        if(this.gameMode === 'easy') {
                            this.players.forEach((player) => {
                                if(!player.isWinner) {
                                    player.cupFilled -= this.sipPercentage;
                                }
                            });
                        }

                        if(this.gameMode === 'medium') {
                            this.players.forEach((player) => {
                                if(!player.isWinner) {
                                    player.cupFilled -= this.sipPercentage * player.currentNumber;
                                }
                            });
                        }

                        this.setGameState(gameState.restart);
                    
                        return {playersInvolved: this.players.filter((player) => {
                            if(player.isWinner) {
                                return player;
                            }
                        }), currGameState: gameState.tryHitWinner}

                    }
                }

                return {playersInvolved: [this.players[currPlayer], ...this.players.filter((player) => {
                    if(player.isWinner) {
                        return player;
                    }
                })], currGameState: gameState.winnersNumber};

            case gameState.restart:
                return {playersInvolved: this.players.filter((player) => {
                    if(player.isWinner) {
                        return player;
                    }
                }), currGameState: gameState.restart}

        }
        
   }

    private nextPlayerAnimation(result: number): boolean {
        let isFinished = false;
        this.players[this.currentPlayer].currentNumber = result;
        this.players[this.currentPlayer].hisTurn = false;

        let i = 1;
        if(this.currentPlayer + i === this.players.length) {
            isFinished = true;
            i = -this.currentPlayer;
        }
        while(this.players[this.currentPlayer + i].isActive === false) {
            if(this.currentPlayer + i === this.players.length) {
                isFinished = true;
                i = -this.currentPlayer;
            } else {
                i++;
            }
            if(this.currentPlayer + i === this.players.length) {
                isFinished = true;
                i = -this.currentPlayer;
            }
        }
        currPlayer = this.currentPlayer + i;
        this.setCurrentPlayer(this.currentPlayer + i);
        this.players[this.currentPlayer + i].hisTurn = true;
        this.setPlayers([...this.players]);
        return isFinished;
    }

    private getWinnerOfFirstRound(): boolean {
        let max: number = this.players[0].currentNumber;
        let index = 0;
        let sameNumbers: number[] = [];
        for(let i = 1; i < this.players.length; i++) {
            if(this.players[i].isActive === true) {
                if(this.players[i].currentNumber === max) {
                    sameNumbers.push(i);
                }
                if(this.players[i].currentNumber > max) {
                    max = this.players[i].currentNumber;
                    index = i;
                    sameNumbers = [];
                }
            }
        }

        if(sameNumbers.length > 0) {
            this.players.forEach((player) => {
                player.isWinner = false;
                player.hisTurn = false;
                player.isActive = false;
            });
            sameNumbers.push(index);
            sameNumbers.forEach((ix) => this.players[ix].isActive = true);
            const lowest = Math.min(...sameNumbers);
            this.players[lowest].hisTurn = true;
            currPlayer = lowest;
            this.setCurrentPlayer(lowest);
            this.setPlayers([...this.players]);
            return false;
        }

        this.players.forEach((player) => {
            player.isWinner = false;
            player.hisTurn = false;
            player.isActive = true;
        });
        this.players[index].isWinner = true;
        this.players[index].hisTurn = false;
        this.players[index].isActive = false;
        this.setPlayers([...this.players]);
        return true;
    }

    private getWinnersNumber(result: number) {
        this.players.forEach((player) => {
            if(player.isWinner === true) {
                player.currentNumber = result;
            }
        });
        let lowest: number = 0;
        if(this.players[0].isWinner === true) {
            lowest = 1;
        }
        this.players[lowest].hisTurn = true;
        currPlayer = lowest;
        this.setCurrentPlayer(lowest);
        this.setPlayers([...this.players]);
    }

    private tryToHitWinnerNumber() {
        let winnerIndex: number = 0;
        let winnerNumber: number = 1;
        const playersThatHit: number[] = [];

        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].isWinner) {
                winnerIndex = i;
                winnerNumber = this.players[i].currentNumber;
            }
        }
        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].currentNumber === winnerNumber && !this.players[i].isWinner && this.players[i].isActive) {
                playersThatHit.push(i);
            }
        }
        if(playersThatHit.length === 1) {
            this.players[playersThatHit[0]].isWinner = true;
            this.players.forEach((player) => player.hisTurn = false);
            this.players.forEach((player) => player.isActive = false);
            return true;
        } if(playersThatHit.length === 0){
            return false;
        } else {
            this.players.forEach((player) => player.isActive = false);
            playersThatHit.forEach((index) => this.players[index].isActive = true);
            return false;
        }
    }
}