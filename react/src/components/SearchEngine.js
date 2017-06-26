import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'



export default class SearchEngine extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            results: [],
            value: ''
        }
        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
   componentWillMount() {
    this.resetComponent()
  }
  resetComponent() {
      this.setState({
          isLoading: false, 
          results: [], 
          value: '' 
      })
  }
  handleResultSelect(e, result) {
    this.setState({
        value: result.username
    })
  }
  handleSearchChange(e, value) {
    this.setState({ 
        isLoading: true, 
        value
    })
    setTimeout(()=>{
        console.log('What is going on');
        if (this.state.value.length < 1) {
            return this.resetComponent()
        }
        

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result) => re.test(result.username)
        console.log(_.filter(this.props.data, isMatch))
        this.setState({
            isLoading:false,
            results:_.filter(this.props.data, isMatch)
        })
    },500)
  }




  render() {
    const { isLoading, value, results } = this.state
    
    return (

    
        <Grid>
            <Grid.Column width={8}>
            <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}            
            value={value}            
            {...this.props}
            />
            </Grid.Column>
        </Grid>
    )
  }
}

SearchEngine.propTypes = {
  username: PropTypes.string,
  emailAddress: PropTypes.string,
}