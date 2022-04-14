const Square = ({id, newState}) => {
  const [color, setColor] = React.useState('green');
  const [status, setStatus] = React.useState(null);
  const XorO = ["O", "X"];

  const palet = ['#ff6961', '#6495ed'];
  const getColor = (currentPlayer) => palet[currentPlayer];
  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });
  return (
    <button onClick={(e) => {
      let currentPlayer = newState(id);
      setStatus(currentPlayer);
      let col = getColor(currentPlayer);
      setColor(col);
      e.target.style.background = col;
    }}> 
      <h1>{XorO[status]}</h1> 
    </button>
  )
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  //let status = `Player ${player}`;
  let status = `Next Player: ${player == '0' ? 'Player O' : 'Player X'}`;
  let winner = checkWinner(state);
  if(winner != null) status = `${player == '1' ? 'Player O' : 'Player X'} wins`;

  const newState = (idOfSquare) => {
    let thePlayer = player;
    state[idOfSquare] = player; //player is present player
    setState(state); //state is array of 0 or 1 or null
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    return thePlayer; //We need to return the present player
  }

  function renderSquare(i) {
    return <Square id={i} newState={newState}></Square>
  }

  return (
    <div
      className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

function checkWinner(state) {

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (state[a] == state[b] && state[a] == state[c] && state[a] != null) {
      return state[a];
    }
  }
  return null;
}


// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));



