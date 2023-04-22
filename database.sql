create database posts;
use posts;

CREATE TABLE rols(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `actions` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

insert into rols (name,actions) values ("basic","access");
insert into rols (name,actions) values ("medium","access,read");
insert into rols (name,actions) values ("high_medium","access,create");
insert into rols (name,actions) values ("medium_high","access,create,update,read");
insert into rols (name,actions) values ("high","access,create,update,read,delete");

create table users(id tinyint primary key auto_increment, 
name varchar(100) not null, 
last_name varchar(50) not null, 
second_last_name varchar(50), 
username varchar(50)not null, 
password varchar(500) not null,
state ENUM("active", "inactive") NOT NULL DEFAULT 'active');

ALTER TABLE `posts`.`users` 
ADD COLUMN `idRol` INT NULL AFTER `state`,
ADD INDEX `rolUser_idx` (`idRol` ASC) VISIBLE;
;
ALTER TABLE `posts`.`users` 
ADD CONSTRAINT `rolUser`
  FOREIGN KEY (`idRol`)
  REFERENCES `posts`.`rols` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  CREATE TABLE `posts`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `idUser` TINYINT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `state` ENUM("active", "inactive") NOT NULL DEFAULT "active",
  PRIMARY KEY (`id`),
  INDEX `idUserPost_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `idUserPost`
    FOREIGN KEY (`idUser`)
    REFERENCES `posts`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
