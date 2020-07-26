const userService = require('../service/userService');

const saveProfileImage = async (req,res) => {
    console.log("ENTER: userController.saveProfileImage()");
    try{
        const response = await userService.saveProfileImage(req);
        res.send(response);
    }
    catch(error){
        console.error(`EXIT: userController.saveProfileImage(); Error: ${error}`);
        res.send(error);
    }
}

module.exports = {
    saveProfileImage,
}
