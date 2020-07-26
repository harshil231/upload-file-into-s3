const util = require('../common/util');
const constant = require('../common/constant');

const saveProfileImage = async (req) => {
    console.log("ENTER: userService.saveProfileImage()");
    try{
         const imageFileData = await util.getSingleImageData(req);
         const s3Response = await util.insertFileInS3(constant.awsConst.PROFILE_PICTURE_BUCKET, imageFileData.path);
         const {Location: finalResponse} = s3Response;
         console.log(`EXIT: userService.saveProfileImage(); Success, Response: ${finalResponse}`);
         return {url: finalResponse};
    }
    catch(error){
         console.log(`EXIT: userService.saveProfileImage(); Error: ${error}`);
         throw error;
    }
}

module.exports = {
    saveProfileImage,
}
