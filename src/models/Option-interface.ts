import {Player} from './Player-interface';

export interface Option {
    allPlayers: Player[],
    sips: number,
    gameMode: string
}