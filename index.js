import express from 'express';
import mongoose from 'mongoose';

//import typeRoutes 
import TypeRoutes from './routes/type.js';

const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 9090;
const databaseName = '2cinfo3-fashion-it';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// Se connecter à MongoDB
mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    // Une fois connecté, afficher un message de réussite sur la console
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    // Si quelque chose ne va pas, afficher l'erreur sur la console
    console.log(err);
  });

app.use(express.json());

app.use('/type',TypeRoutes);

app.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})