import { information } from '../services/mqtt.service.js';

export const getInformation = (req, res) => {
    res.status(200).json(information);
}