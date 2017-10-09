import axios from 'axios';


//INITIAL STATE

export const initialGalleryState = {
  galleryCollection: []
};

//
// ACTION TYPES
//


export const GET_GALLERIES = 'GET_GALLERIES';
export const POST_GALLERY = 'POST_GALLERY';
export const DELETE_GALLERY = 'DELETE_GALLERY';
export const UPDATE_GALLERY = 'UPDATE_GALLERY';

//
// ACTION CREATORS
//


export const getGalleries = galleries => {
  return { type: GET_GALLERIES, galleries };
};

export const postGallery = gallery => {
  return { type: POST_GALLERY, gallery };
};

export const updateGallery = gallery => {
  return { type: UPDATE_GALLERY, gallery };
};

export const removeGallery = gallery => {
  return { type: DELETE_GALLERY, gallery };
};

//
// THUNKS
//

export const getGalleriesThunk = () => (dispatch) => {
  axios.get('/api/galleries')
    .then(result => result.data)
    .then(galleries => dispatch(getGalleries(galleries)))
    .catch(console.error);
};

export const postGalleryThunk = (gallery, history) => dispatch => {
  console.log(history);
  axios.post('/api/galleries', gallery)
    .then(result => result.data)
    .then(newGallery => {
      dispatch(postGallery(newGallery));
      history.push(`/gallery-edit/${newGallery.id}`);
    })
    .catch(console.error);
};

export const updateGalleryThunk = (gallery) => dispatch => {
  console.log(history);
  axios.put(`/api/galleries/${gallery.id}`, gallery)
    .then(result => result.data)
    .then(newGallery => {
      dispatch(updateGallery(newGallery));
    })
    .catch(console.error);
};

export const deleteGalleryThunk = gallery => dispatch => {
  axios.delete('/api/galleries', gallery)
    .then(result => result.data)
    .then(deletedGallery => dispatch(removeGallery(deletedGallery)))
    .catch(console.error);
};


//
// REDUCER
//

export default function reducer(state = initialGalleryState, action){
  switch (action.type){
  case GET_GALLERIES:
    return Object.assign({}, state, {galleryCollection: action.galleries});
  case POST_GALLERY:
    return [...state, action.gallery];
  case UPDATE_GALLERY:
    return Object.assign({}, state,
      {galleryCollection: state.galleryCollection.map(
        gallery => gallery.id === action.gallery.id ? action.gallery : gallery
      )}
    );
  case DELETE_GALLERY:
    return Object.assign({}, state,
      {galleryCollection: state.galleryCollection.filter(
        gallery => gallery.id !== action.gallery.id)
      }
    );
  default:
    return state;
  }
}
