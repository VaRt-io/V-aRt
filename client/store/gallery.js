import axios from 'axios';

//
// ACTION TYPES
//

const GET_GALLERIES = 'GET_GALLERIES';
const POST_GALLERY = 'POST_GALLERY';
const DELETE_GALLERY = 'DELETE_GALLERY';

//
// ACTION CREATORS
//

const getGalleries = galleries => {
    return { type: GET_GALLERIES, galleries }
};

const postGallery = gallery => {
    return { type: POST_GALLERY, gallery }
};

const removeGallery = gallery => {
    return { type: DELETE_GALLERY, gallery }
};

//
// THUNKS
//

export const getGallerysThunk = () => dispatch =>
    axios.get('/api/galleries')
        .then(result => result.data)
        .then(galleries => dispatch(getGalleries(galleries)))
        .catch(console.error);

export const postGalleryThunk = gallery => dispatch =>
    axios.post('/api/galleries')
        .then(result => result.data)
        .then(gallery => dispatch(postGallery(gallery)))
        .catch(console.error);

export const deleteGalleryThunk = gallery => dispatch =>
    axios.delete('/api/galleries')
        .then(result => result.data)
        .then(gallery => dispatch(removeGallery(gallery)))
        .catch(console.error);

//
// REDUCER
//

export default function reducer(state = [], action){
    switch(action.type){
        case GET_GALLERIES:
          return action.galleries;
        case POST_GALLERY:
          return [...state, action.gallery];
        case DELETE_GALLERY:
          return state.filter(gallery => gallery.id !== action.gallery.id);
        default:
          return state;
    }
};
