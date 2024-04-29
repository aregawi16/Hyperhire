import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const OrderIcon = ({ orderedBooks }) => {
    const navigate = useNavigate();

    const handleOrders = () => {
        navigate('/my-order'); // Adjust this route to wherever the user views their ordered books
    };

    return (
        <div style={{ position: 'relative', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faBook} />
            {orderedBooks.length > 0 && (
                <span style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'blue', // Changed from red to blue for differentiation
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                }}
                onClick={handleOrders}>
                    {orderedBooks.length}
                </span>
            )}
        </div>
    );
};

export default OrderIcon;
