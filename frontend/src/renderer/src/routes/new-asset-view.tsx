import NewAssetForm from '@renderer/components/forms/new-asset-form';
import { useNavigate } from 'react-router-dom';

export default function NewAssetView() {
  const navigate = useNavigate();
  return (
    <>
      {/* TODO: add transition animation */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0" onClick={() => navigate('/')}>
        <div
          className="mx-auto w-full max-w-xl bg-base-100 px-6 py-4 mt-6 rounded-lg shadow-lg"
          onClick={(evt) => evt.stopPropagation()}
        >
          <h1 className="text-2xl font-semibold">Create New Asset</h1>
          <NewAssetForm afterSubmit={() => navigate('/')} />
        </div>
      </div>
    </>
  );
}
