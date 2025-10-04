import "./App.css";
import Button from "./components/ui/Button/Button";
import Footer from "./components/Footer";
import Card from "./components/card"; 

function App() {
  return (
    <>
      <img src="/logo.svg" alt="Logo Mind Care" />
      <h1>Mind Care</h1>
      <div className="card">
          <Card />
        </div>
      <Button>Teste</Button>
      
      <Footer />
    </>
  );
}

export default App;
