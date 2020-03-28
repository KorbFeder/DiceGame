export interface Player {
    name: string;
    pkey: number;
    isActive: boolean;
    hisTurn: boolean;
    beerNr: number;
    cupFilled: number;
    currentNumber: number;
    isWinner: boolean;
}