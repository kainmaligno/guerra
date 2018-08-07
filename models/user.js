const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username  : String,
  password  : String,
  firstname : String,
  lastName  : String,
  email     : String,
  birth     : {type: Date},
  gender    : {

    type      : String,
    enum      : ['Hombre', 'Mujer', 'N/A'],
    default   : 'N/A'

    },
   imgPath: String,
   imgName: String
},    {
      timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at"
      }
});

const User = mongoose.model("User", userSchema);
module.exports = User;



// const mongoose  = require("mongoose");
// const Schema  = mongoose.Schema;
// const validator = require("validator");
// const mongooseURL = require('mongoose-type-url');

// const userSchema = new Schema({
//     username:   { type: String, required: true },
//     firstName:  String,
//     lastName:   String,
//     googleId:   String,
//     email:      { type: String, validate: {
//                                     validator:  validator.isEmail,
//                                     message:    '{VALUE} no es un email válido',
//                                     isAsync:    false
//                                 }
//             },
//     birth:      { type: Date, required: true },
//     gender: {
//         type: String,
//         enum : ['Hombre', 'Mujer', 'N/A'],
//         default : 'N/A'
//     },
//     photo_url:  { type: mongoose.SchemaTypes.Url  }, //  Schema.Types.Mixed
//     password:   { type: String, required: true, select: false }
//     }, {
//     timestamps: {
//         createdAt: "created_at",
//         updatedAt: "updated_at"
//     }
// });

// const User = mongoose.model("User", userSchema);

//  module.exports = User;
