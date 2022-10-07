import {useState, useEffect} from "react";
const GameBoard = () => {
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [currentInput, setCurrentInput] = useState(problem.slice());

  const updateUserInput = (val, ind) => {
    let inputArr = currentInput.split("");
    if (!val) {
      inputArr[ind] = "0";
    } else {
      inputArr[ind] = String(val);
    }

    setCurrentInput(inputArr.join(""));
    console.log(currentInput);
    console.log(solution);
  };

  // Check Answer
  const checkAnswer = () => {
    console.log("input === solution", currentInput === solution);
  };
  useEffect(() => {
    // Get Problems
    const getProblems = async () => {
      await fetch("http://localhost:8080/problems")
        .then((res) => res.json())
        .then((res) => {
          setProblems([...res]);
          setProblem(res[0].problem);
          setCurrentInput(res[0].problem.slice());
          setSolution(res[0].solution);
        });
    };
    getProblems();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>sudoku</h1>
      </div>
      <div className="grid-container">
        {problem.split("").map((item, ind) => {
          return (
            <div key={ind} className={`row${ind} grid-item`}>
              {item !== "0" ? (
                item
              ) : (
                <input
                  className="cellInput"
                  type="text"
                  id={`cell${ind}`}
                  onChange={(e) => updateUserInput(e.target.value, ind)}
                  maxLength="1"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="menu">
        <button onClick={checkAnswer}>Check Answer</button>
      </div>
    </div>
  );
};

export default GameBoard;
