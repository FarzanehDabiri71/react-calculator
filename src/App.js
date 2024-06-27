import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { useReducer } from "react";
function App() {
  const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose_operation",
    CLEAR: "clear",
    DELETE_DIGIT: "delete_digit",
    EVALUATION: "evaluate",
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        return {
          ...state,
          currentOperand: `${currentOperand || ""}${payload.digit}`,
        };
    }
  };
  const [{ currentOperand, previousOpernad, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOpernad}
          {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>Del</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
