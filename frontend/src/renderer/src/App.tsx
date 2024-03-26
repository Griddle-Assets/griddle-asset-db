import Versions from './components/Versions';
import fetchClient from './lib/fetch-client';

// components
import Navbar from './components/Navbar';

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');
  const fetchAssets = async () => {
    const { data, error } = await fetchClient.GET('/api/v1/assets/');
    if (error) {
      console.error(error);
    } else {
      alert(data.map(({ asset_name }) => asset_name).join(', '));
    }
  };

  return (
    <>
      <Navbar />
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
      <Versions></Versions>
    </>
  );
}

export default App;
