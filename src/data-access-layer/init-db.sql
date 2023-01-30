CREATE TABLE 'users' (id uuid PRIMARY KEY not null default gen_random_uuid(), login text unique not null, age integer not null CHECK (age between 4 AND 130), password text not null, is_deleted bool not null default false );

INSERT into "users" (login, age, password) 
  values ('firstUser', 34, '$2b$10$Ysmn3v1v/GqiqHufVrrrZeyKONvZZ1631F2wqwDSwBlnYqfW0.KqS'),
         ('secondUser', 5, '$2b$10$dec53loy/l8AorHgADp15O3mV2DGDHp.qrF8KaPzuJSQHknyrlHl6'),
         ('aaa', 99, '$2b$10$LfS9vQYn4aRBhaNxonvVMu0IB3R88bJdbMskBbDPCGRTNLClPooQO');
