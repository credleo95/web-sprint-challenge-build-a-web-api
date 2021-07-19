// Write your "projects" router here!

const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();
/*- [ ] `[GET] /api/projects`
  - Returns an array of projects as the body of the response.
  - If there are no projects it responds with an empty array.*/
router.get('/projects', (req, res) => {
  Projects.get()
    .then((projects) => {
      if (projects.length === 0) {
        res.send([]);
      }
      res.send(projects);
    })
    .catch((error) => {
      console.log(error);
    });
});
/*
- [ ] `[GET] /api/projects/:id`
  - Returns a project with the given `id` as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.*/

router.get('/projects/:id', (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project == undefined || null) {
        return res
          .status(404)
          .json({ message: 'Project with specified id could not be found' });
      }
      return res.send(project);
    })
    .catch((error) => {
      console.log(error);
    });
});

/*
- [ ] `[POST] /api/projects`
  - Returns the newly created project as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
  */

router.post('/projects', (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      if (!project.name || !project.description) {
        return res.status(400).json({
          message: 'name or description is missing. Please resubmit.',
        });
      }
      return res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
    });
});
/*
- [ ] `[PUT] /api/projects/:id`
  - Returns the updated project as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
  */
router.put('/projects/:id', (req, res) => {
  const changes = req.body;
  Projects.update(req.params.id, changes)
    .then((updatedProject) => {
      if (!updatedProject.name || !updatedProject.description) {
        return res
          .status(400)
          .json({ message: 'missing name or description. Please re-submit' });
      }
      if (!updatedProject) {
        return res
          .status(404)
          .json({ message: 'Project with given id could not be found' });
      }
      return res.status(200).json(updatedProject);
    })
    .catch((error) => {
      console.log(error);
    });
});
/*
- [ ] `[DELETE] /api/projects/:id`
  - Returns no response body.
  - If there is no project with the given `id` it responds with a status code 404.
  */
router.delete('/projects/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then((project) => {
      if (!project) {
        return res.status(404);
      }
      return res.json(project);
    })
    .catch((error) => {
      console.log(error);
    });
});
/*
- [ ] `[GET] /api/projects/:id/actions`
  - Returns an array of actions (could be empty) belonging to a project with the given `id`.
  - If there is no project with the given `id` it responds with a status code 404.
*/

router.get('/projects/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((projectActions) => {
      if (!projectActions) {
        return res.status(404);
      }
      return res.json(projectActions);
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
