import React from 'react';

export default function User({runner}) {
  return (
    <div className="item-runner">
      <div className="item-runnerInfo">
        <img className="item-runningIcon" src="./missing.jpg" alt="icon goes here"></img>
        <div className="item-runnerName">
          <h5>{runner.name}</h5>
          <h6>{runner.teamName}</h6>
          <button>Log New Run</button>
        </div>
        <div>
          <h6>{runner.charity}</h6>
          <p>{runner.pledge}</p>
        </div>
      </div>
      <div className="item-goalTracker">
        <span>{`${runner.miles} out of ${runner.goal}`}</span>
      </div>
      <div className="item-runnerStats">
        <div>
          <span>{`Distance in Miles: ${runner.miles}`}</span>
        </div>
        <div>
          <span>{`Total Time: ${runner.time}`}</span>
        </div>
        <div>
          <span>{`Overall Pace: ${runner.miles} / ${runner.time}`}</span>
        </div>
      </div>
    </div>
  );
}