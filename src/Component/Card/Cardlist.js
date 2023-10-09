import React from "react";
import Card from "./Card";

const Cardlist = ({ SearchResult }) => {
    return (
        <div>
            {SearchResult.slice(0, 5).map((item, key) => {
                return (
                    <Card 
                        key={key} 
                        id={item.id}
                        title={item.title}
                        snippet={item.snippet}
                        pageId={item.pageid}
                    />
                )})
            }
        </div>
    );
};

export default Cardlist;
