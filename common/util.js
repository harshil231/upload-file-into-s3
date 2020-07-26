const formidable = require('formidable');
const AWS = require('aws-sdk');
const config = require('config');
const  {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = config.get('aws');
const constant = require('./constant');
const fs = require('fs').promises;

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: constant.awsConst.MUMBAI_REGION
});

const s3 = new AWS.S3();

const getSingleImageData = async (req) => {
  console.log("ENTER : util.getSingleImageData()");
  return new Promise(async (resolve, reject) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if(err){
          console.error();(`EXIT : util.getSingleImageData(); Error : ${err}`);
          return reject(err);
      }
      console.log("EXIT : util.getSingleImageData(); Success");
      return resolve(files[Object.keys(files)[0]]);
    });
  });
}

const insertFileInS3 = async (bucketName, path) => {
      console.log("ENTER: util.insertFileInS3()");
      const fileBuffer = await fs.readFile(path);

      const params = {
          Bucket: constant.awsConst.PROFILE_PICTURE_BUCKET,
          Key: path,
          Body: fileBuffer,
          ACL: 'public-read'
      };

      var putObjectPromise = s3.upload(params).promise();
      return new Promise(async (resolve, reject) => {
        putObjectPromise.then(function(data) {
        console.log(`EXIT: util.insertFileInS3(); Success data: ${data}`);
        resolve(data);
      }).catch(function(err) {
        console.error(`EXIT: util.insertFileInS3(); Error: ${err}`);
        reject(err);
      });
    });

}

module.exports = { getSingleImageData, insertFileInS3 }
