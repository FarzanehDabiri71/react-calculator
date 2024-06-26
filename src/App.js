import logo from './logo.svg';
import './App.css';

function App() {
  const numbers = [1,2,3,4,5,6,7,8,9]
  const operators = ["+","-","*","÷"]
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand"></div>
         <div className="current-operand"></div>
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
      <button className='span-two'>=</button>
    </div>
  );
}

export default App;
