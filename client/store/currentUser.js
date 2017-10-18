import axios from 'axios';
import jwt_decode from 'jwt-decode';

//
//INITIAL STATE
//

export const initialAuthState = {
  isLoggedIn: null,
};

/**
 * ACTION TYPES
 */

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';
const DEAUTHENTICATE_USER = 'DEAUTHENTICATE_USER';
const SET_CURRENT_USER = 'SET_CURRENT_USER';

/**
 * ACTION CREATORS
 */

const authSuccess = user => {
  return {type: AUTH_SUCCESS, user};
};

const authFail = () => {
  return {type: AUTH_FAIL };
};

export const deAuthenticateUser = () => {
  return {type: DEAUTHENTICATE_USER};
};

const setCurrentUser = user => {
  return {type: SET_CURRENT_USER, user};
};


/**
 * THUNK CREATORS
 */

 export const checkIfLoggedIn = () => dispatch => {
   const jwtOptions = {
    	strategy: 'jwt',
      accessToken: localStorage.getItem('jwt')
    };
  let decodedJwt;
  try {
    decodedJwt = jwt_decode(jwtOptions.accessToken);
  } catch (e) {
    decodedJwt = null;
  }
  axios.post('/authentication', jwtOptions)
     .then(result => result.data)
     .then((response) => dispatch(authSuccess()))
     .then(() => axios.get(`/api/users?id=${decodedJwt.userId}`))
     .then((res) => res.data)
     .then(userArray => {
       dispatch(setCurrentUser(userArray[0]));
     })
     .catch((err) => {
     console.log('not logged in currently');
   });
 };

 export const attemptAuth = (user, history) => dispatch => {
   axios.post('/authentication', user)
     .then(result => result.data)
     .then(response => {
       const jwt = response.accessToken;
       localStorage.setItem('jwt', jwt);
       dispatch(authSuccess());
       return jwt_decode(jwt);
     })
     .then((jwt) => axios.get(`/api/users?id=${jwt.userId}`))
     .then((res) => res.data)
     .then(userArray => {
       dispatch(setCurrentUser(userArray[0]));
       history.push(`/artists/${userArray[0].id}`);
     })
     .catch((err) => {
       console.log('failed', err);
       dispatch(authFail());
      });
 };

 /**
  * REDUCER
  */

 export default function reducer (state = initialAuthState, action) {
   switch (action.type) {
   case AUTH_SUCCESS:
     return Object.assign({}, state, {isLoggedIn: true});
   case AUTH_FAIL:
     return Object.assign({}, state, {isLoggedIn: false});
   case DEAUTHENTICATE_USER:
     return initialAuthState;
   case SET_CURRENT_USER:
     return Object.assign({}, state, action.user);
   default:
     return state;
   }
 }
