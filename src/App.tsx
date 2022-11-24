import { useAuth } from "./hooks/useAuth";
import { Login } from "./pages/login";
import { Posts } from "./pages/posts";

function App() {
  const { token } = useAuth();

  return <div className="App">{token ? <Posts /> : <Login />}</div>;
}

export default App;
