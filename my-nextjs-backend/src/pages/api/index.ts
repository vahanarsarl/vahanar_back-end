import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
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
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}