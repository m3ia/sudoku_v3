import {useState, useEffect} from "react";
const GameBoard = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Get Problems
    const getProblems = async () => {
      await fetch("http://localhost:8080/problems")
        .then((res) => res.json())
        .then((res) => {
          setProblems([...res]);
          console.log("res", [...res]);
        });
    };
    getProblems();
  }, []);

  return (
    <div className="container">
      <h1>sudoku</h1>
      {problems?.map((item, ind) => {
        return <div key={ind}>{item.problem}</div>;
      })}
    </div>
  );
};

export default GameBoard;
