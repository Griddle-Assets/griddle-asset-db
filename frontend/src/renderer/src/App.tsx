import Versions from './components/Versions';
import NewAssetForm from './components/NewAssetForm';

interface MyFormData {
  assetName: string;
  keywords: string[];
  assetFiles: FileList;
  thumbnailFile: File | null;
}

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  const onSubmit = (data: MyFormData) => {
    console.log('Form data:', data);
    // Handle form submission logic here
  };
  
  return (
    <>
      <div className="my-6 text-4xl font-bold">Griddle</div>
      <div className='flex'>
        <div className="w-2/3">
          <button
            type="button"
            onClick={ipcHandle}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full mb-4 hover:bg-blue-600"
          >
            Send IPC
          </button>
          <Versions></Versions>
          <NewAssetForm onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}

export default App;
