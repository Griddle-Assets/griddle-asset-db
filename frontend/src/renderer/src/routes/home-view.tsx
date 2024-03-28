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
      <div className="grid h-screen max-h-screen w-screen min-w-[400px] grid-rows-[min-content_1fr] overflow-clip">
        <Navbar />
        <div className="grid grid-cols-[minmax(160px,calc(min(25%,320px)))_minmax(0,1fr)_minmax(160px,calc(min(25%,320px)))]">
          <div className="relative border-r-[1px] border-base-content/20">
            {/* Asset explorer */}
            <div className="absolute inset-0 px-6 py-4">
              <p className="text-base-content/60">Explorer</p>
            </div>
          </div>
          {/* Main body */}
          <div
            onClick={() => {
              setSelectedAssetId(null);
            }}
            className="relative bg-base-200"
          >
            {/* Main body (asset browser) */}
            {!!error && <p>Couldn&apos;t load assets!</p>}
            {!!isLoading && <p>loading...</p>}
            {!!assets && (
              <ul className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] items-start gap-4 overflow-y-auto px-6 py-4">
                {assets.map(({ id, asset_name, author_pennkey, image_uri }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setSelectedAssetId(id);
                        console.log('set selected id:', id);
                      }}
                      className={`h-full w-full rounded-2xl bg-base-100 p-4 text-left shadow transition-shadow focus-visible:outline-none ${id === selectedAssetId ? 'ring-2 ring-primary/60 focus-visible:outline-none focus-visible:ring-4' : 'ring-primary/40 focus-visible:ring-4'}`}
                    >
                      <img
                        src={image_uri || funnygif}
                        className="mb-2 aspect-square w-full rounded-lg bg-base-300"
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
