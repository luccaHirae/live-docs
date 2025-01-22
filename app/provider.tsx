'use client';

import React from 'react';
import { LiveblocksProvider } from '@liveblocks/react/suspense';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider authEndpoint={'/api/liveblocks-auth'}>
      {children}
    </LiveblocksProvider>
  );
};

export default Provider;
