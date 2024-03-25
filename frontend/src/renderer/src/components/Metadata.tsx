import { Asset } from '../types';

interface Props {
  asset: Asset | null;
}

function Metadata({ asset }: Props): JSX.Element {
    if (!asset) {
        return (
          <div>
            <div className="text-lg">Metadata</div>
            <div>Please select an asset</div>
          </div>
        );
      }
    
      // If an asset is selected, render its information
      return (
        <div>
          <div className="text-lg">Metadata</div>
          <div>ID: {asset.id}</div>
          <div>Name: {asset.asset_name}</div>
          <div>Keywords: {asset.keywords}</div>
          <div>Author: {asset.author_pennkey}</div>
          {asset.image_url && <img src={asset.image_url} alt={asset.asset_name} />}
        </div>
      );
}

export default Metadata;