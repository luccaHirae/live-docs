'use client';

import Image from 'next/image';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import ActiveCollaborators from '@/components/ActiveCollaborators';
import ShareModal from '@/components/ShareModal';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import { UserButton } from '@clerk/nextjs';
import { Editor } from '@/components/editor/Editor';
import { Input } from '@/components/ui/input';
import { updateDocument } from '@/lib/actions/room.actions';

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  currentUserType,
  users,
}: CollaborativeRoomProps) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentTItle, setDocumentTItle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLoading(true);

      try {
        if (documentTItle !== roomMetadata.title) {
          const updatedDocument = await updateDocument({
            roomId,
            title: documentTItle,
          });

          if (updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.error('Failed to update title', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument({
          roomId,
          title: documentTItle,
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [documentTItle, roomId]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className='collaborative-room'>
          <Header>
            <div
              ref={containerRef}
              className='flex w-fit items-center justify-center gap-2'
            >
              {editing && !loading ? (
                <Input
                  type='text'
                  value={documentTItle}
                  ref={inputRef}
                  placeholder='Enter title'
                  onChange={(e) => setDocumentTItle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className='document-title-input'
                />
              ) : (
                <>
                  <p className='document-title'>{documentTItle}</p>
                </>
              )}

              {currentUserType === 'editor' && !editing && (
                <Image
                  src='/assets/icons/edit.svg'
                  alt='edit'
                  width={24}
                  height={24}
                  onClick={() => setEditing(true)}
                  className='cursor-pointer'
                />
              )}

              {currentUserType !== 'editor' && !editing && (
                <p className='view-only-tag'>View only</p>
              )}

              {loading && <p className='text-sm text-gray-400'>Saving...</p>}
            </div>

            <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
              <ActiveCollaborators />

              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />

              <UserButton />
            </div>
          </Header>

          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
