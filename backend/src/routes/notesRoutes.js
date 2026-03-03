const express = require("express");
const { getAllNotes,createNotes,updateNotes,deleteNotes,fetchNoteById } = require("../controllers/notesController")
const router = express.Router();

//Fetch notes
router.get("/", getAllNotes)

//Fetch single note
router.get("/:id", fetchNoteById)

//Create notes
router.post("/", createNotes)

//Update notes
router.put("/:id", updateNotes)

//Delete notes
router.delete("/:id", deleteNotes)

module.exports = router