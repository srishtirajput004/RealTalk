import multer from "multer"

const multerUpload=multer({
    limits:{
        fileSize:1024*1024*5,
    },
});
//in multer({storage:}) can be given - 2types- memory(RAM,temporary,fast), disk(harddisk)

const singleAvatar=multerUpload.single("avatar");
const attachmentsMulter=multerUpload.array("files",5);

export {singleAvatar,attachmentsMulter};