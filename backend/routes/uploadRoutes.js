import express from "express";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
aws.config.update({
    accessKeyId: "AKIAXQRJXK53Y4J4AMWY",
    secretAccessKey: "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",
    region: "ap-south-1",
});
const router = express()
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: "hopeplants",
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
})

router.post("/upload", upload.single('image'), (req, res) => {
    res.send(`/${req.file.key}`);
});
router.post("/uploads", upload.array("images", 20), (req, res) => {
    const element = [];
    const data = req.files
    for (let index = 0; index < data.length; index++) {
        element.push(data[index].originalname)
    }

    res.send(element);
});

export default router;