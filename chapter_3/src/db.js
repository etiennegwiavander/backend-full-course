import {DatabaseSync} from 'node:sqlite'

const db = new DatabaseSync(':memory:') // This can't be used for production because A SQLite database can be stored in a file or completely in memory. 

// Execute SQL statements form strings
db.exec(`
    CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE,
        password TEXT
    )
`)// The PRIMARY KEY gives the id super powers that allows it to be referenced from other tables within the db eg. in the user_id below is the extension of the id above.
db.exec(`
    CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        complete BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES user(id)
    )
`)

export default db