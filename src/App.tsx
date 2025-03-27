import DarkModeToggle from './components/DarkModeToggle';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <DarkModeToggle />
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">JIWON TODO</h1>
          <p>다크모드 예제</p>
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
