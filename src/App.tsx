import './App.css'
import DragDrop from './components/DragDrop';
import Tasks from './components/Tasks';
import TaskBoard from './Demo/TaskBoard';

function App() {
  return (
    <div className="min-h-screen p-4 relative">
      Todo Project
      <Tasks />
      {/* <TaskBoard /> */}
      {/* <DragDrop /> */}
    </div>
  )
}

export default App;