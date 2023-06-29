import mongoose from 'mongoose';
import Livreur from '../models/livreur.js';
import Notelivreur from '../models/notelivreur.js';

// ...

export async function addNoteLivreur(req, res) {
  const { livreurId, note } = req.body;

  try {
    // Vérifier si la note est dans la plage valide
    if (note < 0 || note > 5) {
      return res.status(400).json({ error: 'La note doit être entre 0 et 5' });
    }

    // Créer une nouvelle note
    const nouvelleNote = await Notelivreur.create({ livreurId, note });

    // Calculer la nouvelle moyenne des notes
    const totalNotes = await Notelivreur.aggregate([
      { $match: { livreurId: new mongoose.Types.ObjectId(livreurId) } },
      { $group: { _id: '$livreurId', total: { $sum: '$note' }, count: { $sum: 1 } } },
    ]);

    const averageNote = totalNotes[0]?.total / totalNotes[0]?.count || 0;

    // Mettre à jour la moyenne des notes dans le modèle 'Livreur'
    await Livreur.findOneAndUpdate(
      { _id: livreurId },
      { moyenneNote: averageNote },
      { new: true }
    );

    res.status(200).json({ message: 'Note ajoutée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}