const app = require('../../src/app');
const expect = require('chai').expect;
const request = require('supertest');
const agent = request.agent(app);
const users = app.service('api/users');
const galleries = app.service('api/galleries');
const paintings = app.service('api/paintings');
const db = app.settings.sequelizeClient;
// TODO: import the user, gallery, and painting service

describe('s3/images service', () => {
  before(() => {
    return db.sync({force: true})
      .catch(console.error);
  });

  it('registered the service', () => {
    const service = app.service('s3/images');
    expect(service).to.satisfy((response) => response)
  });

  // TODO: Write a before hook that empties database & s3 bucket
  // TODO: Write a before hook that seeds db with a user and gallery
  // TODO: Writer a delete image service hook
  // TODO: Write a after hook that cleans up s3 & database

  describe('POST s3/images/new - multipart file uploading service', () => {
    var theCreatedUser;
    var theCreatedGallery;

    beforeEach(() => {
      return users.create({
        email: 'artist1@email.com',
        password: 'password',
        profileImageUrl: 'https://cdn-images-1.medium.com/max/1600/1*w7nRoB7E8bMPz_ly0oCNdQ.png',
        bio: 'a short bio'
      }).then((createdUser) => {
        theCreatedUser = createdUser;
        return galleries.create({
          title: 'test title',
          thumbnailUrl: 'http://howtorecordpodcasts.com/wp-content/uploads/2012/10/YouTube-Background-Pop-4.jpg',
          userId: theCreatedUser.id
        });
      }).then((createdGallery) => {
        theCreatedGallery = createdGallery;
        return theCreatedGallery;
      })
    });

    afterEach(() => {
      var paintingsModel;
      var galleriesModel;
      var usersModel;

      db.modelManager.models.forEach((model) => {
        if (model.name === 'paintings') {
          paintingsModel = model;
        } else if (model.name === 'galleries') {
          galleriesModel = model;
        } else {
          usersModel = model;
        }
      });

      // paintings.find().then((foundPaintings) => {
      //   const foundPaintingIds = foundPaintings.map((painting) => painting.id);
      //   const deletePaintingPromises = foundPaintingIds.map((id) => paintings.remove(id));
      //   return Promise.all(deletePaintingPromises);
      // })

      // return paintingsModel.truncate({cascade: true})
      //   .then(() => galleriesModel.truncate({cascade: true}))
      //   .then(() => usersModel.truncate({cascade: true}))
    });

    const dataUri = 'data:image/gif;base64,R0lGODlhEwATAPcAAP/+//7/////+////fvzYvryYvvzZ/fxg/zxWfvxW/zwXPrtW/vxXvfrXv3xYvrvYvntYvnvY/ruZPrwZPfsZPjsZfjtZvfsZvHmY/zxavftaPrvavjuafzxbfnua/jta/ftbP3yb/zzcPvwb/zzcfvxcfzxc/3zdf3zdv70efvwd/rwd/vwefftd/3yfPvxfP70f/zzfvnwffvzf/rxf/rxgPjvgPjvgfnwhPvzhvjvhv71jfz0kPrykvz0mv72nvblTPnnUPjoUPrpUvnnUfnpUvXlUfnpU/npVPnqVPfnU/3uVvvsWPfpVvnqWfrrXPLiW/nrX/vtYv7xavrta/Hlcvnuf/Pphvbsif3zk/zzlPzylfjuk/z0o/LqnvbhSPbhSfjiS/jlS/jjTPfhTfjlTubUU+/iiPPokfrvl/Dll/ftovLWPfHXPvHZP/PbQ/bcRuDJP/PaRvjgSffdSe3ddu7fge7fi+zkuO7NMvPTOt2/Nu7SO+3OO/PWQdnGbOneqeneqvDqyu3JMuvJMu7KNfHNON7GZdnEbejanObXnOW8JOa9KOvCLOnBK9+4Ku3FL9ayKuzEMcenK9e+XODOiePSkODOkOW3ItisI9yxL+a9NtGiHr+VH5h5JsSfNM2bGN6rMJt4JMOYL5h4JZl5Jph3Jpl4J5h5J5h3KJl4KZp5Ks+sUN7Gi96lLL+PKMmbMZt2Jpp3Jpt3KZl4K7qFFdyiKdufKsedRdm7feOpQN2QKMKENrpvJbFfIrNjJL1mLMBpLr9oLrFhK69bJFkpE1kpFYNeTqFEIlsoFbmlnlsmFFwpGFkoF/////7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANAALAAAAAATABMAAAj/AKEJHCgokKJKlhThGciQYSIva7r8SHPFzqGGAwPd4bKlh5YsPKy0qFLnT0NAaHTcsIHDho0aKkaAwGCGEkM1NmSkIjWLBosVJT6cOjUrzsBKPl54KmYsACoTMmk1WwaA1CRoeM7siJEqmTIAsjp40ICK2bEApfZcsoQlxwxRzgI8W8XhgoVYA+Kq6sMK0QEYKVCUkoVqQwQJFTwFEAAAFZ9PlFy4OEEiRIYJD55EodDA1ClTbPp0okRFxBQDBRgskAKhiRMlc+Sw4SNpFCIoBBwkUMBkCBIiY8qAgcPG0KBHrBTFQbCEV5EjQYQACfNFjp5CgxpxagVtUhIjwzaJYSHzhQ4cP3ryQHLEqJbASnu+6EIW6o2b2X0ISXK0CFSugazs0YYmwQhziyuE2PLLIv3h0hArkRhiCCzAENOLL7tgAoqDGLXSSSaPMLIIJpmAUst/GA3UCiuv1PIKLtw1FBAAOw=='

    it('uploads a file encoded as dataURI', () => {
      return agent
        .post(`/s3/images/new`)
        .send({
          uri: dataUri,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => {
          expect(res.body.uri).to.equal(dataUri);
        })
    });

    // it('sends the galleryId, userId, and name along with the file encoded as dataURI', () => {
    //   return agent
    //     .post(`/s3/images/new`)
    //     .send({
    //       uri: dataUri,
    //       name: 'testFile',
    //       userId: theCreatedUser.id,
    //       galleryId: theCreatedGallery.id
    //     })
    //     .expect('Content-Type', /json/)
    //     .expect(201)
    //     .expect((res) => {
    //       expect(res.body.name).to.equal('testFile');
    //       expect(res.body.userId).to.equal(theCreatedUser.id);
    //       expect(res.body.galleryId).to.equal(theCreatedGallery.id);
    //     })
    // });

    // it('saves the s3 hosted url along with any associated data of the uploaded file to the DB', () => {
    //   return agent
    //     .post('/s3/images/new')
    //     .send({
    //       uri: dataUri,
    //       name: 'testFile',
    //       userId: 1,
    //       galleryId: 1
    //     })
    //     .expect('Content-Type', /json/)
    //     .expect(201)
    //     .expect((res) => {
    //       expect(res.body.name).to.equal('testFile');
    //     })
    //     .expect(() => {
    //     paintings
    //       .find()
    //       .then((foundPaintings) => {
    //       const filteredPaintings = foundPaintings.filter((paintings) => paintings.url === `s3.amazonaws.com/stanky-clams/testFile`)
    //       expect(filteredPaintings.length).to.equal(1);
    //     });
    //   })
    // });
  })
});
