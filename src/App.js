import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import Logo from './bloc-jams.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          
       
<nav class="navbar navbar-light bg-dark">
<a class="navbar-brand">
    <Link to='/' ><img src={Logo} width="100" height="100"  class="d-inline-block align-top" alt="">
    </img></Link>
  </a>
  <button type="button"  class="btn btn-light btn-lg"><Link to='/library'> Library</Link></button>
  
</nav>

           
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
