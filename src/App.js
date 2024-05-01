import "./App.css";
import background from "./assets/background-alt.jpg";
import CreditFooter from "./Components/CreditFooter";
function App({ children }) {
  return (
    <div
      className="bg-cover bg- bg-no-repeat bg-fixed min-h-screen "
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="backdrop-blur-md backdrop-brightness-50 flex justify-center items-center pb-28 sm:pb-0">
        {{
          ...children,
        }}
        <CreditFooter />
      </div>
    </div>
  );
}

export default App;
