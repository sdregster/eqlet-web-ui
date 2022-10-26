import './App.scss';
import CharacterCard from './containers/CharacterCard/CharacterCard';
import CharactersMenu from './containers/CharactersMenu/CharactersMenu';
import SavesMenu from './containers/SavesMenu/SavesMenu';

function App() {
  return (
    <div className="app">
      <div className="container">
        <CharactersMenu />
        <CharacterCard />
        <SavesMenu />
      </div>
    </div>
  );
}

export default App;
