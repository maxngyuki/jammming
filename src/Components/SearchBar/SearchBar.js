import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(e){
        this.search(e.target.value);
    }

    search(term){
        this.props.onSearch(term);
    }
    
    render(){
        return(
            <div className="SearchBar">
                <div className="input-container">
                    <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                    <button className="SearchButton">SEARCH</button>
                </div>
            </div>
        );
    }
}