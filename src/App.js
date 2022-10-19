import CharacterCard from './components/CharacterCard';
import CharactersMenu from './components/CharactersMenu';
import SavesMenu from './components/SavesMenu';

function App() {
  return (
    <div className="w-screen bg-[url(https://images6.alphacoders.com/613/613003.png)] bg-no-repeat bg-center bg-cover flex justify-center items-center h-screen">
      <div className="container w-[920px] h-[600px] flex">
        <CharactersMenu />
        <CharacterCard />
        <SavesMenu />
      </div>
    </div>
  );
}

export default App;
