import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

// import PropTypes from 'prop-types';

// const propTypes = {

// };

// const defaultProps = {

// };

export default class UserUpdateDelete extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalOpen:false,
            username: '',
            emailAddress: '',
            telephone:'',
            lastName:'',
            firstName:''

        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleOpen() {
        this.setState({
            modalOpen: true,
            username: this.props.appUsers.username,
            emailAddress: this.props.appUsers.emailAddress,
            telephone: this.props.appUsers.telephone,
            lastName: this.props.appUsers.lastName,
            firstName: this.props.appUsers.firstName
        })
    } 
    handleClose(){
        this.setState({
            modalOpen: false,
        })
    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }
    handleUpdate(){
        const changedInfo = {
            active:"Y",
            username: this.state.username,
            emailAddress: this.state.emailAddress,
            telephone: this.state.telephone,
            lastName: this.state.lastName,
            firstName: this.state.firstName
        };
        console.log(changedInfo)
        this.props.onEdit(changedInfo, this.props.hrefKey)
        this.setState({
            username:'',
            emailAddress:'',
            telephone:'',
            lastName:'',
            firstName:''
        });
        this.handleClose();
    }


    render(){
        return(
            <div className="ui buttons">
                <Modal
                    trigger={<Button primary onClick={this.handleOpen}>Update</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                >
                    <Modal.Header>UPDATE</Modal.Header>
                    <Modal.Content image>
                    <Image wrapped size='large' src='http://whats-theword.com/wp-content/themes/gonzo/images/no-image-featured-image.png' />
                    <Modal.Description>
                        <Header>Update Infromation</Header>
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
                                <label>Telephone</label>
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
                            <Button 
                                primary 
                                onClick={this.handleUpdate}
                                >Update</Button>
                        </Form>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                
                <div className="or"></div>
                <Button
                content="Delete"
                icon='minus'
                labelPosition="right"
                className="ui negative button"
                onClick={this.setDeletKey}
                />
            </div>
        )
    }
}
// UserUpdateDelete.PropTypes = PropTypes;
// UserUpdateDelete.defaultProps = defaultProps;