import {useState, useEffect} from "react";
const GameBoard = () => {
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  useEffect(() => {
    // Get Problems
    const getProblems = async () => {
      await fetch("http://localhost:8080/problems")
        .then((res) => res.json())
        .then((res) => {
          setProblems([...res]);
          console.log("res", [...res]);
          setProblem(res[0].problem);
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
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
