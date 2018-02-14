DrawingBoard.Board.prototype.fetchUploadURI =  function(uri, name, galleryId, userId) {
    var formData = new FormData();
    formData.append('uri', uri);
    formData.append('name', name);
    formData.append('galleryId', galleryId);
    formData.append('userId', userId);
    const request = new Request('http://localhost:3030/s3/images/new', {
      method: 'POST',
      body: formData,
    });

    fetch(request)
      .then((resp) => resp.json())
      .then((data) => {
        console.log('log from canvas response', data);
        // TODO: Route to galleries page
        setTimeout(() => {
          window.location.href = `/gallery-edit/${galleryId}`;
        }, 200);
      })
      .catch((err) => {
      // TODO: Render an error message
        console.log('error', err);
      });
  };

DrawingBoard.Control.Upload = DrawingBoard.Control.extend({
    
      name: 'upload',
    
      initialize: function() {
        console.log(document.location);
        this.$el.append('<button class="drawing-board-control-download-button"></button>');
        this.$el.on('click', '.drawing-board-control-download-button', $.proxy(function(e) {
          // this.board.downloadImg();
          var dataURL = this.board.getImg();
          var name = this.board.UrlName(document.getElementById('title').value);

          if (!name || name.length < 1) {
              window.alert('You must name your masterpiece!');
              return;
          }

          var galleryId = document.getElementById('galleryId').title;
          var userId = document.getElementById('userId').title;
    
          // console.log(this.board.getImg());
          // console.log(galleryId);
          this.board.fetchUploadURI(dataURL, name, galleryId, +userId);
          e.preventDefault();
        }, this));
      }
    });