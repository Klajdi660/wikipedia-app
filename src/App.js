import React, { useState } from "react";
import SearchBar from "./pages/SearchBar";
import Cardlist from "./component/Card/Cardlist";
import Error from "./component/common/Error";
import Loading from "./component/common/Loading";

const App = () => {
  const [searchResult, setSearchResult] = useState("");
  const [searchButtonPress, setSearchButtonPress] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSearchChange = (event) => {
    if (event.target.value.trim().length > 2) {
      event.preventDefault();
      setSearchButtonPress(true);
      setIsLoading(true);
      fetch(
        `https://en.wikipedia.org//w/api.php?origin=*&action=query&format=json&list=search&utf8=1&srsearch=${event.target.value.trim()}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResult(data.query.search);
          setTotalHits(data.query.searchinfo.totalhits);
          setIsLoading(false);
        })
        .catch();
    } else {
      setSearchResult([]);
    }
  };

  return (
    <>
      <SearchBar searchChange={onSearchChange} />
      {totalHits === 0 && (
        <Error />
      )}
      {searchButtonPress && (
        isLoading ? (
          <Loading />
        ) : (
          <Cardlist SearchResult={searchResult} />
        )
      )}
    </>
  );
};

export default App;
