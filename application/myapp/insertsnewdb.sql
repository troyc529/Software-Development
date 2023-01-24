INSERT INTO Category(category) VALUES ('eBook');
INSERT INTO Category(category) VALUES ('Video');
INSERT INTO Category(category) VALUES ('Image');
INSERT INTO Category(category) VALUES ('Audio');


INSERT INTO Users(email, password, date_time) VALUES('test@example.com', '$2b$10$OlboLw3hHFGwL2ioLMSLEOKWIV0NIKwUoNOOU5v4HhEOqwjdzjMQ.', NOW());

INSERT INTO Posts(email, name, category, description, asking_price, image, image_thumbnail, date_time, approved) VALUES('test@example.com', 'post', 1, 'I LIKE FOOD' ,'$80.00', 'public/images/uploads/90740d50e894be78a3ab64c7.png', 'public/images/uploads/thumbnail-90740d50e894be78a3ab64c7.png', NOW(), 0);
INSERT INTO Posts(email, name, category, description, asking_price, image, image_thumbnail, date_time, approved) VALUES('test@example.com', 'test', 2, 'I LIKE FOOD' ,'$80.00', 'public/images/uploads/297e27ab6353fa664e70255b.jpeg', 'public/images/uploads/thumbnail-297e27ab6353fa664e70255b.jpeg', NOW(), 1);
INSERT INTO Posts(email, name, category, description, asking_price, image, image_thumbnail, date_time, approved) VALUES('test@example.com', 'horror', 3, 'I LIKE FOOD' ,'$80.00', 'public/images/uploads/c875e0ac951c3d92391823c7.png', 'public/images/uploads/thumbnail-c875e0ac951c3d92391823c7.png', NOW(), 1);
INSERT INTO Posts(email, name, category, description, asking_price, image, image_thumbnail, date_time, approved) VALUES('test@example.com', 'literature', 1, 'I LIKE FOOD' ,'$80.00', 'public/images/uploads/90740d50e894be78a3ab64c7.png', 'public/images/uploads/thumbnail-90740d50e894be78a3ab64c7.png', NOW(), 1);
INSERT INTO Posts(email, name, category, description, asking_price, image, image_thumbnail, date_time, approved) VALUES('test@example.com', 'movietime', 2, 'I LIKE FOOD' ,'$80.00', 'public/images/uploads/297e27ab6353fa664e70255b.jpeg', 'public/images/uploads/thumbnail-297e27ab6353fa664e70255b.jpeg', NOW(), 1);
INSERT INTO Posts(email, name, category, description, asking_price, image, image_thumbnail, date_time, approved) VALUES('test@example.com', 'america', 4, 'I LIKE FOOD' ,'$0', 'public/images/uploads/c875e0ac951c3d92391823c7.png', 'public/images/uploads/thumbnail-c875e0ac951c3d92391823c7.png', NOW(), 1);

-- INSERT INTO Favorites(email, post_id) VALUES('test@example.com', 1);
-- INSERT INTO Favorites(email, post_id) VALUES('test@example.com', 2);
-- INSERT INTO Favorites(email, post_id) VALUES('test@example.com', 3);

INSERT INTO Message_Inbox(post_id, message_txt, date_time, message_sender_info) VALUES (1, 'hello world', NOW(), 'test@example.com');

INSERT INTO Message_Inbox(post_id, message_txt, date_time, message_sender_info) VALUES (2, 'hello world', NOW(), 'test@example.com');

INSERT INTO Message_Inbox(post_id, message_txt, date_time, message_sender_info) VALUES (3, 'hello world', NOW(), 'test@example.com');

INSERT INTO Message_Inbox(post_id, message_txt, date_time, message_sender_info) VALUES (4, 'hello world', NOW(), 'test@example.com');

INSERT INTO Message_Inbox(post_id, message_txt, date_time, message_sender_info) VALUES (5, 'hello world', NOW(), 'test@example.com');

INSERT INTO Message_Inbox(post_id, message_txt, date_time, message_sender_info) VALUES (6, 'hello world', NOW(), 'test@example.com');