import { Asset } from '@renderer/types';

export default function AssetList({ assets }: { assets: Asset[] }) {
  return (
    <ul>
      {assets.map(({ id, asset_name, author_pennkey }) => (
        <li key={id}>
          <button
            type="button"
            onClick={(evt) => {
              evt.stopPropagation();
              setSelectedAssetId(id);
              console.log('set selected id:', id);
            }}
          >
            {asset_name} -- {author_pennkey}
          </button>
        </li>
      ))}
    </ul>
  );
}
