import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  notes: { type: String }
}, { timestamps: true });

export const Contact = mongoose.model('Contact', contactSchema);
