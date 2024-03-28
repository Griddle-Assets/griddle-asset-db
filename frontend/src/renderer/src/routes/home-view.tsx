import funnygif from '../assets/funny.gif';

import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Asset } from '@renderer/types';
import Navbar from '../components/layout/navbar';
import Metadata from '../components/metadata';
import { useAssetsSearch } from '@renderer/hooks/use-assets-search';

function HomeView(): JSX.Element {
  const { assets, error, isLoading } = useAssetsSearch();
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const selectedAsset = useMemo<Asset | null>(() => {
    if (!assets || !selectedAssetId) return null;
    return assets.find(({ id }) => id === selectedAssetId) ?? null;
  }, [assets, selectedAssetId]);

  return (
    <>
      <div className="w-screen h-screen max-h-screen min-w-[400px] overflow-clip grid grid-rows-[min-content_1fr]">
        <Navbar />
        <div className="grid grid-cols-[minmax(160px,calc(min(25%,320px)))_minmax(0,1fr)_minmax(160px,calc(min(25%,320px)))]">
          <div className="relative border-r-[1px] border-base-content/20">
            {/* Asset explorer */}
            <div className="absolute inset-0 py-4 px-6">
              <p className="text-base-content/60">Explorer</p>
            </div>
          </div>
          {/* Main body */}
          <div
            onClick={() => {
              setSelectedAssetId(null);
            }}
            className="bg-base-200 relative"
          >
            {/* Main body (asset browser) */}
            {!!error && <p>Couldn&apos;t load assets!</p>}
            {!!isLoading && <p>loading...</p>}
            {!!assets && (
              <ul className="absolute inset-0 overflow-y-auto py-4 px-6 grid gap-4 items-start grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
                {assets.map(({ id, asset_name, author_pennkey, image_uri }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setSelectedAssetId(id);
                        console.log('set selected id:', id);
                      }}
                      className={`w-full h-full shadow bg-base-100 p-4 rounded-2xl transition-shadow focus-visible:outline-none text-left ${id === selectedAssetId ? 'ring-2 ring-primary/60 focus-visible:outline-none focus-visible:ring-4' : 'ring-primary/40 focus-visible:ring-4'}`}
                    >
                      <img
                        src={image_uri || funnygif}
                        className="aspect-square rounded-lg bg-base-300 mb-2 w-full"
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
          <div className="relative border-l-[1px] border-base-content/20">
            <div className="absolute inset-0 px-6 py-4">
              {/* Asset metadata panel */}
              {selectedAsset && <Metadata asset={selectedAsset} />}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default HomeView;
