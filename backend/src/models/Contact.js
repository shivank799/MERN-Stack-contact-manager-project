import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      index: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String 
    },
    phone: {
      type: String,
      required: false,  // No longer required
      unique: false,    // Removed the uniqueness constraint
      trim: true,       // Trimming any extra spaces
    },
    notes: { 
      type: String 
    },
  },
  { timestamps: true }
);

// Create the model
export const Contact = mongoose.model('Contact', contactSchema);
