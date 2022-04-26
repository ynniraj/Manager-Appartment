
const Resident = require('../models/residents.model');


const residents = async (req, res) => {
    try {
        const response = await Resident.create(req.body);

        return res.status(200).send({ response, status: "ok" });
    } catch (error) {
        return res.status(404).json({ status: "error" });
    }
};




module.exports = { residents };

