const mongoose = require("mongoose");
const { type } = require("os");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    questionId: {
        type: ObjectId,
        required: true
    },
    image : {
        url : {
            type:String,
        },
        public_id : {
            type:String,
        },
    }
});

const Answer = new mongoose.model("Answer", answerSchema);
module.exports = {
    answerModel: Answer,
}