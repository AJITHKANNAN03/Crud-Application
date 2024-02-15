import React, {useState,useEffect} from "react";
import {Table,Button} from 'react-bootstrap';
import Modalpop from './modal';



export default function Crud(){
    var [data,setData]=useState([])
    var [depvalue,setdepvalue]=useState(false);
    // functionality for poup show and close
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (showData) => {
      setShow(true);
      setUserData({
        ID:showData.ID,
        NAME:showData.NAME,
        EMAIL:showData.EMAIL,
        PHONE:showData.PHONE,
        ADDRESS:showData.ADDRESS,
      })
    }
    const [userData,setUserData]=useState(
      {
        ID:null,
      NAME:null,
      EMAIL:null,
      PHONE:null,
      ADDRESS:null,
      }
            )
    // fetch for api 
    useEffect(()=>{
        fetch('https://65c4818cdae2304e92e2bba7.mockapi.io/crud-application/Crud-Application', {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(tasks => {
    setData(tasks);
  // Do something with the list of tasks
}).catch(error => {
  // handle error
})
    },[depvalue] )

    // for delete functionality
    const deleteDetails=(del)=>{
      fetch(`https://65c4818cdae2304e92e2bba7.mockapi.io/crud-application/Crud-Application/${del.ID}`, {
          method: 'DELETE',
        }).then(res => {
          if (res.ok) {
              return res.json();
          }
          // handle error
        }).then(task => {
          setdepvalue(!depvalue);
          alert("DELETED SUCCESSFULLY😎");
        }).catch(error => {
          // handle error
        })
    }
    const addUser=()=>{
      setShow(true);
     setUserData( {
        ID:null,
      NAME:null,
      EMAIL:null,
      PHONE:null,
      ADDRESS:null,
      })
    }
         
    
return(
   <div>
   {/* table content */}
   <h1 className="header">CRUD APPLICATION</h1>
   <Button className="m-2" variant="success" onClick={()=>addUser()}>ADD NEW</Button>
   <Table striped bordered hover size="sm" variant="dark" >
      <thead>
        <tr>
          <th>R.NO</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
          <th>ADDRESS</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {
            data?.map((item,i)=>{
                return(
                <tr>
                    <td>{i+1}</td>
                    <td>{item.NAME}</td>
                    <td>{item.EMAIL}</td>
                    <td>{item.PHONE}</td>
                    <td>{item.ADDRESS}</td>
                    <td><Button className="m-2" variant="success" onClick={()=>handleShow(item)}>EDIT</Button><Button className="m-2" variant="danger" onClick={()=>deleteDetails(item)}>DELETE</Button></td>
                  </tr>  
                )
            })
        }
        
      </tbody>
    </Table>
    <Modalpop show={show} handleclose={handleClose} userData={userData}  setUserData={setUserData} depvalue={depvalue} setdepvalue={setdepvalue}/>
   </div>
)
}