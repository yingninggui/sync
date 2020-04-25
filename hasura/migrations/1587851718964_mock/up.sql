INSERT INTO "user"(username, email, password_hash)
-- the hash is of 'password'
SELECT uname, uname || '@gmail.com', '$2b$12$uqjcEI91hEJwIuNmHQ9oge.Y0WG5DOakPAOvoyd3YaFjojfVDx9sm'
FROM (VALUES ('yayimahuman'), ('ez'), ('dmytro'), ('therealyg'), ('theupquark'), ('jayz'), ('moonlight'), ('json')) AS foo(uname);

--        yayimahuman
--             ^     \
--             |      \
--             v       v
-- dmytro <-> ez <-> therealyg 
INSERT INTO user_friend(from_id, to_id)
VALUES (1, 2), (2, 1), (2, 3), (3, 2), (1, 4), (4, 1), (2, 4), (4, 2);

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
