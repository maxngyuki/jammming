import React from 'react';
import './App.css';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Spotify} from '../../util/Spotify';

class App extends React.Component{
    constructor (props) {
        super(props);
        this.state = {searchResults: [], playlistNmae: '', playlistTracks: []};
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);

    }

    addTrack(track){
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
          }else {
           this.setState({playlistTracks: [...this.state.playlistTracks, track]})
          }
    }

    removeTrack(track){
        this.setState({
         playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
       });     
    }

    savePlaylist(){
        const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
        Spotify.savePlaylist(this.state.playlistName, trackUris);
        this.setState({playlistName: 'New Playlist', playlistTracks: []})
        alert('Playlist Saved')
    }

    search(searchName){
        Spotify.search(searchName).then(searchResults => {
          this.setState({searchResults: searchResults})
        })
    }

    updatePlaylistName(name){
        this.setState({playlistName: name});
    }

    render(){
        return (
            <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={this.search}/>
                <div className="App-playlist">
                <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
                <Playlist onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
                </div>
            </div>
            </div>
        );
    }
}

export default App;