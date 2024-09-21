const {getDb} = require("../db/connect");


//TODO: Make one location for error handling instead of repetitively writing error responses.

//Get ALL the professionals
async function getProfessionals(req,res) {
    try {
        const _db = getDb();
        const professionalCollection = _db.collection('professionals');
        const result = await professionalCollection.find().toArray();

        if (result.length > 0) {
            // For this assignment - send only one.
            res.status(200).send(result[0]);
        } else {
            res.status(404).send('No Professionals Found');
        }
    } catch (err) {
        console.error("Error Fetching Data", err);
        res.status(500).send({error: 'Error Fetching professionals'});
    }
}

// Grab Specific Professionals
async function getProfessionalsById(req,res) {
    try {
        const _db = getDb();
        const professional = await _db.collection('professionals').findOne({_id:req.params.id});
        if (professional) {
            res.status(200).send(professional);
        } else {
            res.status(404).send('No Professionals Found');
        }
    } catch (err) {
        console.error("Error Fetching Data", err);
        res.status(500).send({error: 'Failed to fetch professional'});
    }
}

module.exports = { getProfessionals, getProfessionalsById };