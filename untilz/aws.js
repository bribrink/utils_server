const AWS = require("aws-sdk")
let cfg = {
  iam: {
    key: 'AKIAIERQHVC6LFNJNTVA',
    secret: process.env.AWS_SECRET
  },
}
AWS.config.update({
  region: "us-west-2",
  accessKeyId:cfg.iam.key,
  secretAccessKey:cfg.iam.secret
});

module.exports = AWS;