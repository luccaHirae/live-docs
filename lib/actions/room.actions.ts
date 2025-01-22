'use server';

import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';
import { liveblocks } from '@/lib/liveblocks';
import { parseStringify } from '@/lib/utils';

export const createDocument = async ({userId, email}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled'
    }

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ['room:write']
    })

    revalidatePath('/');

    return parseStringify(room);
  } catch (error) {
    console.log(`Error creating document: ${error}`);
  }
}