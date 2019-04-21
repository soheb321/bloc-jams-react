import React, { Component } from 'react';
import './styles/playerbar.css';
 
 class PlayerBar extends Component {
   render() {
     return (


      
       <section className="player-bar">
 <section id="volume-control">

<div className="icon ion-md-volume-low">{this.props.currentVolume}</div>
<input type="range" className="seek-bar" value={this.props.currentVolume} 
max = "1"
min = "0"
step = ".01"
onChange =  {this.props.volumeControl}

/>
<div className="icon ion-md-volume-high"></div>
</section>

       <section id="time-control">
<div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
  <input 
    type="range" 
    className="seek-bar" 
    value={(this.props.currentTime / this.props.duration) || 0} 
    max="1" 
    min="0" 
    step="0.01" 
    onChange={this.props.handleTimeChange}
  />   
  <div className="total-time">{this.props.formatTime(this.props.duration)}</div> 
</section>
         <section id="buttons">
         <button id="previous" onClick={this.props.handlePrevClick}>
             <span className="icon ion-md-skip-backward"></span>
           </button>
           <button id="play-pause" onClick={this.props.handleSongClick} >
           <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-arrow-dropright-circle'}></span>
           </button>
           <button id="next" onClick={this.props.handleForClick}>
             <span className="icon ion-md-skip-forward"></span>
           </button>
         </section>

       </section>
     );
   }
 }
 
 export default PlayerBar;
