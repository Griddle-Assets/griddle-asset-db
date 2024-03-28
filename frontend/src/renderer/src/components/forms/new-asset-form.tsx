import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

import fetchClient from '@renderer/lib/fetch-client';

export interface NewAssetFormData {
  assetName: string;
  keywords: string;
  assetFiles: File[];
  thumbnailFile: File;
}

export default function NewAssetForm({
  afterSubmit,
}: {
  afterSubmit?: SubmitHandler<NewAssetFormData>;
}) {
  const { register, handleSubmit } = useForm<NewAssetFormData>();

  // Handle state for assetFiles and thumbnail file
  const [assetFiles, setAssetFiles] = useState<File[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // --------- Functions to handle asset file input/drop -----------------------
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
    setAssetFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // --------- Functions to handle thumbnail file input/drop -----------------------
  const handleThumbnailFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setThumbnailFile(droppedFile);
  };

  const handleThumbnailFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setThumbnailFile(selectedFile || null);
  };

  const handleRemoveThumbnailFile = () => {
    setThumbnailFile(null);
  };

  // --------------------------------------------------------
  const submitHandler = async (data: NewAssetFormData) => {
    // Calling fetchClient.POST()
    const { response, error } = await fetchClient.POST('/api/v1/assets/', {
      body: {
        asset_name: data.assetName,
        keywords: data.keywords,
        image_uri:
          'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wEEEACFAIUAhQCFAI4AhQCWAKcApwCWANAA4QDIAOEA0AE0ARsBAgECARsBNAHSAU0BZgFNAWYBTQHSAsQBuQIEAbkBuQIEAbkCxAJxAvYCaAI/AmgC9gJxBGUDcwMPAw8DcwRlBRMEQwQJBEMFEwYmBYAFgAYmB78HWwe/Ch8KHw2aEQCFAIUAhQCFAI4AhQCWAKcApwCWANAA4QDIAOEA0AE0ARsBAgECARsBNAHSAU0BZgFNAWYBTQHSAsQBuQIEAbkBuQIEAbkCxAJxAvYCaAI/AmgC9gJxBGUDcwMPAw8DcwRlBRMEQwQJBEMFEwYmBYAFgAYmB78HWwe/Ch8KHw2a/8IAEQgAZABkAwEiAAIRAQMRAf/EACsAAQADAQAAAAAAAAAAAAAAAAABAgMEAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAAq3HNbQWtIAAAAUtkU6ePqLAAhAsrJCBfn6OMjfAva57pqyxNNMtiEiqwpzaZqAmAmLnRIiUgHGFiLVAJvTU3CSiQDjraqgSC23PqbBEwJQOSBUgAB0yIkAP/xAAfEAACAgMBAQADAAAAAAAAAAABAgAgAxExEDATISL/2gAIAQEAAT8AGMwown9RTCCYPhozkIDxEI+b8mM334ZvzJ4p/V90y+YzVngGhQxjs+AkT8pgyQ5BCxaYxTUd9D4KNCr3Tos3b4+2PZuE0Aids1RORLE7ujfZeV//xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAECAQE/AEf/xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAEDAQE/AEf/2Q==', // data.thumbnailFile.path,
        // TODO: read image file, encode to base64 datauri
      },
    });

    if (error) throw error;
    if (!response.status.toString().startsWith('2'))
      throw new Error(`Non-OK response with code ${response.status}: ${response.statusText}`);

    // Combine assetFiles from state with form data
    const formDataWithFiles = { ...data, assetFiles };
    if (afterSubmit) afterSubmit(formDataWithFiles); // Call the onSubmit function provided by props
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
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

      <div
        className="mt-4"
        onDrop={handleAssetFileDrop}
        onDragOver={(event) => event.preventDefault()}
      >
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
                  type="file"
                  className="sr-only"
                  multiple
                  {...register('assetFiles', { required: true })}
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
                <button
                  type="button"
                  onClick={() => handleRemoveAssetFile(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mt-4"
        onDrop={handleThumbnailFileDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <label htmlFor="thumbnailUpload" className="block text-sm font-medium text-gray-700">
          Upload Thumbnail
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
                htmlFor="thumbnail-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload Thumbnail</span>
                <input
                  id="thumbnail-upload"
                  type="file"
                  className="sr-only"
                  {...register('thumbnailFile', { required: true })}
                  onChange={handleThumbnailFileInputChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">JPG or PNG file</p>
            {thumbnailFile && (
              <div>
                <p className="text-xs text-gray-500">{thumbnailFile.name}</p>
                <button type="button" onClick={handleRemoveThumbnailFile} className="text-red-500">
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
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
