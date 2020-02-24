import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//create your first component

const Cell = props => (
	<div className="Cell" onClick={() => props.clicked(props.cellNum)}>
		{props.val}
	</div>
);

export const Board = props => {
	const initData = {
		cells: Array.apply(null, { length: 9 }).map(x => ""),
		symbl: "X"
	};
	const [cells, setCells] = React.useState(initData.cells);
	const [symbl, setSymbl] = React.useState(initData.symbl);

	const tttStates = [
		"111000000",
		"000111000",
		"000000111",
		"100100100",
		"010010010",
		"001001001",
		"100010001",
		"001010100"
	];

	const moveBitmap = symbl => cells.map(x => (x === symbl ? 1 : 0)).join("");

	const checkWinner = symbl => {
		for (let i of tttStates) {
			if (
				(parseInt(moveBitmap(symbl), 2) & parseInt(i, 2)) ===
				parseInt(i, 2)
			) {
				alert(`${symbl} won! New Game?`);
				newGame();
			}
		}
	};

	const clicked = x => {
		const newCellData = Array(...cells);
		if (!newCellData[x]) {
			newCellData[x] = symbl;
			setCells(newCellData);
			setSymbl(symbl === "X" ? "O" : "X");
		}
	};

	const newGame = () => {
		setCells(initData.cells);
		setSymbl(initData.symbl);
	};

	const vCells = [];
	for (let i = 0; i < 9; i++) {
		vCells.push(<Cell val={cells[i]} cellNum={i} clicked={clicked} />);
	}

	React.useEffect(() => checkWinner(symbl === "X" ? "O" : "X"));

	return (
		<div className="Game">
			<div className="Board">{vCells}</div>
			<p>Next move: {symbl}</p>
			<button onClick={newGame}>New Game</button>
		</div>
	);
};
Cell.propTypes = {
	clicked: PropTypes.func,
	cellNum: PropTypes.string,
	val: PropTypes.string
};
