import "./App.css";
import UseStateComponent from "./UseStateComponent";
import UseEffectComponent from "./UseEffectComponent";
import UseContextComponent from "./UseContextComponent";
import UseReducerComponent from "./UseReducerComponent";
import UseRefComponent from "./UseRefComponent";
import CustomHooks from "./CustomHooks";
import UseMemoComponent from "./UseMemoComponent";
import EvenMoreReactComponent from "./EvenMoreReactComponent";

function App() {
  return (
    <div className="App">
      <h1>useState</h1>
      <UseStateComponent />

      <h1>useEffect</h1>
      <UseEffectComponent />

      <h1>useContext</h1>
      <UseContextComponent />

      <h1>useReducer</h1>
      <UseReducerComponent />

      <h1>useRef</h1>
      <UseRefComponent />

      <h1>Custom Hook</h1>
      <CustomHooks />

      <h1>useMemo</h1>
      <UseMemoComponent />

      <div>
        <EvenMoreReactComponent />
      </div>
    </div>
  );
}

export default App;
