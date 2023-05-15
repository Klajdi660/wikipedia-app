import React from 'react';
import logo from './WikiLogo.gif';
import './SearchBar.css';

const SearchBar = ({ searchChange }) => {
    return(
        <div className='search-container'>
            <img className="center wiki" src={logo} alt="WikiLogo" />
            <h1 className="title"><span>W</span>ikipedi<span>a</span></h1> 
            <form className="search-form">
                <input 
                    onChange={searchChange}  
                    type="text" 
                    className="search-field" 
                    placeholder="What are you looking for?" 
                />
                <button type="submit" className="button-search">
                    <i className="fa fa-search"></i>
                </button>
            </form> 
        </div>
    );
};

export default SearchBar;
