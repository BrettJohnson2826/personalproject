import React, { Component } from 'react';
import './App.css';
import './reset.css'
import { Route, Switch, Link } from 'react-router-dom'
import Home from './components/home/home'
import Longboard from './components/longboards/longboards'
import Cart from './components/cart/cart'
import logo from './logo.png'





class App extends Component {
  
   

  render() {

    
    return (
     
     <div className="App">
     
         <div className='logoholder'>
           
           <img className='logo' src={logo} alt='logo'/>

        </div>
       
        <div className='navBar'>
     
        
           
        
           <ul>
           <a href={ process.env.REACT_APP_LOGOUT }><button className='logout'>Logout</button></a>
          
           <Link to='/cart'><button className='cart'>Cart</button></Link>
           <Link to ='/longboards'><button className='longboards'>Boards</button></Link> 
           <a href={ process.env.REACT_APP_LOGIN }><button className='myaccount'>Account</button></a>
           <Link to='/'><button className='home'>Home</button></Link>
          </ul>
     
            
     
        </div>
           
      
        <div className='longboard'>
     
          <Switch>
     
            <Route path='/longboards' component={ Longboard } />
     
          </Switch>
        
        </div>
     
        <Switch>
     
            <Route exact path='/' component={ Home } />
     
            <Route path='/cart' component={ Cart } />
        
           </Switch> 
     
    
        
       
      
      </div>
    );
  }
}

export default App;
