'use strict';
const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      unique: false,
      required: true,
    },
    url: {
      type: String,
      unique: false,
      required: true,
    },
    source: {
      type: String,
      unique: false,
      required: true,
    },
    tags: [String],
    notes: [{
      page: Number,
      content: String
    }]
  },
  { timestamps: true },
);

paperSchema.method('transform', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});


const Paper = mongoose.model('Paper', paperSchema);
module.exports = Paper;
