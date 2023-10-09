import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./pages/SearchBar";
import Cardlist from "./component/Card/Cardlist";
import Error from "./component/common/Error";
import Loading from "./component/common/Loading";

const App = () => {
  const [searchResult, setSearchResult] = useState("");
  const [searchButtonPress, setSearchButtonPress] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const onSearchChange = async (event) => {
  //   if (event.target.value.trim().length > 2) {
  //     event.preventDefault();
  //     setSearchButtonPress(true);
  //     setIsLoading(true);
  //     fetch(
  //       `https://en.wikipedia.org//w/api.php?origin=*&action=query&format=json&list=search&utf8=1&srsearch=${event.target.value.trim()}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setSearchResult(data.query.search);
  //         setTotalHits(data.query.searchinfo.totalhits);
  //         setIsLoading(false);
  //       })
  //       .catch();
  //   } else {
  //     setSearchResult([]);
  //   }
  // };
  
  const onSearchChange = async (event) => {
    const searchTerm = event.target.value.trim();

    if (searchTerm.length <= 2) {
      setSearchResult([]);
      return;
    }

    setSearchButtonPress(true);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://en.wikipedia.org//w/api.php?origin=*&action=query&format=json&list=search&utf8=1&srsearch=${searchTerm}`
      );

      const { data } = response;
      setSearchResult(data.query.search);
      setTotalHits(data.query.searchinfo.totalhits);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
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
