import Versions from './components/Versions';
import Metadata from './components/Metadata';

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

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
        </div>
      <Metadata></Metadata>
    </div>
      
    </>
  );
}

export default App;
