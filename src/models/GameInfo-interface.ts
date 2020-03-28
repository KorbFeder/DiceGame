import { Player } from "./Player-interface";
import { gameState } from "./gameState";

export interface GameInfo {
    playersInvolved: Player[];
    currGameState: gameState;
}