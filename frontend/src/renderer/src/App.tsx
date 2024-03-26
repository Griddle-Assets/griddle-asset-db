import Versions from './components/Versions';
import NewAssetForm from './components/NewAssetForm';
import fetchClient from './lib/fetch-client';
import Metadata from './components/Metadata';

import { useState } from 'react';
import { Asset } from './types';

interface MyFormData {
  assetName: string;
  keywords: string;
  assetFiles: File[];
  thumbnailFile: File | null;
}

function App(): JSX.Element {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');
  const fetchAssets = async () => {
    const { data, error } = await fetchClient.GET('/api/v1/assets/');
    if (!data) {
      throw error;
    } else {
      setAssets(data);
    }
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const onSubmit = (data: MyFormData) => {
    console.log('Form data:', data);
    // Handle form submission logic here
  };

  return (
    <>
      <div className="my-6 text-4xl font-bold">Griddle</div>
      <div className="flex">
        <div className="w-2/3">
          <button
            type="button"
            onClick={ipcHandle}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full mb-4 hover:bg-blue-600"
          >
            Send IPC
          </button>
          <button
            type="button"
            onClick={fetchAssets}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full mb-4 hover:bg-blue-600"
          >
            Fetch assets
          </button>
          <Versions></Versions>
          <ul>
            {assets.map((asset, index) => (
              <li key={index}>
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full mb-4 hover:bg-blue-600"
                  onClick={() => handleAssetClick(asset)} // Call handleAssetClick with the selected asset
                >
                  {asset.asset_name}
                </button>
              </li>
            ))}
          </ul>
          <NewAssetForm onSubmit={onSubmit} />
        </div>
        <div className="w-1/4">
          <Metadata asset={selectedAsset} />
        </div>
      </div>
    </>
  );
}

export default App;
