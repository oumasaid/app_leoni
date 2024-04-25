import DocumentClassification from '../models/DocumentClassificationModel.js'; 

export const insert = async (req, res) => {
    try {
        const { documentType, description } = req.body;
        const documentClassification = await DocumentClassification.create({ documentType, description });
        res.status(201).json({ message: 'Document classification created successfully', documentClassification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create document classification' });
    }
};
