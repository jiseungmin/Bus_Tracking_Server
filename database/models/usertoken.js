import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  Token: String,
}, {
  timestamps: true
});

// Use 'PushToken' as the key to check in mongoose.models to prevent recompilation
var Token = mongoose.models.PushToken || mongoose.model('PushToken', TokenSchema, "PushToken");

export default Token;
