import React from 'react';

export default function Header({ handleTabChange }) {
  return (
    <header className="container-header">
      <h1 className="item-title">Run Across ...?</h1>
      <div className="item-login">
        <button>login</button>
        <button>signup</button>
      </div>
      <table className="item-nav">
        <tbody>
          <tr>
            <td><button value="runner" onClick={(e) => {handleTabChange(e)}}>Individual Results</button></td>
            <td className="center"><button value="team" onClick={(e) => {handleTabChange(e)}}>Team Results</button></td>
            <td><button value="runs" onClick={(e) => {handleTabChange(e)}}>Individual Run History</button></td>
          </tr>
        </tbody>
      </table>
    </header>
  );
}