import React, { Component } from 'react';
import NavSearch from '../navbar/NavSearch';
import SearchList from './SearchList';


class Search extends Component {

    render() {
        return (
            <div>
                <NavSearch />
                <SearchList />
            </div>
        )
    }
}

export default Search;