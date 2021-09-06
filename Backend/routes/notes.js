const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route 1
// Get all notes of user  Using: GET "/api/notes/fetchallnotes" .login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2
// Add notes Using: POST "/api/notes/addnote" .login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //Errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


//Route 2
// Update an existing notes Using: PUT "/api/notes/updatenote" .login required

router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {

        const { title, description, tag } = req.body;
        // create ne Note
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // find the note to be updated
        let note = await Note.findById(req.params.id);
        if(!note){
            return(res.status(404).send("Not found")
            )
        }

        if(note.user.toString() !== req.user.id){
            return(
                res.status(401).send("Not allowed")
            )
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note})

    })


module.exports = router;
