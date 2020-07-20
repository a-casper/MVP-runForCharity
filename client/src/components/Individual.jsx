import React from 'react';
import Runner from './Runner.jsx';

export default function Individual({ currentView, user }) {

  if (currentView !== "runner" || user === null) {
    return null;
  }

  return (
    <Runner runner={user} />
  );
}