import pgPromise from "pg-promise";

const db = pgPromise()(
  "postgres://postgres:postgres@localhost:5432/exercise-SQL"
);

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS books;

    CREATE TABLE books (
        book_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL,
        published_year INTEGER NOT NULL,
        isbn TEXT NOT NULL,
        price INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        stock_count INTEGER NOT NULL
    )

    
    `);

  await db.none(`ALTER TABLE books ADD COLUMN publisher TEXT`);
  await db.none(`ALTER TABLE books ADD COLUMN number_pages INTEGER NOT NULL`);

  // "A Journey to the Center" di Jules Verne
  await db.none(`
    INSERT INTO books (
      title, author, genre, published_year, isbn, price, rating, stock_count, publisher, number_pages
    ) VALUES (
      'A Journey to the Center', 'Jules Verne', 'Adventure', 1864, 1234567890123, 1299, 4.5, 10, 'Verne Publishing', 350
    )
  `);

  // "War and Peace" di Leo Tolstoy
  await db.none(`
    INSERT INTO books (
      title, author, genre, published_year, isbn, price, rating, stock_count, publisher, number_pages
    ) VALUES (
      'War and Peace', 'Leo Tolstoy', 'Historical', 1869, 1234567890124, 1499, 4.8, 5, 'Tolstoy Prints', 1200
    )
  `);

  // "Whispers of the Wind" di Amelia Blackburn
  await db.none(`
    INSERT INTO books (
      title, author, genre, published_year, isbn, price, rating, stock_count, publisher, number_pages
    ) VALUES (
      'Whispers of the Wind', 'Amelia Blackburn', 'Romance', 1982, 1234567890125, 999, 4.2, 20, 'Blackburn House', 275
    )
  `);

  // "The Galactic Odyssey" di Orion Starfield
  await db.none(`
    INSERT INTO books (
      title, author, genre, published_year, isbn, price, rating, stock_count, publisher, number_pages
    ) VALUES (
      'The Galactic Odyssey', 'Orion Starfield', 'Science Fiction', 2005, 1234567890126, 1999, 4.9, 15, 'Nebula Press', 450
    )
  `);

  // Nuovo prezzo dopo la riduzione
  const newPrice = 1299;

  // Numero di copie vendute
  const copiesSold = 1;

  // Aggiorno il prezzo e il numero di scorte per "War and Peace"
  await db.none(
    `
    UPDATE books
    SET
      price = $1,
      stock_count = stock_count - $2
    WHERE
      title = 'War and Peace'
  `,
    [newPrice, copiesSold]
  );
};
setupDb();
