import React from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Form, Checkbox, Icon } from 'semantic-ui-react'

export default class UserCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            username: '',
            emailAddress: '',
            telephone:'',
            lastName:'',
            firstName:'',
            _links:{
                self:{
                    href:''
                }
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.turnOff = this.turnOff.bind(this);
        this.turnON = this.turnON.bind(this);
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

    handleCreate() {
        var i=1
        console.log(this.state._links.self.href)
        console.log(this.props.totalUserNumber)
        const info = {
            active:"Y",
            username: this.state.username,
            emailAddress: this.state.emailAddress,
            telephone: this.state.telephone,
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            _links:{
                    self:{
                        href: `http://dev.gracehanin.org/appUsers/${this.props.totalUserNumber+i}`
                    }
                }
        };
        this.props.onCreate(info);
        this.setState({
            username:'',
            emailAddress:'',
            telephone:'',
            lastName:'',
            firstName:'',
            _links:{
                    self:{
                        href:info._links.self.href
                    }
                }
        });
        this.nameInput.focus();
        this.turnOff();
        }
        
    render(){
        const {active} = this.state


        return(
            <div>
            <Button
                positive
                content="Add User" 
                icon='plus' 
                labelPosition='left' 
                className="ui primary button"
                onClick={this.turnON}
            />
                <Modal open={active}>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                    <Image wrapped size='large' src='http://whats-theword.com/wp-content/themes/gonzo/images/no-image-featured-image.png' />
                    <Modal.Description>
                        <Header>Create A New User</Header>
                        <Form>
                            <Form.Field>
                                <label>User Name</label>
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
                                <label>Email Address</label>
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
                                <label>Telephone Number</label>
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
                                <label>Last Name</label>
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
                            <Button positive fluid onClick={this.handleCreate} >Create</Button>
                            <Button negative fluid onClick={this.turnOff} style= {{'marginTop':'10px'}} >Cancle</Button>
                        </Form>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>

        )
    }
}
  

UserCreate.propTypes = {
    onCreate: PropTypes.func
};
UserCreate.defaultProps = {
  onCreate: () => { console.error('onCreate is not defined');}
}
