import "./App.css";
import CatImage from "./components/CatImage";
import CatImageMultiple from "./components/CatImageMultiple";
import CatImageReRandom from "./components/CatImageReRandom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Cat Image</h1>
        {/* <CatImage /> */}
        <CatImageMultiple />
        {/* <CatImageReRandom /> */}
      </header>
    </div>
  );
}

export default App;
