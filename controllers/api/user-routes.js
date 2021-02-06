const router = require('express').Router();
const { User, Post, Comment } = require("../../models");


// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
    // should not need to see password
      attributes: { exclude: ['password'] }
    })
        // send back response
      .then(dbUserData => res.json(dbUserData))
      // catch errors
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/users/1
router.get('/:id', (req, res) => {
    // Access our User model and run .findOne() method)
    User.findOne({
        // don't need password
      attributes: { exclude: ['password'] },
      // show their post data
      include: [
        {
            // grab from post model
            model: Post,
            // show id, title, content, and created_at timestamp
            attributes: ['id', 'title', 'content', 'created_at']
        },
        // show their comment data
        {
            // grab from comment model
            model: Comment,
            // show id, comment text, and created at timestamp
            attributes: ['id', 'comment_text', 'created_at'],
            // show the post the comment belongs to
            include: {
                // grab this from post model
                model: Post,
                // just show title od post
                attributes: ['title']
            }
        }
      ],
      where: {
        id: req.params.id
      }
    })
        // send data unless user id doesn't exist
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      // catch errors
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// POST /api/users
router.post('/', (req, res) => {
    // create user with username, email, and pw from request 
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
        
      .then(dbUserData => {
        // save created user in session and log in as this user
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
            // response
          res.json(dbUserData);
        });
      })
      // catch errors
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
  // login as a user that is already created by email
  User.findOne({
    where: {
        // find user with same email
        email: req.body.email
    }
  })
    .then(dbUserData => {
          // check if user with that email exists
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }

        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);

        // make sure passwords match up
        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }

        // sign in via session
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            // response
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
    // catch errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// logout call
router.post('/logout', (req, res) => {
    // sign out end session as user 
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
      individualHooks: true,
      where: {
            // at user with specified id from url
            id: req.params.id
      }
    })
      .then(dbUserData => {
        // check if user exists by matching id
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    // delete where id matched that of the url
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
            //check if user exists by matching id
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
      })
      // catch errors
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;