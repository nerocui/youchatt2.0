INSERT INTO users(id, email, username, first_name, last_name, initials, profile_pic) VALUES
('id1', 'user1@email.com', 'username1', 'first1', 'last1', 'I1', 'https://pbs.twimg.com/profile_images/614185448752173056/KSkRuIdp.jpg'), -- user 1;
('id2', 'user2@email.com', 'username2', 'first2', 'last2', 'I2', 'https://pbs.twimg.com/profile_images/614185448752173056/KSkRuIdp.jpg'), -- user 2;
('id3', 'user3@email.com', 'username3', 'first3', 'last3', 'I3', 'https://pbs.twimg.com/profile_images/614185448752173056/KSkRuIdp.jpg'), -- user 3;
('id4', 'user4@email.com', 'username4', 'first4', 'last4', 'I4', 'https://pbs.twimg.com/profile_images/614185448752173056/KSkRuIdp.jpg'), -- user 4;
('id5', 'user5@email.com', 'username5', 'first5', 'last5', 'I5', 'https://pbs.twimg.com/profile_images/614185448752173056/KSkRuIdp.jpg') -- user 5;
RETURNING id
