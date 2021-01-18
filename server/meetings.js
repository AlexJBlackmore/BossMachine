const express = require('express');

const {

    addToDatabase,
  
    getAllFromDatabase,
  
    getFromDatabaseById,
  
    updateInstanceInDatabase,
  
    deleteFromDatabasebyId,

    createMeeting,
    deleteAllFromDatabase,
  
  } = require('./db');

const meetingsRouter = express.Router();

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send('Deleted all haha');
});

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});
 
module.exports = meetingsRouter;