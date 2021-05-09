import { Schema, model} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
        versionKey: false, // evita los datos __v
        timestamps: true   //se puede ver cuando se creo y actualizo
})


taskSchema.plugin(mongoosePaginate);
export default model('Task', taskSchema)