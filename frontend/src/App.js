import React, { Component } from 'react';
import NavBar from './component/navbar/NavBar';
import Search from './component/search/Search';
import Home from './component/home/Home';
import Product from './component/product/Product';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <BrowserRouter >
          <MuiThemeProvider>
            <div>
              <NavBar />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/search' component={Search} />
                <Route path='/product/:slug' component={Product}/>
              </Switch>
            </div>
          </MuiThemeProvider> 
        </BrowserRouter>  
      </Provider>   
    );
  }
}

export default App;
