const Note = require("../model/Note");

const getAllNotes = async (_,res)=>{
    try{
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    }catch(error){
        console.log("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

const fetchNoteById = async (req,res)=>{
    try{
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json({message:"Note fetched successfully",note})
    }catch(error){
        console.log("Error in fetchNoteById controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

const createNotes = async (req, res) => {
    try {
        console.log("Creating note with body:", req.body);
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const note = new Note({ title, content });
        const savedNote = await note.save();
        console.log("Note saved successfully:", savedNote._id);
        res.status(201).json({ message: "Note created successfully", note: savedNote });
    } catch (error) {
        console.error("Error in createNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(
            req.params.id, 
            { title, content }, 
            { new: true, runValidators: true }
        );
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        console.error("Error in updateNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteNotes = async (req,res)=>{
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json({message:"Note deleted successfully"})
    }catch(error){
        console.log("Error in deleteNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {getAllNotes,createNotes,updateNotes,deleteNotes,fetchNoteById}