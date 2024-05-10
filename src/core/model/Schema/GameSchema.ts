import {Schema, model} from 'mongoose' //COMPROBAR SI CON ESTE ESQUEMA SE PUEDE HACER GET Y SET EN LA BD

const GameSchema = new Schema({

    _attempts:{

        type: Array,
        trim: true

    },

    _username:{

        type: String,
        trim: true

    },

    _points:{

        type: Number,
        trim: true

    }

},{

    timestamps: true

})

export default model('Game', GameSchema);