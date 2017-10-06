import axios from 'axios';


//INITIAL STATE
export const initialPaintingsState = {
  paintingsCollection: []
};

//
// ACTION TYPES
//


export const GET_PAINTINGS = 'GET_PAINTINGS';

//
// ACTION CREATORS
//


export const getPaintings = paintings => {
  return { type: GET_PAINTINGS, paintings };
};

//
// THUNKS
//

export const getPaintingsThunk = () => (dispatch) => {
  axios.get('/api/paintings')
    .then(result => result.data)
    .then(paintings => dispatch(getPaintings(paintings)))
    .catch(console.error);
};

//
// REDUCER
//

export default function reducer(state = initialPaintingsState, action){
  switch (action.type){
  case GET_PAINTINGS:
    return Object.assign({}, state, {paintingsCollection: action.paintings});
  default:
    return state;
  }
}
