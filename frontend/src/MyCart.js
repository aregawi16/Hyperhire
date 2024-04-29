import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const MyCart = () => {
    const [carts, setCarts] = useState([]);
    const [show, setShow] = useState(false);
    const userData = localStorage.getItem('user'); // Assume you store user data in localStorage
    const [user, setUser] = useState(JSON.parse(userData));
    const toggleShow = () => setShow(!show);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/orders?customer_id='+user.customer['id'], {
              headers: {
                'Content-Type': 'application/json',
                // 'X-CSRF-TOKEN': csrfToken // Uncomment and add your CSRF token here if needed
              }
            });
            setCarts(response.data.data);
            console.log('Orders fetched:', response.data);
            // Optionally, handle the response data, e.g., setting it to state or navigating
            // navigate('/some-path'); // Uncomment and use if navigation is needed after fetching
          } catch (error) {
          }
        };
    
        fetchOrders();
      }, []); // This effect runs only once after the initial render
    
      const handleAddOrder=()=>{
        
    axios.post('http://127.0.0.1:8000/api/orders/add?customer_id='+user.customer['id'], {
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-TOKEN': csrfToken
        }
      })
        .then(response => {
          navigate('/my-order')
        })
        .catch(error => {
          // Handle the error
          setShow(true);
          console.error(error);
        });
  };

      
      const handleDelete=(id)=>{
        axios.delete('http://127.0.0.1:8000/api/orders/'+id, {
            headers: {
              'Content-Type': 'application/json',
              // 'X-CSRF-TOKEN': csrfToken
            }
          })
            .then(response => {
            });
      }
    return (
            <div style={{ textAlign: 'center' }}>
                <h2>Cart Details</h2>
                <table style={{ margin: 'auto', width: '80%' }}>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.length > 0 ? carts.map((item, index) => (
                            <tr key={index}>
                                <td>{item.book?.title}</td>
                                <td>${item.book?.price}</td>
                                <td><Button className='btn btn-danger' onClick={()=> handleDelete(item.book.id)}><FontAwesomeIcon icon={faTrash} /> </Button></td>
                            </tr>
                        )) : <tr><td colSpan="2">The cart is empty.</td></tr>}
                    </tbody>
                </table>
                {carts.length > 0 && (
                    <button className='btn btn-primary' style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }} onClick={ handleAddOrder} >
                        Continue to Order
                    </button>
                )}


                     <Col xs={6}>
                     <Toast show={show} onClose={toggleShow} delay={5000} autohide bg="danger">
                        <Toast.Header>
                            <strong className="mr-auto">Insufficient points:</strong>
                        </Toast.Header>
                        <Toast.Body style={{ color: 'white'}}> This user does not have enough points</Toast.Body>
                    </Toast>
                </Col>
            </div>
            
        );
    
};

export default MyCart;
