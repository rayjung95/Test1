import React from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'

export default class UserUpdateDelete extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      emailAddress: '',
      telephone:'',
      lastName:'',
      firstName:'',
      active: false
    }
    this.setUpdateKey = this.setUpdateKey.bind(this);
    this.setDeletKey = this.setDeletKey.bind(this);
    this.delete = this.delete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.turnON = this.turnON.bind(this);
    this.turnOff = this.turnOff.bind(this);

  }
  setUpdateKey() {
    this.turnON();
    this.props.onClick(this.props.hrefKey, this.props.keyValue);
    console.log(this.props.keyValue)
    console.log(this.props.data)
    this.setState({
      username: this.props.data.username,
      emailAddress: this.props.data.emailAddress,
      telephone: this.props.data.telephone,
      lastName: this.props.data.lastName,
      firstName: this.props.data.firstName
    })   
  }
  turnON (){
    this.setState({
      active:true
    })
  }
  turnOff (){
    this.setState({
      active:false
    })
  }

  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState)
  }

  setDeletKey(){
    this.props.onClick(this.props.hrefKey, this.props.keyValue);
    this.delete(this.props.hrefKey, this.props.keyValue);
  }

  delete(hrefKey, key){
    this.props.onRemove(hrefKey, key);
  }

  handleEdit(){
    console.log(this.state)
    console.log("hahah")
    const changedInfo = {
      username: this.state.username,
      emailAddress: this.state.emailAddress,
      telephone: this.state.telephone,
      lastName: this.state.lastName,
      firstName: this.state.firstName
    };
    console.log(changedInfo)
    this.props.onEdit(changedInfo, this.props.hrefKey);
    this.setState({
      username:'',
      emailAddress:'',
      telephone:'',
      lastName:'',
      firstName:''
    });
    this.turnOff();
  }
  
  render() {
    const {active} = this.state
    const model = (
      <Modal dimmer='inverted' open={active} >
          <Modal.Header>UPDATE</Modal.Header>
          <Modal.Content image>
          <Image wrapped size='large' src='http://whats-theword.com/wp-content/themes/gonzo/images/no-image-featured-image.png' />
          <Modal.Description>
              <Header>Update Infromation</Header>
              <Form>
                  <Form.Field>
                      <label>First Name</label>
                      <input
                          size='big'
                          type="text"
                          name="username"
                          placeholder="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          ref={(ref) => { this.nameInput = ref }}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>First Name</label>
                      <input
                          size='big'
                          type="text"
                          name="emailAddress"
                          placeholder="emailAddress"
                          value={this.state.emailAddress}
                          onChange={this.handleChange}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>First Name</label>
                      <input
                          size='big'
                          type="text"
                          name="telephone"
                          placeholder="telephone"
                          value={this.state.telephone}
                          onChange={this.handleChange}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>First Name</label>
                      <input
                          size='big'
                          type="text"
                          name="lastName"
                          placeholder="lastName"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>First Name</label>
                      <input
                          size='big'
                          type="text"
                          name="firstName"
                          placeholder="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                      />
                  </Form.Field>
                  <Form.Field>
                      <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field>
                  <Button 
                    primary 
                    onClick={this.handleEdit}
                    >Update</Button>
              </Form>
          </Modal.Description>
          </Modal.Content>
      </Modal>
    )


    return(
      <div>
        <div className="ui buttons">
          <Button 
            content="Update" 
            icon='plus' 
            labelPosition='left' 
            className="ui primary button"
            onClick={this.setUpdateKey}
            />
          {model}
          <div className="or"></div>
          <Button
          content="Delte"
          icon='minus'
          labelPosition="right"
          className="ui negative button"
          onClick={this.setDeletKey}
          />
        </div>
      </div>

      
    )
  }
}





UserUpdateDelete.propTypes = {
    onClick: PropTypes.func,
    onRemove: PropTypes.func
};
UserUpdateDelete.defaultProps = {
  onClick: () => { console.error('onClick is not defined');},
  onRemove: () => { console.error('onRemove is not defined');}
}
