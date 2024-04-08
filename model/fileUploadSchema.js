import mongoose from "mongoose";

const fileUploadSchema = mongoose.Schema({
    message: { type: String },
    file: {type: String}

})

export const jsonFile = mongoose.model('uploadedFile', fileUploadSchema)