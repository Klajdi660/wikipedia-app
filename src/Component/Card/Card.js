import React from 'react';
import './Card.css';

const Card = (props) => {
    const directLink = `https://en.wikipedia.org/?curid=${props.pageid}`;
    return(
        // get on internet dangerouslySetInnerHTML={{__html: props.snippet}} 
        <div className="center grow card">
            <article className="grow center wrapper">
                <h1 className="card-title">{props.title}</h1>
                <div className="paragraph">
                    <p dangerouslySetInnerHTML={{__html: props.snippet}} className="paragraph-title"></p> 
                </div>
                <a className="readMore-btn" src={directLink} target="blank">Read More</a>
            </article>
        </div>  
    );
}

export default Card;
