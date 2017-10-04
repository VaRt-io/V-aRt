import axios from 'axios';

//
// ACTION TYPES
//

const GET_USERS = 'GET_USERS';
const ADD_USER = 'ADD_USER';
const GET_USER_GALLERIES = 'GET_USER_GALLERIES';
const DELETE_USER = 'DELETE_USER';
const CHANGE_ADMIN_STATUS = 'CHANGE_ADMIN_STATUS';

/**
 * ACTION CREATORS
 */
const getUsers = users => {
  return { type: GET_USERS, users };
};

const addUser = user => {
  return { type: ADD_USER, user };
};

const getUserGalleries = user => {
  return { type: GET_USER_GALLERIES, user };
};

const deleteUser = user => {
  return { type: DELETE_USER, user };
};

const changeAdminStatus = user => {
  return { type: CHANGE_ADMIN_STATUS, user };
};
/**
 * THUNK CREATORS
 */
export const fetchUsers = () => dispatch =>
  axios.get('/api/users')
    .then(result => result.data)
    .then(users => {
      dispatch(getUsers(users));
    })
    .catch(console.error);

export const postUser = user => dispatch =>
  axios.post('/api/users', user)
    .then(result => result.data)
    .then(newUser => {
      dispatch(addUser(newUser));
    })
    .catch(console.error);

export const fetchUserGalleries = user => dispatch =>
  axios.get('/api/galleries')
    .then(result => result.data)
    .then(user => {
      dispatch(getUserGalleries(user));
    })
    .catch(console.error);

export const removeUser = user => dispatch =>
  axios.delete(`/api/users/${user.id}`)
    .then(() => {
      dispatch(deleteUser(user));
    })
    .catch(console.error);

export const updateAdminStatus = user => dispatch =>
  axios.put(`/api/users/${user.id}`, user)
    .then(() => {
      dispatch(changeAdminStatus(user));
    })
    .catch(console.error);
/**
 * REDUCER
 */
export default function reducer (state = [], action) {
  switch (action.type) {
  case GET_USERS:
    return action.users;
  case ADD_USER:
    return [...state, action.user];
  case GET_USER_GALLERIES:
    return state.filter(galleries => galleries.userId === action.user.id);
  case DELETE_USER:
    return state.filter(user => user.id !== action.user.id);
  case CHANGE_ADMIN_STATUS:
    return state.map(user => (user.id === action.user.id ? action.user : user));
  default:
    return state;
  }
}
