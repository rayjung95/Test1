import React from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'

const propTypes = {
    onOpenForm: PropTypes.func,
    onCreate: PropTypes.func
};

function createWarning(funcName) {
    return ()=>{console.warn(funcName + ' is not defined');}
}
const defaultProps = {
    onOpenForm: createWarning('onOpenForm'),
    onCreate: createWarning('onCreate')
};

export default class UserCreate extends React.Component{

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
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleOpen() {
        this.setState({
            modalOpen: true
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
    handleCreate() {
        const info = {
            active:"Y",
            username: this.state.username,
            emailAddress: this.state.emailAddress,
            telephone: this.state.telephone,
            lastName: this.state.lastName,
            firstName: this.state.firstName
        };
        
        this.props.onCreate(info,this.props.totalPageNum);
        this.setState({
            username:'',
            emailAddress:'',
            telephone:'',
            lastName:'',
            firstName:'',
        });
        this.handleClose();
    }

    




    render(){
        return(
            <div>
                <Modal
                    trigger={<Button positive onClick={this.handleOpen}>Add User</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                >
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
                            <Button negative fluid onClick={this.handleClose} style={{'marginTop':'10px'}}>Cancle</Button>
                        </Form>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
UserCreate.PropTypes = propTypes;
UserCreate.defaultProps = defaultProps;