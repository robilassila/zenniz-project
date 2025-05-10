CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    player_one_id INT REFERENCES players(id),
    player_two_id INT REFERENCES players(id),
    winner_id INT REFERENCES players(id),
    start_time TIMESTAMP,
    end_time TIMESTAMP
);