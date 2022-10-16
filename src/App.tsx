import React from 'react';
import './App.css';
import { MainPage } from './pages/MainPage';
import { ErrorPage } from './pages/ErrorPage';

interface AppState {
  page: string
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: "MainPage"
    };
    
    console.log(this);
  }
  render() {
    // console.log(this.state);
    switch(this.state.page) {
      case "MainPage": {
        return <MainPage/>
      }
      default: {
        return <ErrorPage message = "Error: Page Not Found"/>
      }

    }
  }
}

export default App;
