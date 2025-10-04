import mongoose from 'mongoose';

const ContextSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  text: {
    type: String,
    required: true,
  }
})

export default mongoose.model('Context', ContextSchema);
