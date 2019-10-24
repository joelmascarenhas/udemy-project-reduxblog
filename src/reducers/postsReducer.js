export default (state = [], action) => { //since we are expecting an array, we initialise it to blank array for initial load
    switch(action.type){
        case 'FETCH_POSTS':
            return action.payload;
        default: 
            return state;    
    }
};