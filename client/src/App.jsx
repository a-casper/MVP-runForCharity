import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import Header from './components/Header.jsx';
import LoginSignup from './components/Login.jsx';
import Individual from './components/Individual';
import Team from './components/Team.jsx';
import Runs from './components/Runs.jsx';
import testData from './dummy.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentView: "runner",
      team: testData.team,
      newUser: false,
      userRuns: [],
      userMiles: 0,
      userTime: '00:00:00',
      userPace: 0.0,
      formData: {
        username: '',
        password: '',
        name: '',
        birthDate: ''
      }
    }

    this.handleTabChange = this.handleTabChange.bind(this);
    this.toggleNewUser = this.toggleNewUser.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleTabChange(e) {
    console.log(e.target.value)
    this.setState({
      currentView: e.target.value
    })
  }

  toggleNewUser() {
    this.setState({
      newUser: !this.state.newUser
    })
  }

  handleFormChange(e) {
    let newFormData = Object.create(this.state.formData);
    newFormData[e.target.name] = e.target.value;
    this.setState({
      formData: newFormData
    })
  }

  handleAuth(e, type) {
    e.preventDefault();
    if(type === 'login') {
      Axios
        .post('/login', {
          username: this.state.formData.username,
          password: this.state.formData.password
        })
        .then(userInfo => {
          console.log("retrived info:", userInfo)
          this.generateUser(userInfo.data[0], userInfo.data[1], userInfo.data[3]);
            // this.setState({
            //   user: userInfo.data[0],
            //   userRuns: userInfo.data[1],
            //   team: userInfo.data[3] || null
            // })
        })
        .catch(err => {
          alert("Username and Password do not match");
        })
    } else {
      Axios
        .post('/signup', {
          username: this.state.formData.username,
          password: this.state.formData.password,
          name: this.state.formData.name,
          birthDate: this.state.formData.birthDate
        })
        .then(response => {
          let user =  response.data[0];
          this.setState({
            user
          })
          //console.log('signup server responded with:', user);
        })
        .catch(err => {
          console.error('error with sign-up', err);
        })
    }

    this.setState({
      formData: {
        username: '',
        password: '',
        name: '',
        birthDate: ''
      }
    })

  }

  generateUser(user, runs, team) {
    //format the time and calulate total miles based of runs
    let totalMiles = 0;
    let totalTime = 0;
    runs.forEach(run => {
      totalMiles += run.miles;
      totalTime += run.time;

      let hours = Math.floor(run.time / 60 / 60);
      let minutes = Math.floor(run.time / 60) - (hours * 60);
      let seconds = run.time % 60;

      run.formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
      run.pace = (run.miles / (run.time / 60 /60)).toFixed(2);
    })

    let hours = Math.floor(totalTime / 60 / 60);
    let minutes = Math.floor(totalTime / 60) - (hours * 60);
    let seconds = totalTime % 60;
    let formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

    this.setState({
      user,
      userRuns: runs,
      userMiles: totalMiles,
      userTime: formatted,
      userPace: (totalMiles / (totalTime / 60 / 60)).toFixed(2)
    })
  }

  render() {
    return(
      <div className="container">
        <Header handleTabChange={this.handleTabChange} />
        <LoginSignup
        user={this.state.user}
        newUser={this.state.newUser}
        toggleNewUser={this.toggleNewUser}
        handleSubmit={this.handleAuth}
        handleFormChange={this.handleFormChange}
        formData={this.state.formData}
        />
        <Individual
        currentView={this.state.currentView}
        user={this.state.user}
        team={this.state.team}
        runs={this.state.userRuns}
        miles={this.state.userMiles}
        time={this.state.userTime}
        pace={this.state.userPace}
        />
        <Team
        currentView={this.state.currentView}
        user={this.state.user}
        runners={this.state.team}
        />
        <Runs
        currentView={this.state.currentView}
        user={this.state.user}
        runs={this.state.userRuns}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));