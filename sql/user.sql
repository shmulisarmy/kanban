CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE CHECK(name != ''),
    hashed_password TEXT NOT NULL
);