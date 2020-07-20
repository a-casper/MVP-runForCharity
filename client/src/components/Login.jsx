import React from 'react';
import styles from '../styles/login.css'


export default function LoginSignup({user , newUser, toggleNewUser, handleSubmit, formData, handleFormChange}) {

  if( user === null && !newUser ) {
    return (
      <form onSubmit={(e) => {handleSubmit(e, 'login')}} className={styles.loginForm}>
        <div>
          <label className={styles.loginLabel}>Username: </label>
          <input value={formData.username} onChange={(e) => handleFormChange(e)} name="username" className={styles.loginInput} type="text"></input>
        </div>
        <div>
          <label className={styles.loginLabel}>Password: </label>
          <input value={formData.password} onChange={(e) => handleFormChange(e)} name="password" className={styles.loginInput} type="password"></input>
        </div>
        <button>Login</button>
        <div>Dont have an account? <a onClick={toggleNewUser}>Sign Up!</a></div>
      </form>
    );
  } else if ( user === null && newUser ) {
    return (
      <form onSubmit={(e) => {handleSubmit(e, 'signup')}} className={styles.loginForm}>
        <div>
          <label className={styles.loginLabel}>Username: </label>
          <input value={formData.username} onChange={(e) => handleFormChange(e)} name="username" className={styles.loginInput} type="text"></input>
        </div>
        <div>
          <label className={styles.loginLabel}>Password: </label>
          <input value={formData.password} onChange={(e) => handleFormChange(e)} name="password" className={styles.loginInput} type="password"></input>
        </div>
        <div>
          <label className={styles.loginLabel}>Full Name: </label>
          <input value={formData.name} onChange={(e) => handleFormChange(e)} name="name" className={styles.loginInput} type="name"></input>
        </div>
        <div>
          <label className={styles.loginLabel}>Birth Date: </label>
          <input value={formData.birthDate} onChange={(e) => handleFormChange(e)} name="birthDate" className={styles.loginInput} type="date"></input>
        </div>
        <button>Sign Up</button>
        <div>Back to login page:<a onClick={toggleNewUser}>Login!</a></div>
      </form>
    );
  } else {
    return null;
  }

}