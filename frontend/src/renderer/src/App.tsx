import Versions from './components/Versions';
import fetchClient from './lib/fetch-client';
import Metadata from './components/Metadata';

import { useState } from 'react';

interface Asset {
  asset_name: string;
  keywords: string;
  image_url: string | null;
  id: string;
  author_pennkey: string;
}

function App(): JSX.Element {
  const [assets, setAssets] = useState<Asset[]>([]);

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');
  const fetchAssets = async () => {
    const { data, error } = await fetchClient.GET('/api/v1/assets/');
    if (!data) {
      throw error;
    } else {
      setAssets(data);
    }
  };

  return (
    <>
      <div className="my-6 text-4xl font-bold">Our app here!</div>
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
          <Versions></Versions>
          <ul>
            {assets.map((asset, index) => (
              <li key={index}>
                <div>{asset.asset_name}</div>
              </li>
            ))}
          </ul>
        </div>
        <Metadata></Metadata>
      </div>
    </>
  );
}

export default App;
