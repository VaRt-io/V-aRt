import axios from 'axios';


//INITIAL STATE
export const initialGalleryState = {
  galleryCollection: [],
  newGallery: {},
};
//
// ACTION TYPES
//


export const GET_GALLERIES = 'GET_GALLERIES';
export const POST_GALLERY = 'POST_GALLERY';
export const DELETE_GALLERY = 'DELETE_GALLERY';

//
// ACTION CREATORS
//


export const getGalleries = galleries => {
  return { type: GET_GALLERIES, galleries };
};

export const postGallery = gallery => {
  return { type: POST_GALLERY, gallery };
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

export const postGalleryThunk = gallery => dispatch => {
  axios.post('/api/galleries', gallery)
    .then(result => result.data)
    .then(newGallery => dispatch(postGallery(newGallery)))
    .catch(console.error);
};

export const deleteGalleryThunk = gallery => dispatch => {
  axios.delete('/api/galleries', gallery)
    .then(result => result.data)
    .then(gallery => dispatch(removeGallery(gallery)))
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
  case DELETE_GALLERY:
    return state.filter(gallery => gallery.id !== action.gallery.id);
  default:
    return state;
  }
}
