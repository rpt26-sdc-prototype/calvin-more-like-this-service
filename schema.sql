-- DROP DATABASE IF EXISTS morelikethis;
CREATE DATABASE IF NOT EXISTS morelikethis;

USE morelikethis;

CREATE TABLE games (
  id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE linkgames (
  id INT NOT NULL AUTO_INCREMENT,
  primary_game INT,
  linked_game INT,
  PRIMARY KEY (id),
  FOREIGN KEY (primary_game) REFERENCES games(id),
  FOREIGN KEY (linked_game) REFERENCES games(id)
);

CREATE TABLE tags (
  id INT NOT NULL AUTO_INCREMENT,
  tag VARCHAR(20),
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