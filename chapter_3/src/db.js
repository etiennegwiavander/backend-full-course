import {DatabaseSync} from 'node:sqlite'

const db = new DatabaseSync(':memory:') // This can't be used for production because A SQLite database can be stored in a file or completely in memory. 