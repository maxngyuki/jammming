import React from 'react';
import './Playlist.css';
import '../..TrackList/TrackList';

export class Playlist extends React.Component{
    render(){
        retrun (
            <div className="Playlist">
                <input defaultvalue= {'New Playlist'}/>
                <TrackList />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}