const express = require('express');
const {

    addToDatabase,
  
    getAllFromDatabase,
  
    getFromDatabaseById,
  
    updateInstanceInDatabase,
  
    deleteFromDatabasebyId,
  
  } = require('./db');

const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {

    // Convert param into number
    const minionIdNum = Number(id);

    // There is possibility getAllFromDatabase returns null (no minions yet) so this must be in try block
    try {
        // Get all minions array so we can check against it
        const allMinions = getAllFromDatabase('minions');

        // Check if minion param is existing DB
        const found = allMinions.find(element => element.id === minionIdNum);

        // If it is then add it to the req object
        if(found) {
            req.minion = found;
        } else {
            res.status(404).send('Minion not there matey');
        }
    } catch(err) {
        // If there is an error, pass it to the error-handling middleware.
        // Remember if next() is passed an error as an argument it will call error-handling middleware
        next(err);
    }

});

// Post
minionsRouter.post('/', (req, res, next) => {
   
    const newMinion = addToDatabase('minions', req.body);

    res.status(201).send(newMinion);

    console.log(req.body);
   
});

// Get all
minionsRouter.get('/', (req, res, next) => {

    res.status(200).send(getAllFromDatabase('minions'));

});

// Get one
minionsRouter.get('/:minionId', (req, res, next) => {

    res.status(200).send(req.minion);
});

// Delete one
minionsRouter.delete('/:minionId', (req, res, next) => {

    deleteFromDatabasebyId(req.minion);

    res.status(204).send('Minion deleted');

});

// Update one
minionsRouter.put('/:minionId', (req, res, next) => {

    try {
        const updatedMinion = updateInstanceInDatabase('minions', req.body);
        res.status(200).send(updatedMinion);
    } catch (err) {
        next(err);
    }

});

module.exports = minionsRouter;