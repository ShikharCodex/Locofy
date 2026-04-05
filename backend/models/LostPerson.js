const mongoose = require('mongoose');

const lostPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: String }, // e.g. "5'9""
  weight: { type: String },
  gender: { type: String, required: true },
  lastSeenLocation: { type: String, required: true },
  lastSeenDate: { type: Date, required: true },
  clothingDescription: { type: String },
  additionalNotes: { type: String },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String, required: true },
  imageUrl: { type: String }, // From cloudinary
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LostPerson', lostPersonSchema);
