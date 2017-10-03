/* eslint-disable no-unused-vars */

const AWS = require('aws-sdk');
const promise = require('bluebird');
var s3 = promise.promisifyAll(new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_KEY
}));

class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    const s3Params = {Bucket: 'stanky-clams'};
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
        return data.Contents.map((object) => s3.headObjectAsync({Bucket: 'stanky-clams', Key: object.Key}));
      })
      .then((allObjectHeadPromises) => Promise.all(allObjectHeadPromises))
      .then((allObjectHeads) => {
        if (params.query.hasOwnProperty('galleryid')) {
          return allObjectHeads.filter((objectHead) => {
            if (objectHead.Metadata.hasOwnProperty('galleryid') && objectHead.Metadata.hasOwnProperty('position')) {
              return objectHead.Metadata.galleryid === params.query.galleryid;
            }
          });
        } else {
          allObjectHeads.forEach((headObject) => {
            objectKeys.forEach((objectKey) => {
              if (headObject.LastModified.toString() === objectKey.LastModified.toString()) {
                resultantArr.push({url:`https://s3.amazonaws.com/stanky-clams/${objectKey.Key}`, position: headObject.Metadata.position, galleryid: headObject.Metadata.galleryid});
              }
            });
          });
          return resultantArr;
        }
      })
      .then((filteredObjects) => {
        if(filteredObjects[0].position) {
          return filteredObjects;
        }
        filteredObjects.forEach((filteredObject) => {
          objectKeys.forEach((objectKey) => {
            if (filteredObject.LastModified.toString() === objectKey.LastModified.toString()) {
              resultantArr.push({url:`https://s3.amazonaws.com/stanky-clams/${objectKey.Key}`, position: filteredObject.Metadata.position, galleryid: filteredObject.Metadata.galleryid});
            }
          });
        });
        return resultantArr;
      })
      .catch((err) => {
        if (err.message !== 'Cannot read property \'forEach\' of undefined') {
          console.log(err);
        }
      });
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  remove (id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
