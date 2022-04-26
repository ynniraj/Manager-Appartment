const mongoose = require('mongoose');
const Flat = require('../models/flat.model');


const flatregister = async (req, res) => {
    const { type, block, flatno, resident, flatimg } = req.body;

    try {
        const flat = await Flat.create({ type, block, flatno, resident, flatimg });

        return res.status(200).send({ flat, status: "ok" });
    } catch (error) {
        return res.json({ status: "error" });
    }
};


const getflats = async (req, res) => {
    try {
        const flat = await Flat.find().populate({ path: "resident", select: ["name", "gender", "age"] }).lean().exec()
        return res.status(200).send(flat);

    } catch (err) {
        return res.status(500).send(err)
    }
}

//get request ueing params id
const getbyidflat = async (req, res) => {
    try {
        const flet = await Flat.findById(req.params.id).populate({ path: "resident", select: ["name", "gender", "age"] }).lean().exec()
        return res.status(200).send(flet);
    } catch (err) {
        return res.status(500).send(err)
    }
}



//pagination using query params
const getFlatspagination = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const flat = await Flat.find().populate({ path: "resident", select: ["name", "gender", "age"] }).lean().exec()
        const total = flat.length;
        const totalPages = Math.ceil(total / limit);
        const pageData = flat.slice((page - 1) * limit, page * limit);
        return res.status(200).send({ pageData, totalPages });
    } catch (err) {
        return res.status(500).send(err)
    }
}


const highsortedflat = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const flat = await Flat.find().populate({ path: "resident", select: ["name", "gender", "age"] }).sort({ flatno: -1 }).lean().exec()
        const total = flat.length;
        const totalPages = Math.ceil(total / limit);
        const pageData = flat.slice((page - 1) * limit, page * limit);
        return res.status(200).send({ pageData, totalPages });

    } catch (err) {
        return res.status(500).send(err)
    }
}
const lowsortedflat = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const flat = await Flat.find().populate({ path: "resident", select: ["name", "gender", "age"] }).sort({ flatno: 1 }).lean().exec()
        const total = flat.length;
        const totalPages = Math.ceil(total / limit);
        const pageData = flat.slice((page - 1) * limit, page * limit);
        return res.status(200).send({ pageData, totalPages });

    } catch (err) {
        return res.status(500).send(err)
    }
}


const blockname = async (req, res) => {
    try {
        const flat = await Flat.find({ block: req.params.name }).populate({ path: "resident", select: ["name", "gender", "age"] }).lean().exec()
        return res.status(200).send(flat);
    } catch (err) {
        return res.status(500).send(err)
    }
}

const byflattype = async (req, res) => {
    try {
        const flat = await Flat.find({ type: req.params.name }).populate({ path: "resident", select: ["name", "gender", "age"] }).lean().exec()
        return res.status(200).send(flat);
    } catch (err) {
        return res.status(500).send(err)
    }
}



module.exports = { flatregister, getflats, getbyidflat, getFlatspagination, highsortedflat, lowsortedflat, blockname, byflattype };


