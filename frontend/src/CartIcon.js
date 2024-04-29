import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const CartIcon = ({ cartItems }) => {
    const navigate = useNavigate();

    const handleCart = (event) => {
        navigate('my-cart');
    }
    return (

        <div style={{ position: 'relative', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItems.length > 0 && (
                <span style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    cursor:'pointer'
                    
                }}
                onClick={handleCart}>
                    {cartItems.length}
                </span>
            )}
        </div>
    );
};

export default CartIcon;
