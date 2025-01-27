import Image from 'next/image';
import React, { useState } from 'react';
import UserTypeSelector from '@/components/UserTypeSelector';
import { Button } from '@/components/ui/button';
import {
  removeCollaborator,
  updateDocumentAccess,
} from '@/lib/actions/room.actions';

const Collaborator = ({
  roomId,
  creatorId,
  collaborator,
  email,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || 'viewer');
  const [loading, setLoading] = useState(false);

  const handleShareDocument = async (type: string) => {
    try {
      setLoading(true);

      await updateDocumentAccess({
        roomId,
        email,
        userType: type as UserType,
        updatedBy: user,
      });
    } catch (error) {
      console.error('Failed to update user type', error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveCollaborator = async (email: string) => {
    try {
      setLoading(true);

      await removeCollaborator({
        roomId,
        email,
      });
    } catch (error) {
      console.error('Failed to remove collaborator', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className='flex items-center justify-between gap-2 py-3'>
      <div className='flex gap-2'>
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className='size-9 rounded-full'
        />

        <div>
          <p className='line-clamp-1 text-sm font-semibold leading-4 text-white'>
            {collaborator.name}{' '}
            <span className='text-10-regular pl-2 text-blue-100'>
              {loading && 'updating...'}
            </span>
          </p>

          <p className='text-sm font-light text-blue-100'>
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className='text-sm text-blue-100'>Owner</p>
      ) : (
        <div className='flex items-center'>
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={handleShareDocument}
          />

          <Button
            type='button'
            onClick={() => handleRemoveCollaborator(collaborator.email)}
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
