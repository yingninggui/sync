CREATE TABLE "user" (
  id INT PRIMARY KEY
    GENERATED ALWAYS AS IDENTITY,
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

CREATE TABLE community (
  id INT PRIMARY KEY
    GENERATED ALWAYS AS IDENTITY,
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


CREATE TABLE sync (
  id INT PRIMARY KEY
    GENERATED ALWAYS AS IDENTITY,
  name TEXT
    CONSTRAINT name_length CHECK (LENGTH(name) <= 256),
  description TEXT
    CONSTRAINT description_lengtht CHECK (LENGTH(description) <= 4096),
  cover_photo_url TEXT
    CONSTRAINT url_length CHECK (LENGTH(cover_photo_url) <= 1024)
    CONSTRAINT url_valid CHECK (cover_photo_url ~* '^https?://[^\s/$.?#].[^\s]*$'),
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

CREATE TABLE checkpoint (
  id INT PRIMARY KEY
    GENERATED ALWAYS AS IDENTITY,
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
