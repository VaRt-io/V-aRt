module.exports = {
  services: [
    {
      count: 5, // Create 25 apartments
      path: 'api/users',
      disabled: true,
      delete: false,
      template: {
        name: '{{name.firstName}} {{name.lastName}}',
        bio: '{{lorem.paragraph}}',
        profileImageUrl: '{{image.people}}',
        email: '{{internet.email}}',
        password: '{{internet.password}}'
      },
      callback(user, seed) {
        console.log(user.id, typeof user.id);
        // Create 10 tenants for each apartment
        return seed({
          count: 2,
          disabled: false,
          delete: false,
          path: 'api/galleries',
          template: {
            thumbnailUrl: '{{image.abstract}}',
            title: '{{lorem.word}}',
            userId: user.id
          },
          params: {
            userId: user.id
          },
          callback(gallery, seed) {
            return seed({
              count: 4,
              disabled: false,
              delete: false,
              path: 'api/paintings',
              template: {
                url: '{{image.imageUrl}}',
              }
            });
          }
        });
      }
    
    }
  ]
};
  
