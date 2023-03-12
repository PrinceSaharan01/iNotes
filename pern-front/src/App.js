import './App.css';
import Input from './components/Input';
import List from './components/List';
import NoteState from './Context/NoteState';

function App() {
  return (
    <>
      <div className="App">
        <NoteState>
          <Input></Input>
          <List></List>
        </NoteState>


      </div>
    </>
  );
}

export default App;
