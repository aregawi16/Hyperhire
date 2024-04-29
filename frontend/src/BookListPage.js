import React, { useEffect, useState,useRef } from 'react';
import { Card, Container, Row, Col, Button, Form, CardFooter } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutButton from './LogoutButton';
import { faBook, faUser, faTags, faDollarSign } from '@fortawesome/free-solid-svg-icons';

import CartIcon from './CartIcon';
import OrderIcon from './OrderIcon';

const BookListPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSelectedBook, setIsSelectedBook] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const [cart, setCart] = useState([]);
  const userData = localStorage.getItem('user'); // Assume you store user data in localStorage
  const [user, setUser] = useState(JSON.parse(userData));


  // This should be at the top level of your component





  const handleCardClick = (book) => {
    setSelectedBook(book);
    setIsSelectedBook(true)

  };
  const truncateText=(text, maxLength)=> {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  
  const handleAddToCart = (event, book) => {
    event.stopPropagation(); // Prevent the card click event
  
  
  
    if (!isLoggedIn) {
      console.log(isLoggedIn);
      console.log('User not logged in, redirecting to login page');
      navigate('/login'); // Redirect to the login page if not logged in
    } else {
      console.log('Book added to cart:', selectedBook);
 
      console.log(user.customer['id'])
      axios.post('http://127.0.0.1:8000/api/orders', JSON.stringify({
        book_id:selectedBook['id'],
        customer_id:user.customer['id'],
        point:selectedBook['price'],
      }), {
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-TOKEN': csrfToken
        }
      })
        .then(response => {
          // Handle the response data
          // localStorage.setItem('user', JSON.stringify(response.data));

          // console.log(response.data);
          // navigate('/');
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
      setCart([...cart, book]);
      setSelectedBook(null);

      // Add the book to the cart here
      // You might want to update a state, or make an API call to add the book to the cart
    }
  };
  const handleCancel = (event) => {
    event.stopPropagation(); // Prevent the card click event

    console.log('hey');
    setSelectedBook(null);
    setIsSelectedBook(false)
  };


  // Fetch book data from the backend API
  useEffect(() => {
    const fetchBooks = async () => {
      // Make the API request to get book data
      // Replace 'api/book' with your actual backend API endpoint
      const response = await axios.get('http://127.0.0.1:8000/api/books');
      const data = await response.data.data;
      console.log(response.data);

      setBooks(data);
      setIsLoading(false);
    };
    const fetchCarts = async () => {
      // Make the API request to get book data
      // Replace 'api/book' with your actual backend API endpoint
      const response = await axios.get('http://127.0.0.1:8000/api/orders?customer_id='+user.customer['id']);
      const data = await response.data.data;
      setCart(data);

     
    };
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

    fetchBooks();
    if(isLoggedIn)
    {
      fetchOrders();
      fetchCarts();
    }
  
  }, []);

  const handleAddBook = () => {
    // Logic to handle adding a new book
    // You can redirect to the create page or open a modal, etc.
    navigate('/create-book')
    console.log('Add book clicked');
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const observerRef = useRef(null);


  const handleLogin = (values) => {
   
    
    axios.post('http://127.0.0.1:8000/api/customers/login', JSON.stringify(values), {
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-TOKEN': csrfToken
        }
      })
        .then(response => {
          // Handle the response data
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log(response.data);
          navigate('/');
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    console.log('Logged in:', values.email, values.password);
  };
  const handleLogout = () => {
    logout();
};
  
const handleSearch = (event) => {
  const query = event.target.value.toLowerCase();
  setSearchQuery(query);

  if (query.trim() === '') {
    if (books.length !== books.length) {
      setBooks(books);  // Force setting to full list if not already set
    }
  } else {
    const filtered = books.filter(
      book =>
        book.title.toLowerCase().includes(query) ||
        book.writer.toLowerCase().includes(query) ||
        book.tag.toLowerCase().includes(query)
    );
    setBooks(filtered);
  }
};


  return (
    <Container>

 <div style={{ display: 'flex',flexDirection:'row-reverse' }}>
 <div>
            {isLoggedIn ? (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ marginRight: '20px' }}>
                  <CartIcon cartItems={cart} />
              </div>
              <div style={{ marginRight: '20px' }}>
                  <OrderIcon orderedBooks={orders} />
              </div>
          
              <LogoutButton />
          </div>
          
          
            ) : (
                <Link className='btn btn-primary' to='/login'>Login</Link>
            )}
        </div>
</div>

      <Form.Control
      className='p-2'
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleSearch}
      />
 <div style={{ display: 'flex',flexDirection:'row-reverse' }}>
  <div>
    <Link to="/create-book">
      <Button variant="primary" className="my-3 " onClick={handleAddBook}>
        Add Book
      </Button>
    </Link>
  </div>
</div>
<Row className='mt-5' style={{ display: 'flex', justifyContent: 'start' }}>

  {books.map((book, index) => (
       <Col key={index} xs={12} sm={selectedBook===book ? 12 : 6} md={selectedBook===book ? 12 : 4} lg={selectedBook===book ? 12 : 3} 
       
       >
       <Card
      key={index}
      onClick={() => handleCardClick(book)}
      className='p-5 m-1'
      style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}    >      <Card.Img
        variant="top"
        style={{ maxWidth: '127px', maxHeight: '127px' }}
        src={'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg'}
      />
                <Card.Body style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <Card.Text>  <h6>  <FontAwesomeIcon icon={faBook} /> {truncateText(book.title, 20)}</h6>
</Card.Text>
    <Card.Text><FontAwesomeIcon icon={faUser} /> {book.writer}</Card.Text>
    <Card.Text style={{ fontStyle: 'italic' }}><FontAwesomeIcon icon={faTags} /> {book.tag}</Card.Text>
    <Card.Text><FontAwesomeIcon icon={faDollarSign} /> {book.price}</Card.Text>

        {selectedBook === book && (
    <Card.Footer style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button className='mx-5' variant='primary' onClick={handleAddToCart}>
            Add to Cart
        </Button>
        <Button className='mx-5' variant='secondary' onClick={handleCancel}>
            Cancel
        </Button>
    </Card.Footer>
)}

      </Card.Body>
    </Card>
    </Col>
  ))}
</Row>

    </Container>
  );

};

export default BookListPage;