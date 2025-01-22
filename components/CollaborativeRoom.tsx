'use client';

import React from 'react';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import ActiveCollaborators from '@/components/ActiveCollaborators';
import { Editor } from '@/components/editor/Editor';
import { UserButton } from '@clerk/nextjs';

const CollaborativeRoom = ({ roomId }: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className='collaborative-room'>
          <Header>
            <div className='flex w-fit items-center justify-center gap-2'>
              <p className='document-title'>Share</p>
            </div>

            <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
              <ActiveCollaborators />
              <UserButton />
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
