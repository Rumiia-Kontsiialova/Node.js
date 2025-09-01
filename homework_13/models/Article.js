import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    content: {type: String, required: true},
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ] 
});

const Article = mongoose.model('Article', articleSchema);

export default Article;