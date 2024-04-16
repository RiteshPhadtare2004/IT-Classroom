const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  createdBy: { type: String, required: true },
  title: {type: String, required: true },
  description: {type: String, required: true},
  createdAt: {type: Date, default:Date.now, required: true},
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;