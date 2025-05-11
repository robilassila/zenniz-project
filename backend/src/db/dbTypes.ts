import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

export interface PlayerTable {
    id: Generated<number>
    name: string,
    date_of_birth: Date
}

export interface MatchTable {
    id: Generated<number>
    player_one_id: number,
    player_two_id: number,
    winner_id: number,
    start_time: Date,
    end_time: Date
}

export interface Database {
    players: PlayerTable
    matches: MatchTable
}

export type Player = Selectable<PlayerTable>
export type NewPlayer = Insertable<PlayerTable>
export type PlayerUpdate = Updateable<PlayerTable>

export type Match = Selectable<MatchTable>
export type NewMatch = Insertable<MatchTable>