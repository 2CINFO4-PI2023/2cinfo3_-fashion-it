import express from 'express';
import mongoose from 'mongoose';


import livreurRoutes from './routes/livreur.js';
import commandeRoutes from './routes/commande.js';


const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'livreur';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });







app.use(express.json());


app.use('/livreurs', livreurRoutes);
app.use('/commande', commandeRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});