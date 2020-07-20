import React from 'react';
import Runner from './Runner.jsx';

export default function Team({ currentView, user, runners }) {

  if (currentView !== "team") {
    return null;
  }

  return (
    <div>
      {runners.map(runner => {
        return <Runner key={runner.id} runner={runner} />
      })}
    </div>
  );
}