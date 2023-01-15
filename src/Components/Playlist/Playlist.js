import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);

    }

    handleNameChange(e){
        this.props.onNameChange(e.target.value);
    }
    
    render(){
        retrun (
            <div className="Playlist">
                <input defaultvalue= {'New Playlist'} onChange={this.handleNameChange}/>
                <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}