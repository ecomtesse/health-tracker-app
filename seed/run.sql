\i schema.sql

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE weight_id_seq RESTART WITH 1;

\i seed/users.sql
\i seed/weight.sql