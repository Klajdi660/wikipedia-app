import React, { Component } from 'react';
import SearchBar from './Component/SearchBar/SearchBar';
import Cardlist from './Component/Card/Cardlist';
import Error from './Component/Assets/Error';
import Loading from './Component/Assets/Loading';

class App extends Component {
  constructor() {
    super()
    this.state = {
      SearchResult : '',
      searchbuttonpress: false,
      totalhits: null,
      isLoading: false
    }
  }

  onsearchChange = (event) => {
    if(event.target.value.trim().length > 2) 
    { event.preventDefault();  
      this.setState({
        searchbuttonpress: true,               
        isLoading: true
      })
      fetch(`https://en.wikipedia.org//w/api.php?origin=*&action=query&format=json&list=search&utf8=1&srsearch=${event.target.value.trim()}`)
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            SearchResult : data.query.search,
            totalhits: data.query.searchinfo.totalhits,
            isLoading: false
          })
        }

      )
      .catch();
    }
    else this.setState({ SearchResult: [] });
  }

  render () {
    if (this.state.totalhits === 0) {
      return(
        <div>
          <SearchBar searchChange={this.onsearchChange}/>
          <Error/>
        </div>
      );
    }
    if(this.state.searchbuttonpress) {
      if(this.state.isLoading) {
        return(
          <div>
            <SearchBar searchChange={this.onsearchChange}/>
            <Loading/>
          </div>
        );
      } else {
        return(
          <div>
            <SearchBar searchChange={this.onsearchChange}/>
            <Cardlist SearchResult={this.state.SearchResult}/>
          </div>
        );
      }
    }
    return(
      <div>
        <SearchBar searchChange={this.onsearchChange}/>
      </div>
    );
  }
}

export default App;

// import React, { useState } from 'react';
// import SearchBar from './Component/SearchBar/SearchBar';
// import Cardlist from './Component/Card/Cardlist';
// import Error from './Component/Assets/Error';
// import Loading from './Component/Assets/Loading';

// const App = () => {
//   const [searchResult, setSearchResult] = useState('');
//   const [searchButtonPress, setSearchButtonPress] = useState(false);
//   const [totalHits, setTotalHits] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const onSearchChange = (event) => {
//     if (event.target.value.trim().length > 2) {
//       event.preventDefault();
//       setSearchButtonPress(true);
//       setIsLoading(true);
//       fetch(
//         `https://en.wikipedia.org//w/api.php?origin=*&action=query&format=json&list=search&utf8=1&srsearch=${event.target.value.trim()}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setSearchResult(data.query.search);
//           setTotalHits(data.query.searchinfo.totalhits);
//           setIsLoading(false);
//         })
//         .catch();
//     } else {
//       setSearchResult([]);
//     }
//   };

//   return (
//     <div>
//       <SearchBar searchChange={onSearchChange} />
//       {totalHits === 0 && (
//         <Error />
//       )}
//       {searchButtonPress && (
//         isLoading ? (
//           <Loading />
//         ) : (
//           <Cardlist SearchResult={searchResult} />
//         )
//       )}
//     </div>
//   );
// };

// export default App;
