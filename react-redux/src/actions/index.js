import * as types from './ActionTypes';

export function readingUsers(appUsers){
    return {
        type: types.READINGUSERS,
        appUsers
    }
}

export function createRequest(info,totalPageNum) {
    return (dispatch) => {
        return fetch(`http://dev.gracehanin.org/appUsers?page=${totalPageNum-1}&size=20`,{
            method:'POST',
            headers:{
              'Authorization': 'Basic YXBpdXNlcjpXZWxjb21lOTc3MA==',
              'Content-Type' : 'application/json',
              'Cache-Control': 'no-cache'
            },
            body:JSON.stringify(info)
        })
        .then((res)=>{
            if(res.status===201){
                return res.json()
            }else{
                return alert("Error: Response is not 201")
            }
        })
        .then((body)=>{
            console.log("responsed userInfo")
            console.log(body)
            dispatch(createUser(body))
        })
    }
}

export function createUser(userinfo){
    return {
        type: types.CREATEUSER,
        userinfo
    }
}

export function pageRequest(pageNum){
    return (dispatch) => {
        var totalPageNum
        fetch(`http://dev.gracehanin.org/appUsers?page=${pageNum}&size=20`,{
            method:'GET',
            headers:{
                'Authorization': 'Basic YXBpdXNlcjpXZWxjb21lOTc3MA==',
                'Content-Type' : 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
        .then((res)=>{
            if(res.status===200){
                return res.json()
            }else{
                return alert("Can not Access Database")
            }
        }).then((res)=>{
            totalPageNum=res.page.totalPages
            return res._embedded.appUsers
        })
        .then((body)=>{
            console.log(body)
            var deletedUser=[];
            var i=0;
            var y=1;
            body.map((obj, i)=>{
                if (obj.deletedFlag==='Y'){
                    deletedUser.push(body.indexOf(obj))
                }
                return body;
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
            dispatch(readingUsers(body))
            dispatch(pagination(pageNum,totalPageNum))
            return ;
        })
    }
}

export function pagination(pageNum,totalPageNum){
    return{
        type: types.PAGINATION,
        pageNum,
        totalPageNum
    }
}

export function updateRequest(changedInfo,hrefKey){
    return (dispatch)=> {
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
            if(res.status===200){
                console.log(res.json());
            }
        })
    
    }

}

export function updateUser(changedInfo,hrefKey){
    return{
        type: types.UPDATEUSER,
        changedInfo,
        hrefKey
    }
}
