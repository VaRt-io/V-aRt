import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');
import {attemptAuth} from './index';

//
//INITIAL STATE
//

export const initialUserState = {
  artistsCollection: []
};

//
// ACTION TYPES
//

const GET_USERS = 'GET_USERS';
const GET_USER_GALLERIES = 'GET_USER_GALLERIES';
const DELETE_USER = 'DELETE_USER';

const getUsers = users => {
  return { type: GET_USERS, users };
};

const getUserGalleries = user => {
  return { type: GET_USER_GALLERIES, user };
};

const deleteUser = user => {
  return { type: DELETE_USER, user };
};

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
    .then(result => result.data)
    .then(users => {
      dispatch(getUsers(users));
    })
    .catch(console.error);
};

export const postUser = (user, history) => dispatch => {
  axios.post('/api/users', user)
    .then(result => result.data)
    .then((newUser) => newUser)
    .then((passedUser) => {
      dispatch(fetchUsers());
      const userLogin = {
        email: passedUser.email,
        password: user.password,
        strategy: 'local'
      };
      return dispatch(attemptAuth(userLogin, history));
    })
    .catch(console.error);
};
// TODO: Need to pass auth token in header
export const updateUserThunk = (user) => dispatch => {
  return axios.put(`/api/users/${user.id}`, user)
    .then(result => result.data)
    .then(newGallery => {
      dispatch(fetchUsers());
    })
    .catch(console.error);
};

export const fetchUserGalleries = user => dispatch => {
  axios.get('/api/galleries')
    .then(result => result.data)
    .then(user => {
      dispatch(getUserGalleries(user));
    })
    .catch(console.error);
};

export const removeUser = user => dispatch => {
  axios.delete(`/api/users/${user.id}`)
    .then(() => {
      dispatch(deleteUser(user));
    })
    .catch(console.error);
};

/**
 * REDUCER
 */
export default function reducer (state = initialUserState, action) {
  switch (action.type) {
  case GET_USERS:
    return Object.assign({}, state, {artistsCollection: action.users});
  case GET_USER_GALLERIES:
    return state.filter(galleries => galleries.userId === action.user.id);
  case DELETE_USER:
    return state.filter(user => user.id !== action.user.id);
  default:
    return state;
  }
}
