import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
       
<nav class="navbar navbar-light bg-dark">
  <span class="navbar-brand mb-0 h1"><button type="button" class="btn btn-light btn-lg"><Link to='/'>Bloc Jams</Link></button></span>
  <button type="button"  class="btn btn-outline-light" ><Link to='/library'> Library</Link></button>
  
</nav>
            

           <h1>Bloc Jams</h1>
         </header>
            <main>
           <Route exact path="/" component={Landing} />
           <Route path="/library" component={Library} />
            <Route path="/album/:slug" component={Album} />
         </main>


      </div>
    );
  }
}

export default App;
