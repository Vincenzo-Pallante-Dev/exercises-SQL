import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/titanic");

const setupDB = async () => {
  // Visualizzare le passeggeri donne sopravvissute e che hanno più di 30 anni.
  await db.none(
    `SELECT * FROM passengers WHERE c5="female" AND c6 >30 AND c2= 1`
  );

  // Trovare l'età media degli uomini che non sono sopravvissuti.
  await db.none(
    `SELECT AVG(C6) AS [Avg_Age] FROM passengers WHERE c5="male" AND c2= 0`
  );

  // Visualizza le informazioni per i passeggeri che hanno speso tra $ 20 e $ 50 per i loro biglietti
  // e sono saliti sulla nave al porto "C".
  await db.none(
    `SELECT * FROM passengers WHERE c10 BETWEEN 20 AND 50 AND c12= "C"`
  );

  // Trovare il numero totale dei sopravvissuti nella prima classe.
  await db.none(`SELECT SUM(c2)FROM passengers WHERE c2= 1 AND c3= 1`);

  // Mostra le informazioni dei passeggeri che sono saliti a bordo da Cherbourg (porto 'C')
  // e hanno speso più di $ 75 per i loro biglietti.".
  await db.none(`SELECT * FROM passengers WHERE c12= "C" AND c10 >75`);
};

setupDB();
