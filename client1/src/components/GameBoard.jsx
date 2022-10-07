import {useState, useEffect} from "react";
const GameBoard = () => {
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [currentInput, setCurrentInput] = useState(problem.slice());
  const [dupeCells, setDupeCells] = useState([]);

  const updateUserInput = (val, ind) => {
    let inputArr = currentInput.split("");
    if (!val) {
      inputArr[ind] = "0";
      if (dupeCells.includes(ind)) {
        setDupeCells((prev) => prev.filter((item) => item !== ind));
      }
    } else {
      inputArr[ind] = String(val);
    }

    const newInputArr = inputArr.join("");
    setCurrentInput(newInputArr);
    console.log(currentInput);
    console.log(solution);
    setDupeCells([]);
    checkDupes(newInputArr);
  };

  // Checks for dupes each time an input is updated
  function checkDupes(inputArr) {
    // Map of all the items in the same row, mapped to an array of their indexes
    let rowMaps = [...Array(9).keys()].map((i) => new Map());
    let colMaps = [...Array(9).keys()].map((i) => new Map());
    let boxMaps = [...Array(9).keys()].map((i) => new Map());
    for (let i = 0; i < inputArr.length; i++) {
      let row = Math.floor(i / 9);
      let col = i % 9;
      let boxGridRow = Math.floor(col / 3);
      let boxGridCol = Math.floor(row / 3);
      let box = boxGridRow * 3 + boxGridCol;

      // Build out row DS
      let rowMap = rowMaps[row];
      let colMap = colMaps[col];
      let boxMap = boxMaps[box];
      [rowMap, colMap, boxMap].forEach((elem) => {
        if (elem.has(inputArr[i])) {
          elem.set(inputArr[i], [...elem.get(inputArr[i]), i]);
        } else {
          elem.set(inputArr[i], [i]);
        }
      });
    }
    // Check for dupes in every map and update background cell
    [rowMaps, colMaps, boxMaps].forEach((dupeMaps) => {
      for (let dupeMap of dupeMaps) {
        for (let [key, val] of dupeMap) {
          if (key === "0" || val.length === 1) {
            continue;
          }
          for (let ind of val) {
            setDupeCells((prev) => [...prev, ind]);
          }
        }
      }
    });
  }

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
            <div
              key={ind}
              className={`cell${ind} grid-item`}
              style={{
                backgroundColor: dupeCells.includes(ind) ? "yellow" : "white",
              }}>
              {item !== "0" ? (
                item
              ) : (
                <input
                  className="cellInput"
                  type="text"
                  id={`cell${ind}`}
                  onChange={(e) => updateUserInput(e.target.value, ind)}
                  maxLength="1"
                  style={{
                    backgroundColor: dupeCells.includes(ind)
                      ? "yellow"
                      : "white",
                  }}
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
