import "./App.css";
import "./styles.css";
import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
// Define an object to store action types as constants
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUATION: "evaluate",
};
// Define the reducer function to handle state transitions
const reducer = (state, { type, payload }) => {
  // Handle different action types using a switch statement
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // Prevent multiple leading zeros
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      // Prevent multiple decimal points
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      // Append the new digit to the current operand
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      // Ignore if there's no current and previous operand
      if (state.currentOperand == null && state.previousOpernad == null) {
        return state;
      }
      // Move current operand to previous operand if there's no previous operand
      if (state.previousOpernad == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOpernad: state.currentOperand,
          currentOperand: null,
        };
      }
      // Evaluate the expression and set the new operation
      return {
        ...state,
        previousOpernad: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      // Clear all state
      return {};
    default:
      // Return the current state if action type is not recognized
      return state;
  }
};
// Define the evaluate function to perform arithmetic operations
const evaluate = ({ currentOperand, previousOpernad, operation }) => {
  // Convert operands to float numbers
  const prev = parseFloat(previousOpernad);
  const current = parseFloat(currentOperand);
  // Return empty string if operands are not valid numbers
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  // Perform the appropriate arithmetic operation based on the operation type
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  // Return the computation result as a string
  return computation.toString();
};

function App() {
  // Use the useReducer hook to manage state with the reducer function and initial state
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
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button>Del</button>
      <OperationButton operation={"÷"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
