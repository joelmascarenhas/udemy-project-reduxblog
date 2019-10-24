import React from 'react';
import { connect } from 'react-redux';
//import { fetchUser } from '../actions'; removed since we grouped action

class UserHeader extends React.Component {

    // componentDidMount(){ Not Called anymore since we grouped functions
    //     this.props.fetchUser(this.props.userId);
    // }

    render(){
        const {user} = this.props; // Similar to the step below
       //const user = this.props.user;
       if(!user){
            return null; //can also show a loading sign here
        }
        
        return(
            <div className="header">{user.name}</div>
        );
    };
};

const mapStateToProps = (state,ownProps) => {
    //return {users: state.users}
    return {user: state.users.find(user => user.id === ownProps.userId)}
};

export default connect(mapStateToProps)(UserHeader);