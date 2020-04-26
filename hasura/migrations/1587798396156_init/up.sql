CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL
    CONSTRAINT username_length CHECK (LENGTH(username) <= 256),
  email TEXT NOT NULL
    CONSTRAINT email_unique UNIQUE
    CONSTRAINT email_length CHECK (LENGTH(email) <= 256)
    CONSTRAINT email_format CHECK (email ~* '^[A-Z0-9._%+*-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$'),
  password_hash TEXT NOT NULL
    CONSTRAINT password_hash_length CHECK (LENGTH(password_hash) = 60)
);

CREATE TABLE user_friend (
  from_id INT NOT NULL
    REFERENCES "user"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  to_id INT NOT NULL
    REFERENCES "user"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (from_id, to_id)
);

CREATE VIEW user_friend_view AS
SELECT uf.from_id as user_id, u.*
  FROM user_friend uf LEFT JOIN "user" u
    ON uf.to_id = u.id;

CREATE TABLE community (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
    CONSTRAINT name_length CHECK (LENGTH(name) <= 256)
);

CREATE TABLE community_user (
  community_id INT NOT NULL
    REFERENCES community(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  user_id INT NOT NULL
    REFERENCES "user"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (community_id, user_id)
);

CREATE VIEW community_user_view AS
SELECT cu.community_id, u.*
  FROM community_user cu LEFT JOIN "user" u
    ON cu.user_id = u.id;

CREATE VIEW user_community_view AS
SELECT cu.user_id, c.*
  FROM community_user cu LEFT JOIN community c
    ON cu.community_id = c.id;

CREATE TABLE community_child (
  community_id INT NOT NULL
    REFERENCES community(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  child_id INT NOT NULL
    REFERENCES community(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (community_id, child_id)
);

CREATE VIEW community_child_view AS
SELECT cc.community_id, c.*
  FROM community_child cc LEFT JOIN community c
    ON cc.child_id = c.id;

CREATE TABLE sync (
  id SERIAL PRIMARY KEY,
  name TEXT
    CONSTRAINT name_length CHECK (LENGTH(name) <= 256),
  description TEXT
    CONSTRAINT description_lengtht CHECK (LENGTH(description) <= 4096),
  cover_photo_url TEXT
    CONSTRAINT url_length CHECK (LENGTH(cover_photo_url) <= 1024),
  deadline TIMESTAMPTZ,
  community_id INT NOT NULL
    REFERENCES community(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  owner_id INT
    REFERENCES "user"(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  public BOOLEAN NOT NULL
);

CREATE TABLE sync_invited_user (
  sync_id INT NOT NULL
    REFERENCES sync(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  user_id INT NOT NULL
    REFERENCES "user"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (sync_id, user_id)
);

CREATE VIEW sync_invited_user_view AS
SELECT siu.sync_id, u.*
  FROM sync_invited_user siu LEFT JOIN "user" u
    ON siu.user_id = u.id;

CREATE VIEW user_invited_sync_view AS
SELECT siu.user_id, s.*
  FROM sync_invited_user siu LEFT JOIN sync s
    ON siu.sync_id = s.id;

CREATE TABLE checkpoint (
  id SERIAL PRIMARY KEY,
  sync_id INT NOT NULL
    REFERENCES sync(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  name TEXT
    CONSTRAINT name_length CHECK (LENGTH(name) <= 256)
);

CREATE TABLE user_completed_checkpoint (
  checkpoint_id INT NOT NULL
    REFERENCES checkpoint(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  user_id INT NOT NULL
    REFERENCES "user"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (checkpoint_id, user_id)
);

CREATE VIEW user_completed_checkpoint_view AS
SELECT ucc.checkpoint_id, u.*
  FROM user_completed_checkpoint ucc LEFT JOIN "user" u
    ON ucc.user_id = u.id;

CREATE VIEW checkpoint_completed_by_user_view AS
SELECT ucc.user_id, c.*
  FROM user_completed_checkpoint ucc LEFT JOIN checkpoint c
    ON ucc.checkpoint_id = c.id;
