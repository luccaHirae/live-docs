'use client';

import React from 'react';
import { LiveblocksProvider } from '@liveblocks/react/suspense';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { useUser } from '@clerk/nextjs';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <LiveblocksProvider
      authEndpoint={'/api/liveblocks-auth'}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: user?.emailAddresses[0].emailAddress,
          text,
        });

        return roomUsers;
      }}
    >
      {children}
    </LiveblocksProvider>
  );
};

export default Provider;
