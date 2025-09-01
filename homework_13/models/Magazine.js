import mongoose from "mongoose";

const magazineSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    issueNumber: Number,
    publischer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publischer'
    }
});

const Magazine = mongoose.model('Magazine', magazineSchema);

export default Magazine;