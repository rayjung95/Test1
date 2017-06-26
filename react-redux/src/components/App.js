import React from 'react'
// import PropTypes from 'prop-types';

import UserList from './UserList';




export default class App extends React.Component{

    render(){
        return(
            <div className='ui container'>
                <UserList/>
            </div>
        )
    }
}
