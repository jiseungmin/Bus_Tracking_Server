// models/Bus.js
import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({status: String});
var Bus = mongoose.models.Bus || mongoose.model('Bus', busSchema, "Bus");
export default Bus;
