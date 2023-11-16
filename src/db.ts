import pgPromise from "pg-promise";

const db = pgPromise()(
  "postgres://postgres:postgres@localhost:5432/exercise-SQL"
);

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS books;

    CREATE TABLE books (
        book_id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL,
        published_year INTEGER NOT NULL,
        isbn INTEGER NOT NULL,
        price INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        stock_count INTEGER NOT NULL
    )

    
    `);

  await db.none(`ALTER TABLE books ADD COLUMN publisher TEXT`);
  await db.none(`ALTER TABLE books ADD COLUMN number_pages INTEGER NOT NULL`);
};
setupDb();
