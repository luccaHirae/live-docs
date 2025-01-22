'use client';

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import React from 'react';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import { UserButton } from '@clerk/nextjs';
import { Editor } from '@/components/editor/Editor';

const CollaborativeRoom = () => {
  return (
    <RoomProvider id='my-room'>
      <ClientSideSuspense fallback={<Loader />}>
        <div className='collaborative-room'>
          <Header>
            <div className='flex w-fit items-center justify-center gap-2'>
              <p className='document-title'>Share</p>
            </div>

            <UserButton />
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
