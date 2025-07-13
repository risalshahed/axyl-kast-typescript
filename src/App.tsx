import './App.css'
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="min-h-screen p-4 relative">
      <h1 className='font-bold text-3xl text-center pt-4 max-w-160 mx-auto'>
        Task Management with Kanban Board
      </h1>
      <Tasks />
    </div>
  )
}

export default App;