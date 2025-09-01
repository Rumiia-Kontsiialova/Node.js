import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;