'use client';

import React from 'react';
import { LiveblocksProvider } from '@liveblocks/react/suspense';
import { getClerkUsers } from '@/lib/actions/user.actions';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint={'/api/liveblocks-auth'}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });

        return users;
      }}
    >
      {children}
    </LiveblocksProvider>
  );
};

export default Provider;
