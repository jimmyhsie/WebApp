import React, { Component } from 'react'
import Main from './component/main' 
import ToolBar from './component/toolbar'
import Featuremodal from './component/featuremodal'
import Blogmodal from './component/blogmodal'
import ExplainPage from './component/explainPage'
import {createStore} from 'redux'
import { Provider } from "react-redux";
import allReducers from './reducers/index';
import SideBar from './component/sidebar';

let store = createStore(allReducers,/* preloadedState, */  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//console.log(store.getState())
class App extends Component {
    

  
  
  

  
  


  render() {
    return (
      <Provider store={store}>
    <div> 
      <ExplainPage/>
      <ToolBar/>
      <SideBar/>
      <Featuremodal />
      <Blogmodal/>
      <Main />
    </div>  
    </Provider>  
    )
  }
}

export default App
