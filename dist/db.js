var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pgPromise from "pg-promise";
const db = pgPromise()("postgres://postgres:postgres@localhost:5432/exercise-SQL");
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
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
    yield db.none(`ALTER TABLE books ADD COLUMN publisher TEXT`);
    yield db.none(`ALTER TABLE books ADD COLUMN number_pages INTEGER NOT NULL`);
    // Creazione del ruolo Martin e assegnazione della password
    yield db.none(`
    CREATE ROLE martin LOGIN PASSWORD 'password';
  `);
    // Concessione dei privilegi di SELECT e UPDATE a Martin
    yield db.none(`
    GRANT SELECT, UPDATE ON TABLE books TO martin;
  `);
    // "A Journey to the Center" di Jules Verne
    yield db.none(`
    INSERT INTO books (
      title, author, genre, published_year, isbn, price, rating, stock_count, publisher, number_pages
    ) VALUES (
      'A Journey to the Center', 'Jules Verne', 'Adventure', 1864, 1234567890123, 1299, 4.5, 10, 'Verne Publishing', 350
    )
  `);
    // "War and Peace" di Leo Tolstoy
    yield db.none(`
    INSERT INTO books (
      title, author, genre, published_year, isbn, price, rating, stock_count, publisher, number_pages
    ) VALUES (
      'War and Peace', 'Leo Tolstoy', 'Historical', 1869, 1234567890124, 1499, 4.8, 5, 'Tolstoy Prints', 1200
    )
  `);
    // "Whispers of the Wind" di Amelia Blackburn
    yield db.none(`
    INSERT INTO books (
      title, author, genre, published_year, isbn, price, rating, stock_count, publisher, number_pages
    ) VALUES (
      'Whispers of the Wind', 'Amelia Blackburn', 'Romance', 1982, 1234567890125, 999, 4.2, 20, 'Blackburn House', 275
    )
  `);
    // "The Galactic Odyssey" di Orion Starfield
    yield db.none(`
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
    yield db.none(`
    UPDATE books
    SET
      price = $1,
      stock_count = stock_count - $2
    WHERE
      title = 'War and Peace'
  `, [newPrice, copiesSold]);
});
setupDb();
