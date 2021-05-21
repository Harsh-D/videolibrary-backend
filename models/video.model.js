const mongoose = require("mongoose");
require('mongoose-type-url');

const VideoSchema = new mongoose.Schema({   
  name: {
    type: String,
    required: "Cannot enter a video without name, please enter video title"
  }, 
  url:{
    type: mongoose.SchemaTypes.Url,
    required: "Cannot enter a video without URL, please enter URL of the video",
  },
  imageUrl:{
    type: mongoose.SchemaTypes.Url,
    required: "Cannot enter a video without thumnail URL, please enter URL of the thumbnail",
  },
  }, {
  timestamps: true,
});

const Video = mongoose.model("Video", VideoSchema);


module.exports = { Video }