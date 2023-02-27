const express = require("express");
const app = express();

const mysql = require("mysql2");
const cors = require("cors");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "phonodb",
});
app.use(cors());

app.use(express.json());

app.post("/register", (req, res) => {
  const { cpf } = req.body;
  const { name } = req.body;
  const { profession } = req.body;
  const { insurance } = req.body;
  const { requester } = req.body;
  const { age } = req.body;
  const { sex } = req.body;
  const { dn } = req.body;
  const { fono } = req.body;

  const person_cpf = req.body.cpf;
  const { laudo } = req.body;
  const { monoE } = req.body;
  const { dissE } = req.body;
  const { dbnaE } = req.body;
  const { srtE } = req.body;
  const { monoD } = req.body;
  const { dbnaD } = req.body;
  const { srtD } = req.body;
  const { pressaoE } = req.body;
  const { complE } = req.body;
  const { volumeE } = req.body;
  const { gradE } = req.body;
  const { fechaE } = req.body;
  const { pressaoD } = req.body;
  const { complD } = req.body;
  const { volumeD } = req.body;
  const { gradD } = req.body;
  const { fechaD } = req.body;
  const { contraLD1 } = req.body;
  const { contraLD2 } = req.body;
  const { contraLD3 } = req.body;
  const { contraLD4 } = req.body;
  const { contraLE1 } = req.body;
  const { contraLE2 } = req.body;
  const { contraLE3 } = req.body;
  const { contraLE4 } = req.body;
  const { ipsiD1 } = req.body;
  const { ipsiD2 } = req.body;
  const { ipsiD3 } = req.body;
  const { ipsiD4 } = req.body;
  const { ipsiE1 } = req.body;
  const { ipsiE2 } = req.body;
  const { ipsiE3 } = req.body;
  const { e1 } = req.body;
  const { e2 } = req.body;
  const { e3 } = req.body;
  const { e4 } = req.body;
  const { e5 } = req.body;
  const { e6 } = req.body;
  const { e7 } = req.body;
  const { e8 } = req.body;
  const { d1 } = req.body;
  const { d2 } = req.body;
  const { d3 } = req.body;
  const { d4 } = req.body;
  const { d5 } = req.body;
  const { d6 } = req.body;
  const { d7 } = req.body;
  const { d8 } = req.body;

  let SQL =
    "INSERT INTO person (cpf, name, profession,insurance,requester,age, sex, dn, fono ) VALUES (?,?,?,?,?,?,?,?,?)";

  let SQL2 =
    "INSERT INTO exam (person_cpf, laudo,monoE,dissE,dbnaE,srtE,monoD,dbnaD,srtD,pressaoE,complE,volumeE,gradE,fechaE,pressaoD,complD,volumeD,gradD,fechaD,contraLD1,contraLD2,contraLD3,contraLD4,contraLE1,contraLE2,contraLE3,contraLE4,ipsiD1,ipsiD2,ipsiD3, ipsiD4,ipsiE1, ipsiE2,ipsiE3,e1,e2,e3,e4,e5,e6,e7,e8,d1,d2,d3,d4,d5,d6,d7,d8) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(
    SQL,
    [cpf, name, profession, insurance, requester, age, sex, dn, fono],
    (err, result) => {
      console.log(err);
      if (err) res.send(err);
      else return res.send(result);
    }
  );

  db.query(
    SQL2,
    [
      person_cpf,
      laudo,
      monoE,
      dissE,
      dbnaE,
      srtE,
      monoD,
      dbnaD,
      srtD,
      pressaoE,
      complE,
      volumeE,
      gradE,
      fechaE,
      pressaoD,
      complD,
      volumeD,
      gradD,
      fechaD,
      contraLD1,
      contraLD2,
      contraLD3,
      contraLD4,
      contraLE1,
      contraLE2,
      contraLE3,
      contraLE4,
      ipsiD1,
      ipsiD2,
      ipsiD3,
      ipsiD4,
      ipsiE1,
      ipsiE2,
      ipsiE3,
      e1,
      e2,
      e3,
      e4,
      e5,
      e6,
      e7,
      e8,
      d1,
      d2,
      d3,
      d4,
      d5,
      d6,
      d7,
      d8,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/register/exam", (req, res) => {
  const person_cpf = req.body.cpf;
  const { laudo } = req.body;
  const { monoE } = req.body;
  const { dissE } = req.body;
  const { dbnaE } = req.body;
  const { srtE } = req.body;
  const { monoD } = req.body;
  const { dbnaD } = req.body;
  const { srtD } = req.body;
  const { pressaoE } = req.body;
  const { complE } = req.body;
  const { volumeE } = req.body;
  const { gradE } = req.body;
  const { fechaE } = req.body;
  const { pressaoD } = req.body;
  const { complD } = req.body;
  const { volumeD } = req.body;
  const { gradD } = req.body;
  const { fechaD } = req.body;
  const { contraLD1 } = req.body;
  const { contraLD2 } = req.body;
  const { contraLD3 } = req.body;
  const { contraLD4 } = req.body;
  const { contraLE1 } = req.body;
  const { contraLE2 } = req.body;
  const { contraLE3 } = req.body;
  const { contraLE4 } = req.body;
  const { ipsiD1 } = req.body;
  const { ipsiD2 } = req.body;
  const { ipsiD3 } = req.body;
  const { ipsiD4 } = req.body;
  const { ipsiE1 } = req.body;
  const { ipsiE2 } = req.body;
  const { ipsiE3 } = req.body;
  const { e1 } = req.body;
  const { e2 } = req.body;
  const { e3 } = req.body;
  const { e4 } = req.body;
  const { e5 } = req.body;
  const { e6 } = req.body;
  const { e7 } = req.body;
  const { e8 } = req.body;
  const { d1 } = req.body;
  const { d2 } = req.body;
  const { d3 } = req.body;
  const { d4 } = req.body;
  const { d5 } = req.body;
  const { d6 } = req.body;
  const { d7 } = req.body;
  const { d8 } = req.body;

  let SQL =
    "INSERT INTO exam (person_cpf, laudo,monoE,dissE,dbnaE,srtE,monoD,dbnaD,srtD,pressaoE,complE,volumeE,gradE,fechaE,pressaoD,complD,volumeD,gradD,fechaD,contraLD1,contraLD2,contraLD3,contraLD4,contraLE1,contraLE2,contraLE3,contraLE4,ipsiD1,ipsiD2,ipsiD3, ipsiD4,ipsiE1, ipsiE2,ipsiE3,e1,e2,e3,e4,e5,e6,e7,e8,d1,d2,d3,d4,d5,d6,d7,d8) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(
    SQL,
    [
      person_cpf,
      laudo,
      monoE,
      dissE,
      dbnaE,
      srtE,
      monoD,
      dbnaD,
      srtD,
      pressaoE,
      complE,
      volumeE,
      gradE,
      fechaE,
      pressaoD,
      complD,
      volumeD,
      gradD,
      fechaD,
      contraLD1,
      contraLD2,
      contraLD3,
      contraLD4,
      contraLE1,
      contraLE2,
      contraLE3,
      contraLE4,
      ipsiD1,
      ipsiD2,
      ipsiD3,
      ipsiD4,
      ipsiE1,
      ipsiE2,
      ipsiE3,
      e1,
      e2,
      e3,
      e4,
      e5,
      e6,
      e7,
      e8,
      d1,
      d2,
      d3,
      d4,
      d5,
      d6,
      d7,
      d8,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(3001, () => {
  console.log("server On");
});

app.get("/", (req, res) => {
  res.send("hello wolrd");
});

app.get("/persons", (req, res) => {
  let SQL = "SELECT * from person";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/person/:id", (req, res) => {
  const cpf = req.params.id;
  let SQL = "SELECT * from person where cpf = ?";
  db.query(SQL, [cpf], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/exam/:cpf", (req, res) => {
  const cpf = req.params.cpf;
  let SQL = "SELECT * from exam where person_cpf = ?";
  console.log(cpf);
  db.query(SQL, [cpf], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/edit", (req, res) => {
  const { cpf } = req.body;
  const { name } = req.body;
  const { dn } = req.body;

  let SQL = "UPDATE person SET name = ?, dn = ? WHERE cpf = ?";

  db.query(SQL, [name, dn, cpf], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/delete/:cpf", (req, res) => {
  const { cpf } = req.params;
  let SQL = "DELETE FROM person WHERE cpf = ?";

  db.query(SQL, [cpf], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
