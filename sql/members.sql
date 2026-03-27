CREATE TABLE board_members (
    board_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (board_id, user_id)
);