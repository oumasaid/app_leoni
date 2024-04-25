import Pf from '../models/PfModel.js';

// Fonction pour créer un nouveau Pf
export const createPf = async (req, res) => {
    try {
        const { Customer } = req.body;
        const newPf = await Pf.create({ Customer });
        res.status(201).json({ message: 'Pf created successfully', Pf: newPf });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create Pf' });
    }
};

// Fonction pour afficher tous les Pfs
export const getAllPfs = async (req, res) => {
    try {
        const allPfs = await Pf.findAll();
        res.json(allPfs);
    } catch (error) {
        console.error('Failed to fetch Pfs:', error);
        res.status(500).json({ error: 'Failed to fetch Pfs' });
    }
};

