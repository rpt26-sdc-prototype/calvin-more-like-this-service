DROP DATABASE IF EXISTS morelikethis;
CREATE DATABASE IF NOT EXISTS morelikethis;

USE morelikethis;

CREATE TABLE IF NOT EXISTS tags (
  id INT NOT NULL,
  tag VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS games (
  id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE games_tags (
  id INT NOT NULL AUTO_INCREMENT,
  game INT,
  tag INT,
  PRIMARY KEY (id),
  FOREIGN KEY (game) REFERENCES games(id),
  FOREIGN KEY (tag) REFERENCES tags(id)
);

CREATE TABLE similar (
  id INT NOT NULL AUTO_INCREMENT,
  primary_game INT,
  linked_game INT,
  PRIMARY KEY (id),
  FOREIGN KEY (primary_game) REFERENCES games(id),
  FOREIGN KEY (linked_game) REFERENCES games(id)
);





-- LOAD DATA LOCAL INFILE '/Users/mdewitt/repos/hack_reactor/sdc/calvin-more-like-this-service/database/tags.csv' INTO TABLE tags FIELDS TERMINATED BY ',' ENCLOSED BY '"'  LINES TERMINATED BY '\n' IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/Users/mdewitt/repos/hack_reactor/sdc/calvin-more-like-this-service/database/games.csv' INTO TABLE games FIELDS TERMINATED BY ',' ENCLOSED BY '"'  LINES TERMINATED BY '\n' IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/Users/mdewitt/repos/hack_reactor/sdc/calvin-more-like-this-service/database/tags_games.csv' INTO TABLE games_tags FIELDS TERMINATED BY ',' ENCLOSED BY '"'  LINES TERMINATED BY '\n' IGNORE 1 ROWS (game, tag);

-- LOAD DATA LOCAL INFILE '/Users/mdewitt/repos/hack_reactor/sdc/calvin-more-like-this-service/database/similar.csv' INTO TABLE similar FIELDS TERMINATED BY ',' ENCLOSED BY '"'  LINES TERMINATED BY '\n' IGNORE 1 ROWS (primary_game, linked_game);