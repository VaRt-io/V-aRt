import axios from 'axios';

//
// ACTION TYPES
//

const GET_IMAGES_FROM_S3 = 'GET_IMAGES_FROM_S3';
const POST_IMAGE_TO_S3 = 'POST_IMAGE_TO_S3';
const UPDATE_IMAGE_ON_S3 = 'UPDATE_IMAGE_ON_S3';
const DELETE_IMAGE_ON_S3 = 'DELETE_IMAGE_ON_S3';

//
// ACTION CREATORS
//

const getImages = images => {
  return { type: GET_IMAGES_FROM_S3, images };
};

const postImage = image => {
  return { type: POST_IMAGE_TO_S3, image };
};

const editImage = image => {
  return { type: UPDATE_IMAGE_ON_S3, image };
};

const removeImage = image => {
  return { type: DELETE_IMAGE_ON_S3, image };
};

//
// THUNKS
//

export const getImagesThunk = () => dispatch => {
  axios.get('/s3/images')
    .then(result => result.data)
    .then(images => dispatch(getImages(images)))
    .catch(console.error);
};

export const postImageThunk = image => dispatch => {
  axios.post('/s3/images')
    .then(result => result.data)
    .then(images => dispatch(postImage(image)))
    .catch(console.error);
};

export const editImageThunk = image => dispatch => {
  axios.put('/s3/images')
    .then(result => result.data)
    .then(image => dispatch(editImage(image)))
    .catch(console.error);
};

export const deleteImageThunk = image => dispatch => {
  axios.delete('/s3/images')
    .then(result => result.data)
    .then(image => dispatch(removeImage(image)))
    .catch(console.error);
};

//
// REDUCER
//

export default function reducer(state = [], action){
  switch (action.type){
  case GET_IMAGES_FROM_S3:
    return action.images;
  case POST_IMAGE_TO_S3:
    return [...state, action.image];
  case UPDATE_IMAGE_ON_S3:
    return state.map(image => (image.url === action.image.url ? action.image : image));
  case DELETE_IMAGE_ON_S3:
    return state.filter(image => image.url !== action.image.url);
  default:
    return state;
  }
}
