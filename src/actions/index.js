import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch,getState) => {
   console.log('About to fetch posts!');
   await dispatch(fetchPosts()); //we always need dispatch here again so that reducer gets called //we also need await since we need to wait before running the code below
   console.log('fetched posts!');
   //console.log(getState().posts);

   const userIds = _.uniq(_.map(getState().posts,'userId')); //Lodash version of map where it runs over all data and finds only userId prop and then finds only the unique ones out of them
   console.log(userIds);
   userIds.forEach(id => dispatch(fetchUser(id))); //no need await since we have no following code below

   //Alternate way to do using lodash chain
   //_.chain(getState().posts).map('userId').uniq().forEach(id => dispatch(fetchUser(id))).value(); //.value is necessary for it to execute
};

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({ type: 'FETCH_POSTS', payload: response.data});
    };
    
    //BAD APPROACH
    /*const response = await jsonPlaceholder.get('/posts');
    
    return {
        type: 'FETCH_POSTS',
        payload: response
    };*/

};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({type: 'FETCH_USER', payload: response.data });
};



//Code to remove arrow func and using keyword function
// export const fetchUser = function(id) { 
//     return async function(dispatch){
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({type: 'FETCH_USER', payload: response.data });
//     };
// };

//Code to do memoization
// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id,dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: response.data });
// });