import mongoose from "mongoose";

const publischerSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    location: String,
});

const Publischer = mongoose.model('Publischer', publischerSchema);

export default Publischer;