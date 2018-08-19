import { Schema, model } from 'mongoose';

let ArtistSchema: Schema = new Schema({
   name: {
       type: String,
       default: '',
       required: true
   },
    firstname: {
        type: String,
        default: '',
        required: false
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    biography: {
       type: String,
        default: '',
        required: true
    },
    birthplace: {
        type: String,
        default: '',
        required: true
    },
    deathplace: {
        type: String,
        default: '',
        required: true
    },
    birthdate: {
        type: String,
        default: '',
        required: true
    },
    deathdate: {
        type: String,
        default: '',
        required: true
    },
    picture: {
        type: String,
        default: '',
        required: true
    }
});

export default model('Artist', ArtistSchema);