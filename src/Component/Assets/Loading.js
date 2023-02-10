import React from 'react';
import logo from './loading.gif'
import './Loading.css';

const Loading = () => {
    return(
        <div className="loading center">
            <img 
                className="center2" 
                src={logo} 
                alt="Loading"
            />             
        </div>
    );
};

export default Loading;
