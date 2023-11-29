const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
    {
        contenu: { type: String, required: true },
        note: { type: String, required: true, max: 10, min: 0 },
        VideoGame: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'VideoGame',
        },
    },
    { timestamps: true },
);

const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
