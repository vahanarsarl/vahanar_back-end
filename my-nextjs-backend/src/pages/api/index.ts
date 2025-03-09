import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            // Handle GET request
            res.status(200).json({ message: 'GET request successful' });
            break;
        case 'POST':
            // Handle POST request
            const data = req.body;
            res.status(201).json({ message: 'POST request successful', data });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}