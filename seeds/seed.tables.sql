BEGIN;

TRUNCATE
    "word",
    "language",
    "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
    (
        1,
        'admin',
        'kakarot',
        -- password = "pass"
        '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
    );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
    (1, 'German', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
    (1, 1, 'trainieren', 'practice', 2),
    (2, 1, 'hallo', 'hello', 3),
    (3, 1, 'haus', 'house', 4),
    (4, 1, 'entwickler', 'developer', 5),
    (5, 1, 'übersetzen', 'translate', 6),
    (6, 1, 'tolle', 'amazing', 7),
    (7, 1, 'hund', 'dog', 8),
    (8, 1, 'katze', 'cat', 9),
    (9, 1, 'kommunizieren', 'communicate', 10),
    (10, 1, 'auf wiedersehen', 'goodbye', 11),
    (11, 1, 'lebensmittel', 'food', 12),
    (12, 1, 'junge', 'boy', 13),
    (13, 1, 'mädchen', 'girl', 14),
    (14, 1, 'mann', 'man', 15),
    (15, 1, 'frau', 'woman', 16),
    (16, 1, 'technologie', 'technology', 17),
    (17, 1, 'ingenieur', 'engineer', 18),
    (18, 1, 'lernen', 'learn', 19),
    (19, 1, 'liebe', 'love', 20),
    (20, 1, 'tag', 'day', 21),
    (21, 1, 'nacht-', 'night', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
