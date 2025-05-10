import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
} from 'kysely'

export interface PlayerTable {
    id: Generated<number>
    name: string,
    date_of_birth: Date
}

export interface Database {
    players: PlayerTable
}

export type Player = Selectable<PlayerTable>
export type NewPlayer = Insertable<PlayerTable>
export type PlayerUpdate = Updateable<PlayerTable>