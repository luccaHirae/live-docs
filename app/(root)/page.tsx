import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import AddDocumentButton from '@/components/AddDocumentButton';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Home = async () => {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  const documents = [];
  return (
    <main className='home-container'>
      <Header className='sticky left-0 top-0'>
        <div className='flex items-center gap-2 lg:gap-4'>
          Notification
          <UserButton />
        </div>
      </Header>

      {documents.length > 0 ? (
        <div></div>
      ) : (
        <div className='document-list-empty'>
          <Image
            src='/assets/icons/doc.svg'
            alt='Document'
            width={40}
            height={40}
            className='mx-auto'
          />

          <AddDocumentButton
            userId={user.id}
            email={user.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
