import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';




class Album extends Component {
  
constructor(props) {
     super(props);
const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });
     
     this.state = {
       album: album,
       currentSong: album.songs[0],
       currentTime: 0,
       currentVolume: 0.5, 
       duration: album.songs[0].duration, 
       isPlaying: false,
       isHovered: false
       
     };
     

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;

   }

   componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeControl: e=> {
        this.setState({currentVolume: this.audioElement.volume});
      }

      
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeControl' , this.eventListeners.volumeControl)
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeControl' , this.eventListeners.volume)
  }

   play(){
      this.audioElement.play();
      this.setState({isPlaying: true});
   }
   handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleForClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
    
  volumeControl(e){
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({currentVolume: newVolume});
  }



   pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
    
  }   
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }
  handleSongClick(song) {
  const isSameSong = this.state.currentSong === song;
  if (this.state.isPlaying && isSameSong) {
    this.pause();
  } else {
    if (!isSameSong) { this.setSong(song); } 
    this.play();
  }
  }
  formatTime(time){
    if (time === undefined){
      return '-:--';
    }
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    minutes = minutes.toString();
     if (seconds < 10) {
      seconds = Math.floor(seconds.toString());
      return minutes + ":0" + seconds;
    } else {
      seconds = Math.floor(seconds.toString());
      return minutes + ":" + seconds;
    }
    
    
  }
  songPlaying(song)  {
    return this.state.currentSong === song && this.state.isPlaying;
  }






   render(){
    return  (
        <section className="album">
          <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
             
              
           </div>
         </section>
 

        <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>  
           <tbody>
                {
                  
                    this.state.album.songs.map((song, index) => {

                        return (
                          
                            <tr className = "song" key = {index} onClick = {()=> this.handleSongClick(song)  }                
                               onMouseEnter={() => this.setState({isHovered: index+1})}
                            onMouseLeave={() => this.setState({isHovered: false})}> 
                                   

                            <td className = "pausePlay" >
                    
                            <button >                           
                              
                            { (this.state.currentSong.title === song.title) ?
                        <span className={this.state.isPlaying ? "icon ion-md-pause" :  "icon ion-md-arrow-dropright-circle"}></span>
                        :
                        (this.state.isHovered === index+1) ?
                        <span className= "icon ion-md-arrow-dropright-circle" ></span>
                        :
                        <span className="song-number">{index+1}</span>}
                              
                            </button> 
                            
                            </td>
                            
                           
                            <td className = "songTitle">{song.title}</td>
                            <td className = "songDuration">{song.duration}</td>
                            </tr>
                        )
                    })
                }
           </tbody>
         </table>
         <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleForClick={()=>this.handleForClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           volumeControl={(e) => this.volumeControl(e)}
           formatTime ={(time) => this.formatTime(time)}
         />
         
       </section>
     );
   }
}

export default Album;