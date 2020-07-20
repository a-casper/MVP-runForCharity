import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import Header from './components/Header.jsx';
import LoginSignup from './components/Login.jsx';
import Individual from './components/Individual';
import Team from './components/Team.jsx';
import testData from './dummy.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentView: "runner",
      team: testData.team,
      newUser: false,
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
        .then(user => {
            this.setState({
              user: testData.runner,
              username: user.data
            })
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
        .then(user => {
          console.log('signup server responded with:', user);
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
        <Individual currentView={this.state.currentView} user={this.state.user}/>
        <Team currentView={this.state.currentView} user={this.state.user} runners={this.state.team} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));