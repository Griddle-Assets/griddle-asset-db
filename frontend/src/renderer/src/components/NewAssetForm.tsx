import { useForm, SubmitHandler } from 'react-hook-form';
// import React, { useState } from 'react';

interface FormData {
  assetName: string;
  keywords: string[];
  assetFiles: FileList;
  thumbnailFile: File | null;
}

interface NewAssetFormProps {
  onSubmit: SubmitHandler<FormData>;
}

export default function NewAssetForm({ onSubmit }: NewAssetFormProps): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmitForm = (data: FormData) => {
    onSubmit(data);
  };

  // ---------------------------------------------------------
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="mt-4">
        <label htmlFor="assetName" className="block text-sm font-medium text-gray-700">
          Asset Name
        </label>
        <input
          type="text"
          id="assetName"
          className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          placeholder="Enter asset name"
          {...register('assetName', { required: true })}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
          Keywords
        </label>
        <input
          type="text"
          id="keywords"
          className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          placeholder="Enter keywords"
          {...register('keywords', { required: true })}
        />
      </div>
      
      <div>
        <label htmlFor="assetFiles">Upload Asset Files</label>
        <input type="file" {...register('assetFiles')} />
      </div>

      <div>
        <label htmlFor="thumbnailFile">Upload Thumbnail</label>
        <input type="file" {...register('thumbnailFile')} />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded border border-gray-400"
        >
          Create
        </button>
      </div>
    </form>
  );
}
