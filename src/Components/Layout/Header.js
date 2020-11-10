import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Calender</h1>
            <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/About">About</Link>
        </header>
    )
}

const headerStyle = {
    width: '100%',
    height: '10%',
    background: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
}

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
    
}

export default Header;
