const mongoose  = require("mongoose");
const {Schema}  = mongoose;

const foodStandSchema = new Schema({
    name:           { type: String, required: true },
    description:    { type: String, required: true },
    category:       [{
        type: String,
        enum : ['Tacos', 'Tortas', 'Hamburguesas', 'Hotdogs', 'Pizzas','Quesadillas','Pambazos'],
        default : 'N/A'
    }],
    location:       { type: { type: String, default:"Point"}, coordinates: [Number] }
    }, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

foodStandSchema.index({ location: '2dsphere' });

const FoodStand = mongoose.model("FoodStand", foodStandSchema);

module.exports = FoodStand;