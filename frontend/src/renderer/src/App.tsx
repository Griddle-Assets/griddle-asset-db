import Versions from './components/Versions';

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

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
      <Versions></Versions>
    </>
  );
}

export default App;
