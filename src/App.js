import React from 'react';
import ChuckIsReady from './ChuckIsReady';
import { Provider } from 'react-redux';
import store from './store/store';


function App() {

      
console.log('Hello')
  
  return (
    <Provider store={store}> 
    <ChuckIsReady/>
    </Provider>
  );
}

export default App;
