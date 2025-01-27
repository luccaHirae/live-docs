'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSelf } from '@liveblocks/react/suspense';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import UserTypeSelector from '@/components/UserTypeSelector';
import Collaborator from '@/components/Collaborator';
import { updateDocumentAccess } from '@/lib/actions/room.actions';

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('viewer');

  const handleShareDocument = async () => {
    try {
      setLoading(true);

      await updateDocumentAccess({
        roomId,
        email,
        userType,
        updatedBy: user.info,
      });
    } catch (error) {
      console.error('Failed to share document', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className='gradient-blue flex h-9 gap-1 px-4'
          disabled={currentUserType !== 'editor'}
        >
          <Image
            src='/assets/icons/share.svg'
            alt='share'
            width={20}
            height={20}
            className='min-w-4 md:size-5'
          />

          <p className='mr-1 hidden sm:block'>Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className='shad-dialog'>
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can view or edit this document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor='email' className='mt-6 text-blue-100'>
          Email address
        </Label>

        <div className='flex items-center gap-3'>
          <div className='flex flex-1 items-center rounded-md bg-dark-400'>
            <Input
              id='email'
              placeholder='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='share-input'
            />

            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>

          <Button
            type='submit'
            onClick={handleShareDocument}
            disabled={loading}
            className='gradient-blue flex h-full gap-1 px-5'
          >
            {loading ? 'Sharing...' : 'Invite'}
          </Button>
        </div>

        <div className='my-2 space-y-2'>
          <ul className='flex flex-col'>
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
