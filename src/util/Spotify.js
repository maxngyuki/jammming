let accessToken;
let expiresIn;
const redirectUrl = 'http://localhost:3000/';
const clientId = '';
const spotifyUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
export const Spotify = {getAccessToken : () => {
        if(accessToken){
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if(urlAccessToken && urlExpiresIn){
            accessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else{
            window.location = spotifyUrl;
        }
                
    },
    savePlaylist: (name, trackUris) => {
        if(name && trackUris){
            const headers = {Authorization: `Bearer ${accessToken}`}
            let playlistId = '';
            let userId = '';
            fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json())
            .then(jsonResponse => userId = jsonResponse.id)
            .then(() => {
              const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
              fetch(createPlaylistUrl, {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify({
                    name: name
                  })
                }).then(response => response.json())
                .then(jsonResponse => playlistId = jsonResponse.id)
                .then(() => {
                  const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
                  fetch(addPlaylistTracksUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                      uris: trackUris
                    })
                  });
                })
                .catch(error => {
                    console.log(error)
                })
            })
          }
        else{
            return;
        }
    },
    search: function(term){
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.tracks ? jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            }) : []
        })
        .catch(error => {
            console.log(error)
        })
    }
};