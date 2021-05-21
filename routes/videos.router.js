const express = require("express");
const router = express.Router();
const {extend} = require("lodash");
const { Video } = require("../models/video.model")


router.route("/")
  .get(async (req, res) => {
    try {
      const videos = await Video.find({});
      res.json({ success: true, videos })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
    }

  })
  .post(async (req, res) => {
    try {
      const video = req.body;
      const NewVideo = new Video(video);
      const savedVideo = await NewVideo.save();
      res.json({ success: true, video: savedVideo })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add videos", errorMessage: err.message })
    }
  })


router.param("videoId", async (req, res, next, id) => {
  try {
    const video = await Video.findById(id);
    if (!product) {
      return res.status(400).json({ success: false, message: "video not found"})
    } 
    req.video = video;
    next()
  } catch {
    res.status(400).json({ success: false, message: "could not retrieve video "})
  }
})

router.route("/:videoId")
  .get((req, res) => {
    video.__v = undefined;
    res.json({ success: true, video })
  })
  .post(async (req, res) => {
    const videoUpdates = req.body;
    let {video} = req;

    video = extend(video, videoUpdates);
    // product.__v = undefined;
    video = await video.save();
    res.json({success:true, video})

  })
  .delete(async (req, res) => { 
    let {video} = req;
    // product.__v = undefined;
    video = await video.remove()
    res.json({success:true, video})
  })


module.exports = router