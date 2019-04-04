const express = require("express");

const router = express.Router();

//load validation
const ValidateRegisterInput = require("../../validations/register");

//load User model
const User = require("../../models/Student");

router.get("/test", (req, res) => res.json({ name: "hello world" }));

//@route    POST api/users/register
//@desc     register new user
//@access   public
router.post("/register", (req, res) => {
  const { errors, isValid } = ValidateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newUSer = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });

  newUSer
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

//@route    GET api/users/
//@desc     Show all users
//@access   public
router.get("/", (req, res) => {
  User.find()
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(404).json(errors));
});

//@route    GET api/users/profile/:id
//@desc     Show user based on the params
//@access   public
router.get("/profile/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status({ error: "No Profile that found" });
      } else {
        res.json(user);
      }
    })
    .catch(() => res.status(404).json({ error: "No Profile that found" }));
});

//@route    PUT api/users/edit/:id
//@desc     edit user based on the params
//@access   public
router.put("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status({ error: "No Profile that found" });
      } else {
        const userFields = {};

        if (req.body.firstname) userFields.firstname = req.body.firstname;
        if (req.body.lastname) userFields.lastname = req.body.lastname;

        User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: userFields },
          { new: true }
        ).then(user => res.json(user));
      }
    })
    .catch(() => res.status(404).json({ error: "No Profile that found" }));
});

// @route   DELETE api/users/:id
// @desc    Delete advertisment
// @access  Private
router.delete("/:id", (req, res) => {
  User.findOneAndDelete({
    _id: req.params.id
  })
    .then(success => res.json(success))
    .catch(err => res.status(404).json(err));
});
module.exports = router;
