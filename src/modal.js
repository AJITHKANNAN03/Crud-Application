import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ModalPop(sample) {
  const updateApiCall=()=>{
    sample.handleclose();
    fetch(`https://65c4818cdae2304e92e2bba7.mockapi.io/crud-application/Crud-Application/${sample.userData.ID}`,{
      method: 'PUT', // or PATCH
      headers: {'content-type':'application/json'},
      body: JSON.stringify(sample.userData)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      // handle error
    }).then(task => {
      sample.setdepvalue(!sample.depvalue)
    }).catch(error => {
      // handle error
    })
  }

  // add new row
  const addnew=()=>{
    if(sample.userData.NAME!=null && sample.userData.PHONE!=null && sample.userData.EMAIL!=null && sample.userData.ADDRESS!=null){
    fetch('https://65c4818cdae2304e92e2bba7.mockapi.io/crud-application/Crud-Application', {
    method: 'POST',
    headers: {'content-type':'application/json'},
    // Send your data in the request body as JSON
    body: JSON.stringify(sample.userData)
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
  }).then(task => {
    sample.setdepvalue(!sample.depvalue)
    alert("Added Successfully😍😎")
  }).catch(error => {
    // handle error
  })
  sample.handleclose();
}
else{
  alert("Please Full All Details");
}
  }   
  
  return (
    <>
      <Modal show={sample.show} onHide={sample.handleclose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>NAME</Form.Label>
              <Form.Control
                type="text"
                placeholder="AJITH KANNAN"
                autoFocus
                defaultValue={sample.userData.NAME}
                onChange={(e)=>sample.setUserData({...sample.userData,NAME:e.target.value})}
              />
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                defaultValue={sample.userData.EMAIL}
                autoFocus
                onChange={(e)=>sample.setUserData({...sample.userData,EMAIL:e.target.value})}
              />
               <Form.Label>PHONE</Form.Label>
              <Form.Control
                type="tel"
                placeholder="+91 90988 98000"
                defaultValue={sample.userData.PHONE}
                autoFocus
                onChange={(e)=>sample.setUserData({...sample.userData,PHONE:e.target.value})}
              />
              <Form.Label>ADDRESS</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your City"
                defaultValue={sample.userData.ADDRESS}
                onChange={(e)=>sample.setUserData({...sample.userData,ADDRESS:e.target.value})}
                autoFocus
              />
            </Form.Group>  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={sample.handleclose}>
            Close
          </Button>
          {sample.userData.ID==null ?<Button variant="warning" onClick={addnew}>ADD</Button> :<Button variant="primary" onClick={updateApiCall}>Save Changes</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
