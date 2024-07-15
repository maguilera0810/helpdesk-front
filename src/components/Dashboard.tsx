// src/components/Dashboard.tsx
import React from 'react';
import useIsClient from '../hooks/useIsClient';
import useAuthStore from '../stores/useAuthStore';

const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const isClient = useIsClient();

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.firstName}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
