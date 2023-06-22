import Commande from '../models/commande.js';
import Livreur from '../models/livreur.js';



export function getAll(req, res) {
    Commande
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {

    Commande
    .create(req.body)
    .then(newCommande => {
        res.status(200).json(newCommande);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function patchOnce(req, res) {
    Commande
    .findOneAndUpdate({ "_id": req.params._id } , req.body, { new: true , runValidators: true })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function deleteOnce(req, res) {
    Commande
    .findOneAndRemove({ "_id": req.params._id })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}


export function afficherCarteCommande(req, res) {
    const commandeId = req.params._id;
  
    
    Commande.findById(commandeId)
      .then(commande => {
        
        if (!commande) {
          return res.status(404).json({ message: 'Commande not found' });
        }
  
        const latitude = commande.latitude;
        const longitude = commande.longitude;
  
        const html = `
          <!DOCTYPE html>
          <html lang="en">
  
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Carte de commande</title>
            <style>
              #map {
                height: 400px;
                width: 100%;
              }
            </style>
          </head>
  
          <body>
            <h1>position du commande</h1>
            <div id="map"></div>
  
            <script>
              function initMap() {
                const latitude = ${latitude};
                const longitude = ${longitude};
  
                const map = new google.maps.Map(document.getElementById('map'), {
                  center: { lat: latitude, lng: longitude },
                  zoom: 12,
                });
  
                const marker = new google.maps.Marker({
                  position: { lat: latitude, lng: longitude },
                  map: map,
                });
              }
            </script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDioPCB5uzrqpeIbvpTjYa2FjscTKETV7c&callback=initMap" async defer></script>
          </body>
  
          </html>
        `;
  
        res.send(html);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }