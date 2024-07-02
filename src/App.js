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
  EVALUATE: "evaluate",
};
// Define the reducer function to handle state transitions
const reducer = (state, { type, payload }) => {
  // Handle different action types using a switch statement
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // If overwrite is true, replace the current operand with the new digit
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
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
      // Update the operation if there is no current operand
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
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
    case ACTIONS.DELETE_DIGIT:
      // If overwrite is true, reset current operand and overwrite flag
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      // Return current state if no current operand
      if (state.currentOperand == null) return state;
      // Return current state if no current operand or only one digit left
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      // Remove last digit from current operand if it exists
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
       // If any necessary state is missing, do nothing
      if (
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOpernad === null
      ) {
        return state;
      }
         // Evaluate the expression and reset state
      return {
        ...state,
        overwrite: true,
        previousOpernad: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    // default:
    //   // Return the current state if action type is not recognized
    //   return state;
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
// Create a formatter for displaying integers
// Create a new instance of Intl.NumberFormat for formatting numbers as per US locale
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
   // Configure the formatter to not include any fraction digits
  maximumFractionDigits: 0,
});
// Define a function to format the operand for display
const formatOperand = (operand) => {
  // Check if operand is null or undefined and return if true
  if (operand == null) {
    return;
  }
   // Split the operand into integer and decimal parts
  const [integer, decimal] = operand.split(".");
    // If there is no decimal part, format and return the integer part
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
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
          {formatOperand(previousOpernad)}
          {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        Del
      </button>
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
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
