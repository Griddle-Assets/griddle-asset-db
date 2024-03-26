import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAssets } from '@renderer/hooks/api-hooks';

import Navbar from '../components/layout/navbar';
import Metadata from '../components/metadata';

function HomeView(): JSX.Element {
  const { data: assets, error, isLoading } = useAssets();
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const selectedAsset = useMemo<{
    asset_name: string;
    keywords: string;
    image_url: string | null;
    id: string;
    author_pennkey: string;
  } | null>(() => {
    if (!assets || !selectedAssetId) return null;
    return assets.find(({ id }) => id === selectedAssetId) ?? null;
  }, [assets, selectedAssetId]);

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex flex-col min-w-[800px]">
        <Navbar />
        <div className="grid flex-grow grid-cols-[minmax(min-content,calc(min(25%,320px)))_minmax(min-content,1fr)_minmax(min-content,calc(min(25%,320px)))]">
          <div className="border-r-[1px] border-base-content/20 py-4 px-6">
            {/* Asset explorer */}
            <p className="text-base-content/60">Explorer</p>
          </div>
          {/* Main body */}
          <div
            onClick={() => {
              setSelectedAssetId(null);
            }}
            className="py-4 px-6 bg-base-200"
          >
            {/* Main body (asset browser) */}
            {error && <p>Couldn&apos;t load assets!</p>}
            {isLoading && <p>loading...</p>}
            {assets && (
              <ul className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {assets.map(({ id, asset_name, author_pennkey, image_url }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setSelectedAssetId(id);
                        console.log('set selected id:', id);
                      }}
                      className={`shadow bg-base-100 p-4 rounded-2xl transition-shadow focus-visible:outline-none ${id === selectedAssetId ? 'ring-2 ring-primary/60 focus-visible:outline-none focus-visible:ring-4' : 'ring-primary/40 focus-visible:ring-4'}`}
                    >
                      <img
                        src={image_url || 'http://placekitten.com/400/400'}
                        className="aspect-square rounded-lg bg-base-300 mb-2"
                      />
                      <div className="px-1">
                        {asset_name} -- {author_pennkey}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-l-[1px] border-base-content/20 px-6 py-4">
            {/* Asset metadata panel */}
            {selectedAsset && <Metadata asset={selectedAsset} />}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default HomeView;
