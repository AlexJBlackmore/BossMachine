const express = require('express');

const {

    addToDatabase,
  
    getAllFromDatabase,
  
    getFromDatabaseById,
  
    updateInstanceInDatabase,
  
    deleteFromDatabasebyId,
  
  } = require('./db');

const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, id) => {

    // Convert param into number
    const ideaIdNum = Number(id);

    // There is possibility getAllFromDatabase returns null (no ideas yet) so this must be in try block
    try {
        // Get all ideas array so we can check against it
        const allIdeas = getAllFromDatabase('ideas');

        // Check if idea param is existing DB
        const found = allIdeas.find(element => element.id === ideaIdNum);

        // If it is then add it to the req object
        if(found) {
            req.idea = found;
        } else {
            res.status(404).send('Idea not there matey');
        }
    } catch(err) {
        // If there is an error, pass it to the error-handling middleware.
        // Remember if next() is passed an error as an argument it will call error-handling middleware
        next(err);
    }

});

// Get all
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// Get one
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(getFromDatabaseById('ideas', req.idea));
})

ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put('/:ideasId', (req, res, next) => {
    try {
        const updateIdea = updateInstanceInDatabase('ideas', req.body);
        res.status(200).send(updateIdea);
    } catch(err) {
        next(err);
    }
});

ideasRouter.delete('/ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.idea);
    res.status(204).send('Idea deleted');
});
 
module.exports = ideasRouter;