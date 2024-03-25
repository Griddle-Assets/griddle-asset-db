import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';

// import fetchClient from '@renderer/lib/fetch-client';

interface FormData {
  assetName: string;
  keywords: string[];
  assetFiles: File[];
  thumbnailFile: File | null;
}

interface NewAssetFormProps {
  onSubmit: SubmitHandler<FormData>;
}

export default function NewAssetForm({ onSubmit }: NewAssetFormProps): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>();

   // Handle state for assetFiles
   const [assetFiles, setAssetFiles] = React.useState<File[]>([]);

   // Function to handle asset file input/drop
   const handleAssetFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
     event.preventDefault();
     const droppedFiles = Array.from(event.dataTransfer.files);
     setAssetFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
   };

  const handleAssetFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setAssetFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };


  const handleRemoveAssetFile = (index: number) => {
    setAssetFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };

  // --------------------------------------------------------
  const onSubmitForm = (data: FormData) => {
    // Combine assetFiles from state with form data
    const formDataWithFiles = { ...data, assetFiles };
    onSubmit(formDataWithFiles); // Call the onSubmit function provided by props
  };

  // -------- Calling fetchClient.POST() ---------------------

  // const {data, error} = await fetchClient.POST('api/v1/assets/', {
  //   body: {asset: {asset_name, image_url, keywords } },
  // }); 

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
      
      <div className="mt-4" onDrop={handleAssetFileDrop} onDragOver={(event) => event.preventDefault()}>
        <label htmlFor="assetUpload" className="block text-sm font-medium text-gray-700">
          Upload Asset Files
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M27 4v16h16M27 4l17 17M43 21H5M13 12h22v9l5 4V8l-5 4z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="asset-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload Asset files</span>
                <input
                  id="asset-upload"
                  name="asset-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleAssetFileInputChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">BLEND, MA, HIP, USDA files</p>
          </div>
        </div>
        <div className="mt-2">
          <ul>
            {assetFiles.map((file, index) => (
              <li key={index}>
                {file.name}{' '}
                <button type="button" onClick={() => handleRemoveAssetFile(index)} className="text-red-500">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
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
