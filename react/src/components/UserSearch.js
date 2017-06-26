import PropTypes from 'prop-types'
import React from 'react'
import { Label } from 'semantic-ui-react'

import SearchEngine from './SearchEngine'

const resultRenderer = ({ username, emailAddress }) => (
    <div>
        <Label content={username} />
        <Label content={emailAddress} />
    </div>
)
export default class UserSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        return(
            <SearchEngine 
            resultRenderer={resultRenderer} 
            data={this.props.data}/>

        )
    }
}
resultRenderer.propTypes = {
  title: PropTypes.string,
  emailAddress: PropTypes.string,
}








































