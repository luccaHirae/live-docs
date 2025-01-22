import { Editor } from '@/components/editor/Editor';
import Header from '@/components/Header';
import { UserButton } from '@clerk/nextjs';

const Document = () => {
  return (
    <div>
      <Header>
        <div className='flex w-fit items-center justify-center gap-2'>
          <p className='document-title'>Share</p>
        </div>

        <UserButton />
      </Header>
      <Editor />
    </div>
  );
};

export default Document;
