--create a board(title)
INSERT INTO board (title) VALUES ('My board');

--create a list(title, board_id)
INSERT INTO list (title, board_id) VALUES ($1, $2);

--create a task(title, list_id)
INSERT INTO task (title, list_id) VALUES ($3, $4);
