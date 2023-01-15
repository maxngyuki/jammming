import React from 'react';
import './SearchResults.css';
import '../..TrackList/TrackList';

export class SearchResults extends React.Component{
    render(){
        return(
            <div className="SearchResults">
            <h2>Results</h2>
            <TrackList />
            </div>
        );
    }
}