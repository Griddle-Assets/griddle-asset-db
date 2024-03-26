import { useState } from 'react';

function OldAssetForm(): JSX.Element {
  const [assetFiles, setAssetFiles] = useState<File[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [displayedAssetFiles, setDisplayedAssetFiles] = useState<string>('');
  const [displayedThumbnailFile, setDisplayedThumbnailFile] = useState<string>('');

  const handleAssetFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setAssetFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleThumbnailFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setThumbnailFile(droppedFile);
  };

  const handleAssetFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setAssetFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleThumbnailFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setThumbnailFile(selectedFile || null);
  };

  const handleRemoveAssetFile = (index: number) => {
    setAssetFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };

  const handleRemoveThumbnailFile = () => {
    setThumbnailFile(null);
  };

  // submission after clicking "create" button
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add your form submission logic here

    // Display asset files and thumbnail file on the screen
    setDisplayedAssetFiles(assetFiles.map((file) => file.name).join(', '));
    setDisplayedThumbnailFile(thumbnailFile ? thumbnailFile.name : '');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-1 w-1/4">
        <div className="text-lg">AssetForm</div>
        <div className="mt-4">
          <label htmlFor="assetName" className="block text-sm font-medium text-gray-700">
            Asset Name
          </label>
          <input
            type="text"
            name="assetName"
            id="assetName"
            className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            placeholder="Enter asset name"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
            Keywords
          </label>
          <input
            type="text"
            name="keywords"
            id="keywords"
            className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            placeholder="Enter keywords"
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
                    name="thumbnail-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleThumbnailFileInputChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">JPG or PNG file</p>
              {thumbnailFile && (
                <div>
                  <p className="text-xs text-gray-500">{thumbnailFile.name}</p>
                  <button
                    type="button"
                    onClick={handleRemoveThumbnailFile}
                    className="text-red-500"
                  >
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </div>
      <div>
        <p>Asset Files: {displayedAssetFiles}</p>
        <p>Thumbnail File: {displayedThumbnailFile}</p>
      </div>
    </form>
  );
}

export default OldAssetForm;
