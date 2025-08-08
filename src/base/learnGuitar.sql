CREATE DATABASE learnguitar;

use learnguitar;

CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL,
    photo VARCHAR(255) NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE post(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    text VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_id FOREIGN KEY(user_id) REFERENCES user(id)
)

CREATE TABLE comment(
	id INT PRIMARY KEY AUTO_INCREMENT,
	post_id INT,
	user_id INT,
	response_post_user_id INT,
	text VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES post(id),
	CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES user(id),
	CONSTRAINT fk_comment_response_user FOREIGN KEY (response_post_user_id) REFERENCES user(id)
);

CREATE TABLE likePost(
	id INT PRIMARY KEY AUTO_INCREMENT,
	post_id INT,
	user_id INT,
	CONSTRAINT fk_likePost_post FOREIGN KEY (post_id) REFERENCES post(id),
	CONSTRAINT fk_likePost_user FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE likeComment(
	id INT PRIMARY KEY AUTO_INCREMENT,
	comment_id INT,
	user_id INT,
	CONSTRAINT fk_likeComment_comment FOREIGN KEY (comment_id) REFERENCES comment(id),
	CONSTRAINT fk_likeComment_user FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE category(
	id INT PRIMARY KEY AUTO_INCREMENT,
	text VARCHAR(100)
);

CREATE TABLE classroom(
	id INT PRIMARY KEY AUTO_INCREMENT,
	category_id INT,
	title VARCHAR(100) NOT NULL,
	sourceVideo VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	sourcePdf VARCHAR(255) NULL,
	CONSTRAINT fk_category_classroom FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category(text) VALUES ("iniciante"), ("intermediário"), ("Avançado")

CREATE TABLE video (
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	title VARCHAR(100) NOT NULL,
	description VARCHAR(255) NULL,
	tumblr VARCHAR(255) NULL,
	sourceVideoYoutube VARCHAR(255) NOT NULL,
	CONSTRAINT fk_video_user FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE friend (
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	user_friend_id INT,
	CONSTRAINT fk_friend_user FOREIGN KEY (user_id) REFERENCES user(id),
	CONSTRAINT fk_friend_user_friend FOREIGN KEY (user_friend_id) REFERENCES user(id)
);
