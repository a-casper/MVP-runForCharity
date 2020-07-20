import React from 'react';

export default function Runs({ currentView, user, runs }) {

  if (currentView !== "runs" || user === null) {
    return null;
  }

  let runView = runs.map((run, index) => {
    return (
      <div key={index} className="item-runner">
        <div className="item-runnerInfo">
          <p>Date Logged: {new Date(run.runDate).toLocaleString()}</p>
        </div>
        <div className="item-runnerStats">
          <div>
            <span>{`Distance in Miles: ${run.miles}`}</span>
          </div>
          <div>
            <span>{`Total Time: ${run.formatted}`}</span>
          </div>
          <div>
            <span>{`Overall Pace: ${run.pace} MPH`}</span>
          </div>
        </div>
      </div>
    );
  })

  return (
    <>
      <h2>{user.name} Run History</h2>
      {runView}
    </>
  )

}