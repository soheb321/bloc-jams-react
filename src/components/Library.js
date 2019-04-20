import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import '/Users/sieger/Desktop/Bloc/bloc-jams-react/src/styles/library.css';

class Library extends Component { 
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }
 
    render() {
        return ( 
            <section className='library'>
                {
                      this.state.albums.map((album, index) => 
                        <Link to={`/album/${album.slug}`} key={index}><div className = "slot"></div>
                          <img className ="albumArt" src={album.albumCover} alt={album.title} />
                           <div><button type="button" class="btn btn-primary btn-lg active">{album.title}</button></div>

                           <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         About Album
                         </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                         <a class="dropdown-item" href="#">Artist: {album.artist}</a>
                            <a class="dropdown-item" href="#">{album.songs.length} songs in the album</a>
                            </div>
                            </div> 
                        </Link> 
                        )
                }
            </section>
        );
    }
 }

export default Library;