CREATE TABLE IF NOT EXISTS `mydb`.`Admin` (
  `AdminID` VARCHAR(45) NOT NULL,
  `AdminName` VARCHAR(45) NOT NULL,
  `AdminPass` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`AdminID`));

INSERT INTO Admin (AdminID, AdminName, AdminPass)
VALUES('nsteves', 'Nathan Steves', 'Admin123'),
	('elieu', 'Evan Liu', 'Admin123'),
	('nlovett', 'Nurielle Lovett', 'Admin123'),
	('lnguyen', 'Lan Nguyen', 'Admin123'),
	('hphan', 'Henry Phan', 'Admin123');

CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `UserID` INT NOT NULL,
  `UserName` VARCHAR(45) NOT NULL,
  `UserPass` VARCHAR(45) NOT NULL,
  `DownloadedGame` BINARY(1) NULL,
  PRIMARY KEY (`UserID`));
  
INSERT INTO Users (UserID, UserName, UserPass)
VALUES (1, 'Test1', 'TestPass'),
	(2, 'Test2', 'TestPass'),
	(3, 'Test3', 'TestPass');
