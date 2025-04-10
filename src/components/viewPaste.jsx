import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes); 
  const paste = allPastes.find((p) => p._id === id); 

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [paste]);

  if (!paste) {
    return <div className="text-center text-red-500 mt-10">Paste not found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-row gap-7">
        <input
          className="p-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={title}
          disabled
        />
      </div>

      <div>
        <textarea
          className="w-full mt-6 p-4 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700 text-base"
          value={value}
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
