INSERT INTO "user"(username, email, password_hash)
-- the hash is of 'password'
SELECT uname, uname || '@uwaterloo.ca', '$2b$12$uqjcEI91hEJwIuNmHQ9oge.Y0WG5DOakPAOvoyd3YaFjojfVDx9sm'
FROM (VALUES ('yayimahuman'), ('ez'), ('dmytro'), ('therealyg'), ('theupquark'), ('jayz'), ('moonlight'), ('json')) AS foo(uname);

--        yayimahuman
--             ^     \
--             |      \
--             v       v
-- dmytro <-> ez <-> therealyg
INSERT INTO user_friend(from_id, to_id)
VALUES (1, 2), (2, 1), (2, 3), (3, 2), (1, 4), (4, 1), (2, 4), (4, 2);

-- yg is friends with everyone
INSERT INTO user_friend(from_id, to_id)
SELECT u.id, 4 FROM "user" u WHERE u.id != 4
ON CONFLICT DO NOTHING;

INSERT INTO user_friend(from_id, to_id)
SELECT 4, u.id FROM "user" u WHERE u.id != 4
ON CONFLICT DO NOTHING;

INSERT INTO community(name)
-- the hash is of 'password'
VALUES ('University of Waterloo'), ('SE2022'), ('PD10'), ('MATH239'), ('SPCOM223'), ('CS349'), ('ECE105'), ('CHE102'), ('FINE130');

-- University Of Waterloo > SE2022 > [PD10, ...]
INSERT INTO community_child(community_id, child_id)
VALUES (1, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9);

-- all users are in UW
INSERT INTO community_user(community_id, user_id)
SELECT 1, u.id FROM "user" u;

-- everyone except dmytro is in SE20222 and in all courses except FINE130
INSERT INTO community_user(community_id, user_id)
SELECT c.id, u.id
FROM "user" u FULL JOIN community c ON 1 = 1
WHERE u.username != 'dmytro' AND c.id != 1 AND c.id != 9;

-- let's say only yayimahuman and yg are in FINE130
INSERT INTO community_user(community_id, user_id)
VALUES (9, 1), (9, 4);

INSERT INTO sync(name, description, cover_photo_url, deadline, community_id, owner_id, public)
VALUES ('HackNow Online Hackathon', 'Let ''s make a website called Let''sSync', '/img/8.jpg', CURRENT_TIMESTAMP + '8 hour', 1, 2, TRUE),
       ('CS 341 Assignment 2', 'Everyone welcome to join', '/img/1.jpg', CURRENT_TIMESTAMP + '1 day', 1, 1, FALSE),
       ('CS 350 Final Exam Preparation', 'Yay operating systems', '/img/2.jpg', CURRENT_TIMESTAMP + '4 day', 1, 1, FALSE);

INSERT INTO sync_invited_user(sync_id, user_id)
SELECT 1, u.id FROM "user" u;

INSERT INTO sync_invited_user(sync_id, user_id)
VALUES (2, 1), (2, 2), (2, 3), (2, 4);

INSERT INTO sync_invited_user(sync_id, user_id)
VALUES (3, 2), (3, 4), (3, 5), (3, 7);

INSERT INTO checkpoint(sync_id, name)
VALUES (1, 'Mock-ups'), (1, 'Database schema'), (1, 'Frontend skeleton'),
       (2, 'Question 1'), (2, 'Question 2A'), (2, 'Question 2B'), (2, 'Question 3'),
       (3, 'Filesystems'), (3, 'Synchronization'), (3, 'Scheduling'), (3, 'Virtual Memory');
