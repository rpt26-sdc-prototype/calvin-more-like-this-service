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
  tag0 INT,
  tag1 INT,
  tag2 INT,
  tag3 INT,
  tag4 INT,
  similar0 INT,
  similar1 INT,
  similar2 INT,
  similar3 INT,
  similar4 INT,
  similar5 INT,
  similar6 INT,
  similar7 INT,
  similar8 INT,
  similar9 INT,
  PRIMARY KEY (id),
  FOREIGN KEY (tag0) REFERENCES tags(id),
  FOREIGN KEY (tag1) REFERENCES tags(id),
  FOREIGN KEY (tag2) REFERENCES tags(id),
  FOREIGN KEY (tag3) REFERENCES tags(id),
  FOREIGN KEY (tag4) REFERENCES tags(id),
  FOREIGN KEY (similar0) REFERENCES games(id),
  FOREIGN KEY (similar1) REFERENCES games(id),
  FOREIGN KEY (similar2) REFERENCES games(id),
  FOREIGN KEY (similar3) REFERENCES games(id),
  FOREIGN KEY (similar4) REFERENCES games(id),
  FOREIGN KEY (similar5) REFERENCES games(id),
  FOREIGN KEY (similar6) REFERENCES games(id),
  FOREIGN KEY (similar7) REFERENCES games(id),
  FOREIGN KEY (similar8) REFERENCES games(id),
  FOREIGN KEY (similar9) REFERENCES games(id)
);

-- LOAD DATA INFILE '/Users/mdewitt/repos/hack_reactor/sdc/calvin-more-like-this-service/database/mysql.csv'
-- INTO TABLE games
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- CREATE TABLE linkgames (
--   id INT NOT NULL AUTO_INCREMENT,
--   primary_game INT,
--   linked_game INT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (primary_game) REFERENCES games(id),
--   FOREIGN KEY (linked_game) REFERENCES games(id)
-- );


-- CREATE TABLE games_tags (
--   id INT NOT NULL AUTO_INCREMENT,
--   game INT,
--   tag INT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (game) REFERENCES games(id),
--   FOREIGN KEY (tag) REFERENCES tags(id)
-- );

-- LOAD DATA LOCAL INFILE '/Users/mdewitt/repos/hack_reactor/sdc/calvin-more-like-this-service/database/tags.csv' INTO TABLE tags FIELDS TERMINATED BY ',' ENCLOSED BY '"'  LINES TERMINATED BY '\n' IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/Users/mdewitt/repos/hack_reactor/sdc/calvin-more-like-this-service/database/tags.csv' INTO TABLE tags LINES TERMINATED BY '\n' IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/Users/mdewitt/repos/hack_reactor/sdc/calvin-more-like-this-service/database/mysql.csv' INTO TABLE games FIELDS TERMINATED BY ',' ENCLOSED BY '"'  LINES TERMINATED BY '\n' IGNORE 1 ROWS;