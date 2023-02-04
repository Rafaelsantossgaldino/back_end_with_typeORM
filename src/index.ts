import express from "express";
import { PostgresDataSource } from "./data-source";

PostgresDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Funcionando');
  })

  return app.listen(process.env.PORT)
})
