CREATE TABLE match_sets (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES matches(id),
    set_number INT,
    player_one_games INT,
    player_two_games INT,
    tiebreak INT
);