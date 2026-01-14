"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocument = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const allowedMimeTypes = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.presentation',
    'text/plain',
    'text/rtf',
    'application/rtf',
    'text/csv',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
]);
const allowedExtensions = new Set([
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'odt',
    'ods',
    'odp',
    'txt',
    'rtf',
    'csv',
    'png',
    'jpg',
    'jpeg',
    'gif',
    'webp',
]);
const getExtension = (filename) => path_1.default.extname(filename).slice(1).toLowerCase();
const isPdfFile = (file) => file.mimetype === 'application/pdf' || getExtension(file.originalname) === 'pdf';
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const ext = getExtension(file.originalname);
        const isAllowedMime = allowedMimeTypes.has(file.mimetype);
        const isAllowedExtension = allowedExtensions.has(ext);
        const allowOctetStream = file.mimetype === 'application/octet-stream' && isAllowedExtension;
        if (!isAllowedMime && !allowOctetStream) {
            cb(new Error('Unsupported file type'));
            return;
        }
        cb(null, true);
    },
});
function validatePdfBuffer(req, res, next) {
    if (!req.file) {
        return next();
    }
    if (!isPdfFile(req.file)) {
        return next();
    }
    const header = req.file.buffer.subarray(0, 5).toString('ascii');
    if (header !== '%PDF-') {
        return res.status(400).json({ error: 'INVALID_FILE', message: 'Invalid PDF header' });
    }
    return next();
}
exports.uploadDocument = [upload.single('file'), validatePdfBuffer];
