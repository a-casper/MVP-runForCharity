import React from 'react';

export default function Individual({ currentView, user, team, runs, miles, time, pace }) {

  if (currentView !== "runner" || user === null) {
    return null;
  }

  let charity = <button>Sign up For a Team to run for Charity!</button>

  if(user.teamId !== null) {
    charity =
      <div>
        <h6>{team.charity}</h6>
        <p>{user.pledge}</p>
      </div>;
  }

  return (
    <div className="item-runner">
      <div className="item-runnerInfo">
        <img className="item-runningIcon" src="./missing.jpg" alt="icon goes here"></img>
        <div className="item-runnerName">
          <h5>{user.name}</h5>
          <h6>{user.teamName}</h6>
          <button>Log New Run</button>
        </div>
        <div>
          {charity}
        </div>
      </div>
      <div className="item-goalTracker">
        {user.goal === 0 ? <button>Set a goal to track monthly progress!</button> : <span>{`${miles} out of ${user.goal}`}</span>}
      </div>
      <div className="item-runnerStats">
        <div>
          <span>{`Distance in Miles: ${miles}`}</span>
        </div>
        <div>
          <span>{`Total Time: ${time}`}</span>
        </div>
        <div>
          <span>{`Overall Pace: ${pace} MPH`}</span>
        </div>
      </div>
    </div>
  );
}