const mongoose = require("mongoose");
const express = require("express")
const Router = express.Router();
const bodyParser = require("body-parser")
Router.use(bodyParser.json())
const eventModel = require("../Models/eventModel")

Router.post("/", async(req, res) => {
    try {
        console.log(req.body)
        const newEvent = await eventModel.create({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location
        })
        res.status(200).json({
            message: "success",
            newEvent
        })
    } catch (e) {

        console.log(e.message)
        res.status(400).json({
            message: e.message

        })
    }
}) 
Router.get("/", async(req, res) => {
    try {
        const allevents = await eventModel.find()
        res.status(200).json({
            message:"success",
            allevents
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message
        })
    }
})
Router.get("/:eventId", async(req, res) => {
    try {
        const newevent = await eventModel.find({ _id: req.params.eventId })
        if (!newevent.length) {
            return res.json({
                error: "There is no event of this Id"
            })
        }
        
        res.status(200).json({
            message:"success",
            newevent
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message
        })
    }
})
Router.delete("/:eventId", async(req, res) => {
    try {
        const deletedEvent = await eventModel.deleteOne({_id:req.params.eventId})
        if (!deletedEvent.deletedCount) {
            return res.json({
                error: "There is no event with the above id"
            })
        }
        res.status(200).json({
            message:"suceess",
            deletedEvent
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message
        })
    }
})

Router.put("/:eventId", async(req, res) => {
    try {
        if(req.body.title===""){
            return res.json({
                error: "title is required"
            })
        }
        const updatedEvent = await eventModel.updateOne({_id:req.params.eventId},{
            title:req.body.title,
            description:req.body.description,
            location:req.body.location
        })
        if (!updatedEvent.matchedCount) {
            return res.json({
                error: "There is no event with this id"
            })
        }
        res.status(200).json({
            message:"success",
            updatedEvent
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message
        })
    }
})
module.exports =Router;