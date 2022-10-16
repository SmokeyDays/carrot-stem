import React from 'react';
import './App.css';
import { MainPage } from './pages/MainPage';
import { ErrorPage } from './pages/ErrorPage';
import { FamilyPage } from './pages/FamilyPage';
import { MusterPage } from './pages/MusterPage';
import { BallotPage } from './pages/BallotPage';

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
  setPage(val: string) {
    this.setState({
      page: val,
    })
  }
  render() {
    // console.log(this.state);
    switch(this.state.page) {
      case "MainPage": {
        return <MainPage setPage = {this.setPage.bind(this)}/>
      }
      case "FamilyPage": {
        return <FamilyPage/>
      }
      case "MusterPage": {
        return <MusterPage/>
      }
      case "BallotPage": {
        return <BallotPage/>
      }
      default: {
        return <ErrorPage message = "Error: Page Not Found"/>
      }

    }
  }
}

export default App;
