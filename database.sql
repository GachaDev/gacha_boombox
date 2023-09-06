CREATE TABLE `gacha_playlists` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`owner` VARCHAR(255) NOT NULL DEFAULT '',
	PRIMARY KEY (`id`)
)
COLLATE='utf8mb4_general_ci'
;
CREATE TABLE `gacha_songs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`url` VARCHAR(50) NOT NULL DEFAULT '0',
	`name` VARCHAR(150) NOT NULL DEFAULT '0',
	`author` VARCHAR(50) NOT NULL DEFAULT '0',
	`maxDuration` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `url` (`url`)
)
COLLATE='utf8mb4_general_ci'
;
CREATE TABLE `gacha_playlists_users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`license` VARCHAR(255) NOT NULL DEFAULT '',
	`playlist` INT NOT NULL DEFAULT 0,
	INDEX `license` (`license`),
	PRIMARY KEY (`id`),
	CONSTRAINT `FK__gacha_playlists_users` FOREIGN KEY (`playlist`) REFERENCES `gacha_playlists` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci'
;
CREATE TABLE `gacha_playlist_songs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`playlist` INT NOT NULL DEFAULT '0',
	`song` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`),
	CONSTRAINT `FK__gacha_playlists` FOREIGN KEY (`playlist`) REFERENCES `gacha_playlists` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `FK__gacha_songs` FOREIGN KEY (`song`) REFERENCES `gacha_songs` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci'
;