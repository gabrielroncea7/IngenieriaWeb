import {Schema, model} from 'mongoose';

const WordSchema =  new Schema({


    _word:{

        type: String,
        trim: true

    }


},{
    
    timestamps: true

});

export default model('Word', WordSchema);