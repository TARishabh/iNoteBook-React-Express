const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { query, validationResult, body } = require("express-validator");
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        return res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: "Something went wrong" });
    }
});

router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "").isLength({ min: 3 }),
        body("description", "").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;
        try {
            const userId = req.user.id;
            const note = new Notes({
                title: title,
                description: description,
                tag: tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            return res.status(200).json(savedNote);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: "Something went wrong" });
        }
    }
);

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const NewNote = {}
    const { title, description, tag } = req.body;
    if (title){
        NewNote.title = title;
    };
    if (description){
        NewNote.description = description;
    };
    if (tag){
        NewNote.tag = tag;
    };
    try {
        let note = await Notes.findById(req.params.id);
        if (!note){
            return res.status(404).json({results:"Not Found"})
        }
        if (note.user.toString() !== req.user.id){
            return res.status(401).json({results:"Unauthorized"})
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: NewNote},{new:true})
        return res.status(200).json(note)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: "Something went wrong" });
    }
})

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

    try {
        let note = await Notes.findById(req.params.id);
        if (!note){
            return res.status(404).json({results:"Not Found"})
        }
        if (note.user.toString() !== req.user.id){
            return res.status(401).json({results:"Unauthorized"})
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).json({"results":"Note Deleted Successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: "Something went wrong" });
    }
})

module.exports = router;
