import {DatabaseSync} from 'node:sqlite'

const testCoachdb = new DatabaseSync(':memory:')


// Enable foreign key constraints
testCoachdb.exec('PRAGMA foreign_keys = ON;');

// Create Coaches table
testCoachdb.exec(`
CREATE TABLE Coaches (
    coach_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender TEXT CHECK(gender IN ('Male', 'Female', 'Other', 'Prefer not to say')),
    email TEXT NOT NULL UNIQUE,
    bio TEXT,
    specialties TEXT,
    certifications TEXT,
    experience_years INTEGER,
    hourly_rate DECIMAL(10, 2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Create Video Reviews table
testCoachdb.exec(`
CREATE TABLE Reviews (
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    coach_id INTEGER NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    video_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coach_id) REFERENCES Coaches(coach_id) ON DELETE CASCADE
)`);

// Create Social Media table
testCoachdb.exec(`
CREATE TABLE SocialMedia (
    social_id INTEGER PRIMARY KEY AUTOINCREMENT,
    coach_id INTEGER NOT NULL,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    FOREIGN KEY (coach_id) REFERENCES Coaches(coach_id) ON DELETE CASCADE
)`);

// Create Availability table
testCoachdb.exec(`
CREATE TABLE Availability (
    availability_id INTEGER PRIMARY KEY AUTOINCREMENT,
    coach_id INTEGER NOT NULL,
    day_of_week TEXT CHECK(day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (coach_id) REFERENCES Coaches(coach_id) ON DELETE CASCADE
)`);

// Create Languages table
testCoachdb.exec(`
CREATE TABLE Languages (
    language_id INTEGER PRIMARY KEY AUTOINCREMENT,
    coach_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    proficiency_level TEXT CHECK(proficiency_level IN ('Basic', 'Conversational', 'Fluent', 'Native')),
    FOREIGN KEY (coach_id) REFERENCES Coaches(coach_id) ON DELETE CASCADE
)`);

// Create Qualifications table
testCoachdb.exec(`
CREATE TABLE Qualifications (
    qualification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    coach_id INTEGER NOT NULL,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    year_obtained INTEGER,
    FOREIGN KEY (coach_id) REFERENCES Coaches(coach_id) ON DELETE CASCADE
)`);

console.log('All tables created successfully!');

export default testCoachdb
