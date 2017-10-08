import axios from 'axios';

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
    	strategy: "jwt",
      accessToken: localStorage.getItem('jwt')
    };
   const userEmail = localStorage.getItem('email');
   axios.post('/authentication', jwtOptions)
     .then(result => result.data)
     .then((response) => dispatch(authSuccess()))
     .then(() => axios.get(`/api/users?email=${userEmail}`))
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
     .then(payload => {
       localStorage.setItem('jwt', payload.accessToken);
       localStorage.setItem('email', user.email);
       return dispatch(authSuccess());
     })
     .then(() => axios.get(`/api/users?email=${user.email}`))
     .then((res) => res.data)
     .then(userArray => {
       dispatch(setCurrentUser(userArray[0]));
       history.push('/dashboard')
     })
     .catch((err) => dispatch(authFail()));
 };

 // export const deauthUser = user => dispatch => {
 //   axios.post('/api/authentiction', user)
 //     .then(result => result.data)
 //     .then(newUser => {
 //       dispatch(de(newUser));
 //     })
 //     .catch(console.error);
 // };

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
