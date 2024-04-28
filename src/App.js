import "./App.css";
import background from "./assets/background-alt.jpg";

function App({ children }) {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="backdrop-blur-md backdrop-brightness-50">
        {{
          ...children,
        }}
      </div>
    </div>
  );
}

export default App;
