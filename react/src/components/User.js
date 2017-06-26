import React from 'react'
import { Table, Segment, Menu, Icon} from 'semantic-ui-react'
import update from 'react-addons-update';
import UserCreate from './UserCreate';
import axios from 'axios';
import 'whatwg-fetch';
import UserUpdateDelete from './UserUpdateDelete';
import UserSearch from './UserSearch';
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      jobs: [],
      selectedHrefKey: '',
      selectedKey:-1,
      totalUser:0
    };
    
  this.handleCreate = this.handleCreate.bind(this);
  this.handleRemove = this.handleRemove.bind(this);
  this.handleEdit = this.handleEdit.bind(this);
  this.handleClick = this.handleClick.bind(this);
}
/* ----------GET Database----------------------------------------- */
  componentDidMount(){




    axios.get('http://dev.gracehanin.org/appUsers',{
      headers:{
        'Authorization': 'Basic YXBpdXNlcjpXZWxjb21lOTc3MA==',
        'Cache-Control': 'no-cache'
      }
    })
    .then((res)=> {
      if(res.status===200){
        console.log(res)
        return res.data._embedded.appUsers  
      }else{
        return alert("Can Not Get Database Information");
      }
    })
    .then((body)=>{
      console.log(body)
      this.setState({
        totalUser:body.length+11
      })
      return body
     }).then((body)=>{
        var deletedUser=[];
        var i=0;
        var y=1;
        body.map((obj, i)=>{
          if (obj.deletedFlag==='Y'){
            deletedUser.push(body.indexOf(obj))
          }
          return body
        })
        while(i<deletedUser.length){
          body.splice(deletedUser[i],1)
          if(i!==(deletedUser.length-1)){
            deletedUser[i+1]-=y;
            y++;
          }
          i++;
        }    
        console.log(body)  
        this.setState({
              jobs: body
        });
        return ;
      }) 
    .catch(function (error) {
      console.log(error);
    })
  }
/* ----------GET Database End----------------------------------------- */
  handleClick(hrefKey, key) {
    this.setState({
        selectedHrefKey: hrefKey,
        selectedKey: key
    });
  }
/* ----------Create User Database----------------------------------------- */

  handleCreate(info) {
    console.log(JSON.stringify(info));
    console.log(info);
    fetch('http://dev.gracehanin.org/appUsers', {
            method: 'POST',
            headers:{
              'Authorization': 'Basic YXBpdXNlcjpXZWxjb21lOTc3MA==',
              'Content-Type' : 'application/json',
              'Cache-Control': 'no-cache'
              },
            body:JSON.stringify(info)
        })
        .then((res)=>{
          if(res.status===201){
            return res.json();
          }else{
           return alert("Error: Response is not (201)")
          }
        }).then((body)=>{
          console.log(body)
          this.setState({
              jobs: update(this.state.jobs, { $push: [body]})
            });
        })
  };
/* ----------Create User Database End----------------------------------------- */


/* ----------Delete Database----------------------------------------- */
  handleRemove(hrefKey, key) {
    console.log(hrefKey)
    console.log(key)
    var DeleteFlag={
        "deletedFlag": "Y"
      }

    fetch(hrefKey, {
      method: 'PATCH',
      headers:{
        'Authorization': 'Basic YXBpdXNlcjpXZWxjb21lOTc3MA==',
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache'
        },
      body: JSON.stringify(DeleteFlag)
    })
    .then((res)=>{
      if(res.status===200){
        console.log(res)
        this.setState({
          jobs: update(this.state.jobs,
            { $splice: [[key,1]] }
          ),
          selectedKey: -1
        })
      }else{
        console.log(res)
      }
    })   
  };

/* ----------Delete Database End----------------------------------------- */

/* ----------Update Database----------------------------------------- */

  handleEdit(changedInfo, hrefKey){
    console.log(changedInfo)
    console.log(JSON.stringify(changedInfo))
    fetch(hrefKey, {
      method: 'PATCH',
      headers:{
        'Authorization': 'Basic YXBpdXNlcjpXZWxjb21lOTc3MA==',
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache'
        },
      body: JSON.stringify(changedInfo)
    })
    .then((res)=>{
      console.log(res)
      if(res.status===200){
        this.setState({
          jobs: update(this.state.jobs,
            { 
              [this.state.selectedKey]: {
                username: { $set: changedInfo.username },
                emailAddress: { $set: changedInfo.emailAddress },
                telephone: { $set: changedInfo.telephone},
                lastName: { $set: changedInfo.lastName},
                firstName: { $set: changedInfo.firstName}
              }
            }
          )
        })
      }
    })
  };
/* ----------Update Database End----------------------------------------- */


  render() {

  const userList = this.state.jobs.map((user,i) => {
      return(
        <Table.Row  key={user._links.self.href}>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.emailAddress}</Table.Cell>
          <Table.Cell>{user.telephone}</Table.Cell>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>
            <UserUpdateDelete
              onEdit = {this.handleEdit}
              onRemove = {this.handleRemove}
              onClick={this.handleClick}
              keyValue={i}
              hrefKey={user._links.self.href}
              data={this.state.jobs[i]}
              />
          </Table.Cell>
        </Table.Row>
      )
  });
    return (
      <div>
        <Segment.Group horizontal>
          <Segment>
            <UserSearch
              data={this.state.jobs}
            />
          </Segment>
          <Segment>
            <UserCreate 
                onCreate = {this.handleCreate}
                totalUserNumber = {this.state.totalUser}
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
            {userList}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='8'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='left chevron' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
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
