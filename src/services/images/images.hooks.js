const AWS = require('aws-sdk');
const promise = require('bluebird');
const s3 = promise.promisifyAll(new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_KEY
}));

module.exports = {
  before: {
    all: [],
    find: [
      function getS3Images(hook) {
        const s3Params = {Bucket: hook.app.get('bucket')};
        var resultantArr = [];
        var objectKeys = [];
        // Fetch list of objects in bucket
        // Make an http request for the head of each object
        // If there is a galleryid query param
        // filter the head objects by the specified gallery id
        // Construct objects consisting of the galleryid, position, urls joining the listObjects with the ObjectHeads on the last modified value
        // Else do the same as the if statement, but without filtering by the gallery id

        return s3.listObjectsAsync(s3Params)
          .then((data) => {
            objectKeys = data.Contents;
            return data.Contents.map((object) => s3.headObjectAsync({Bucket: hook.app.get('bucket'), Key: object.Key}));
          })
          .then((allObjectHeadPromises) => Promise.all(allObjectHeadPromises))
          .then((allObjectHeads) => {
            if (hook.params.query.hasOwnProperty('galleryid')) {
              return allObjectHeads.filter((objectHead) => {
                if (objectHead.Metadata.hasOwnProperty('galleryid') && objectHead.Metadata.hasOwnProperty('position')) {
                  return objectHead.Metadata.galleryid === hook.params.query.galleryid;
                }
              });
            } else {
              allObjectHeads.forEach((headObject) => {
                objectKeys.forEach((objectKey) => {
                  if (headObject.LastModified.toString() === objectKey.LastModified.toString()) {
                    resultantArr.push({url: `https://s3.amazonaws.com/${hook.app.get('bucket')}/${objectKey.Key}`, position: headObject.Metadata.position, galleryid: headObject.Metadata.galleryid});
                  }
                });
              });
              // return resultantArr;
              hook.result = resultantArr;
              throw new Error('No query params')
            }
          })
          .then((filteredObjects) => {
            if (filteredObjects[0].position) {
              return filteredObjects;
            }
            filteredObjects.forEach((filteredObject) => {
              objectKeys.forEach((objectKey) => {
                if (filteredObject.LastModified.toString() === objectKey.LastModified.toString()) {
                  resultantArr.push({url: `https://s3.amazonaws.com/${hook.app.get('bucket')}/${objectKey.Key}`, position: filteredObject.Metadata.position, galleryid: filteredObject.Metadata.galleryid});
                }
              });
            });
            // return resultantArr;
            hook.result = resultantArr;
          })
          .catch((err) => {
            if (err.message === 'No query params') {
              console.log('no query params so terminating promise chain');
            }
          });
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      // send a delete request to the s3 server for the image
      function deleteObject(hook) {
        const s3Params = {Bucket: hook.app.get('bucket'), Key: hook.params.query.name};
        const paintingUrl = `s3.amazonaws.com/stanky-clams/${hook.params.query.name}`;
        return s3.deleteObjectAsync(s3Params)
        .then((response) => {
          hook.result = {imageDeleted: true};
          console.log('deleted object in s3', response);
          return hook.app.service('api/paintings').find();
        })
          .then((foundPaintings) => {
            const paintingToDelete = foundPaintings.filter((aPainting) => aPainting.url === paintingUrl)[0];
            if(paintingToDelete) {
              return hook.app.service('api/paintings').remove(paintingToDelete.id);
            } else {
              throw new Error('No painting to delete in db');
            }
          })
          .then(() => {
          console.log('painting deleted');
            hook.result = {imageDeleted: true, paintingDeleted: true};
          })
        .catch((err) => {
          if(err.message === 'No painting to delete in db') {
            console.log('No painting to delete in db')
          } else {
            console.log(err);
            hook.result = {imageDeleted: true, paintingDeleted: true};
          }
        })
      }
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
