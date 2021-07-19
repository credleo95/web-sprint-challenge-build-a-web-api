const express = require('express');
const server = require('../server.js');

const Actions = require('./actions-model.js');

const router = express.Router();
/*
- [] `[GET] /api/actions`
  - Returns an array of actions (or an empty array) as the body of the response.
  */
router.get('/actions', (req, res) => {
  Actions.get()
    .then((actions) => {
      if (actions.length === 0) {
        return res.send([]);
      }
      return res.send(actions);
    })
    .catch((error) => {
      console.log(error);
    });
});
/*
- [ ] `[GET] /api/actions/:id`
  - Returns an action with the given `id` as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.*/

router.get('/actions/:id', (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action == undefined || null) {
        return res
          .status(404)
          .json({ message: 'Action with specified id could not be found' });
      }
      return res.json(action);
    })
    .catch((error) => {
      console.log(error);
    });
});
/*
- [ ] `[POST] /api/actions`
  - Returns the newly created action as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
  - When adding an action make sure the `project_id` provided belongs to an existing `project`.
  */

router.post('/actions', (req, res) => {
  const newAction = req.body;
  Actions.insert(newAction)
    .then((action) => {
      if (
        !action.description_id ||
        !action.description ||
        !action.notes ||
        !action.completed
      ) {
        return res
          .status(400)
          .json({ message: 'required fields are missing. Please resubmit' });
      }
      return res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
    });
});

/*
- [ ] `[PUT] /api/actions/:id`
  - Returns the updated action as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
  */

router.put('/actions/:id', (req, res) => {
  const updatedAction = req.body;
  Actions.update(req.params.id, updatedAction)
    .then((newAction) => {
      if (!newAction) {
        return res.status(404);
      }
      if (
        !newAction.project_id ||
        !newAction.description ||
        !newAction.notes ||
        !newAction.completed
      ) {
        return res.status(400);
      }
      return res.json(newAction);
    })
    .catch((error) => {
      console.log(error);
    });
});
/*
- [ ] `[DELETE] /api/actions/:id`
  - Returns no response body.
  - If there is no action with the given `id` it responds with a status code 404.
  */

router.delete('/actions/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then((action) => {
      if (!action) {
        return res.status(404);
      }
      return res.json(action);
    })
    .catch((error) => {
      console.log(error);
    });
});

/*
  ***HELPERS***

  - `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.*/

module.exports = router;
