import React from 'react'
import 'whatwg-fetch';
// import PropTypes from 'prop-types';
import { Table, Segment, Menu, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux';

import * as actions from '../actions';
import UserCreate from './UserCreate';
import UserUpdateDelete from './UserUpdateDelete';


class UserList extends React.Component{
    constructor(props){
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }
    componentDidMount() {
        this.props.handlePagination(this.props.page)
    }

    handleItemClick(e,{name}) {
        this.props.handlePagination(name-1)
    }

    render(){

        const list = this.props.appUsers.map((user,i) => {
                return(
                    <Table.Row  key={user._links.self.href}>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.emailAddress}</Table.Cell>
                    <Table.Cell>{user.telephone}</Table.Cell>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>
                        <UserUpdateDelete
                            onEdit={this.props.handleUpdate}
                            hrefKey={user._links.self.href}
                            appUsers={this.props.appUsers[i]}
                        />
                    </Table.Cell>
                    </Table.Row>
                )
        });
        return(
            <div>
                
                <Segment.Group horizontal>
                <Segment>
                    search
                </Segment>
                <Segment>
                    <UserCreate
                        onCreate={this.props.handleCreateUser}
                        totalPageNum={this.props.totalPageNum}
                    />
                </Segment>
                
                </Segment.Group>    
                <Table striped>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>E-mail</Table.HeaderCell>
                    <Table.HeaderCell>Telephone</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Operation</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {list}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                    <Table.HeaderCell colSpan='8'>
                        <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                            <Icon name='left chevron' />
                        </Menu.Item>
                        <Menu.Item name='1'  onClick={this.handleItemClick} />
                        <Menu.Item name='2'  onClick={this.handleItemClick} />
                        <Menu.Item name='3'  onClick={this.handleItemClick} />
                        <Menu.Item name='4'  onClick={this.handleItemClick} />
                        <Menu.Item as='a' icon>
                            <Icon name='right chevron' />
                        </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}

// UserList.PropTypes = PropTypes;
// UserList.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        appUsers: state.readingusers.appUsers,
        page: state.pagination.activePage || 0,
        totalPageNum: state.pagination.totalPageNum
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        readingDatabase: (userlists) => { dispatch(actions.readingUsers(userlists)) },
        handleCreateUser : (info,totalPageNum) => { dispatch(actions.createRequest(info,totalPageNum)) },
        handlePagination : (pageNum) => { dispatch(actions.pageRequest(pageNum)) },
        handleUpdate : (changedInfo,hrefKey) => { dispatch(actions.updateRequest(changedInfo, hrefKey)) }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList)
