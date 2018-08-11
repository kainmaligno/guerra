const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentSchema = new Schema({

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //referenciamos al modelo user al autor de cada comentario
    },
    body: String,
    date: Date,
    meta: {
        votes: Number,
        favs:  Number
    },
    
}
    ,{
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
});

const ComentSchema = mongoose.model("FoodStand", comentSchema);
module.exports = ComentSchema;