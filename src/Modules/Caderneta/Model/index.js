require('dotenv').config();
const { string } = require('joi');
const mongoose = require('mongoose');

const CadernetaSchema = new mongoose.Schema(
  {
    consulta: {
      type: Number,
      default: 0
    },
    bornData: [
        {
            bornHour: {
                type: String,
                required: true
            },
            bornDate:{
                type: Date,
                required: true
            },
            sex:{
                type: String,
                required: true
            },
            bornWeight:{
                type: Number,
                required: true
            },
            bblength:{
                type: Number,
                required: true
            },
            cephalic:{
                type: Number,
                required: true
            },
            gestationalAge:{
                type: Number,
                required: true
            },
            bloodType:{
                type: String,
                required: true
            },
            exitWeight:{
                type: Number,
                required: true
            },
            exitDate:{
                type: Date,
                required: true
            },
            motherName:{
                type: String,
                required: true
            }

        }
    ],
    neonatal:[
        {
            ortolaniIsPositive:{
                type: Boolean,
                required: true
            },
            ortolaniConduct:{
                type: String,
                required: true
            },
            redReflectionIsNormal:{
                type: Boolean,
                required: true
            },
            redReflectionConduct:{
                type: String,
                required: true
            },
            tootsyYesOrNo: {
                type: Boolean,
                required: true
            },
            tootsyMadeAt:{
                type: Date,
                required: true
            },
        }
    ],
    results:[
        {
            feniceltonuriaIsNormal:{
                type: Boolean,
                required: true
            },
            hipotireodismoIsNormal:{
                type: Boolean,
                required: true
            },
            anemiaFalciformeIsNormal:{
                type: Boolean,
                required: true
            }
        }
    ],
    others:[
        {
            hearingScreeningYesOrNo: {
                type: Boolean,
                required: true
            },
            hearingScreeningMadeAt:{
                type: Date,
                required: true
            },
            testPerformed:{
                type: String,
                required: true
            },
            resultText1:{
                type: String,
                required: true
            },
            resultText2:{
                type: String,
                required: true
            },
            resultIsNormal:{
                type: Boolean,
                required: true
            },
        }
    ],
    exitFeeding:{
        type: String,
        required: true
    },
    importantInformations:{
        type: String,
        required: true
    },
    patientOwner:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    pediatraOwner:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Caderneta', CadernetaSchema);
