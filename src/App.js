import { Outlet } from "react-router-dom";
import background from "./assets/background-alt.jpg";
import CreditFooter from "./Components/CreditFooter";

function App() {
  return (
    <div className="relative min-h-dvh bg-surface-sunken">
      {/* Separate fixed layers (instead of bg-fixed/backdrop-filter on the wrapper) so the
          background works on iOS and doesn't trap position:fixed children like confetti. */}
      <div
        aria-hidden
        className="fixed inset-0 scale-105 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div
        aria-hidden
        className="fixed inset-0 bg-gradient-to-b from-surface-sunken/85 via-surface-sunken/90 to-brand-900/80"
      />
      <div className="relative flex min-h-dvh flex-col">
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <CreditFooter />
      </div>
    </div>
  );
}

export default App;
