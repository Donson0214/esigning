"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBufferToCloudinary = uploadBufferToCloudinary;
const stream_1 = require("stream");
const cloudinary_1 = require("../config/cloudinary");
async function uploadBufferToCloudinary(buffer, options) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.cloudinary.uploader.upload_stream({
            folder: options.folder,
            resource_type: options.resourceType ?? 'auto',
            filename_override: options.fileName,
            use_filename: true,
        }, (error, result) => {
            if (error || !result) {
                reject(error ?? new Error('Cloudinary upload failed'));
                return;
            }
            resolve({ url: result.secure_url, publicId: result.public_id });
        });
        stream_1.Readable.from(buffer).pipe(stream);
    });
}
