import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const userData = localStorage.getItem('user'); // Assume you store user data in localStorage
    const [user, setUser] = useState(JSON.parse(userData));
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/orders/list?customer_id='+user.customer['id'], {
              headers: {
                'Content-Type': 'application/json',
                // 'X-CSRF-TOKEN': csrfToken // Uncomment and add your CSRF token here if needed
              }
            });
            setOrders(response.data.data);
            console.log('Orders fetched:', response.data);
            // Optionally, handle the response data, e.g., setting it to state or navigating
            // navigate('/some-path'); // Uncomment and use if navigation is needed after fetching
          } catch (error) {
            console.error('Error fetching orders:', error);
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
      
        })
        .catch(error => {
          // Handle the error
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
                <Card.Header> <h2>Order Details</h2></Card.Header>
                <table style={{ margin: 'auto', width: '80%' }}>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? orders.map((item, index) => (
                            <tr key={index}>
                                <td>{item.book?.title}</td>
                                <td>${item.book?.price}</td>
                            </tr>
                        )) : <tr><td colSpan="2">The order is empty.</td></tr>}
                    </tbody>
                </table>
               
            </div>
        );
    
};

export default MyOrder;
