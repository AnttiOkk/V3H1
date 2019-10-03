var N_SIZE = 5,
  turn = "x",
  vuoro = "1",
  score = {},
  moves;

function Init() {
  var ruudukko = document.getElementById("ruudukko");
  ruudukko.addEventListener("click", klikkaus);
}

function klikkaus(event) {
  var cell = event.target;
  if (!cell.classList.contains("col")) {
    return;
  }
  set(cell);
}

/* Uusi peli */
function startNewGame() {
  score = {
    x: 0,
    o: 0
  };
  moves = 0;
  turn = "x";
  vuoro = "1";
  /* pelaaja 1 aloittaa aina pelin */
  document.getElementById("turn").textContent = "Player " + vuoro;
  var boxes = document.querySelectorAll("#ruudukko .col");

  [].forEach.call(boxes, function(square) {
    // ruutujen tyhejnnys
    square.innerHTML = "";
    // väri takaisin valkoiseksi / alkuperäiseksi
    square.style.backgroundColor = "";
    square.removeAttribute("data-played");
  });
}

/* Voiton tarkistus */
function win(clicked) {
  //let played = clicked.getAttribute("data-played");

  let row = clicked.parentNode;
  let rowNodes = row.children;
  //alert(rowNodes.length)
  let isRowWin = checkAll(rowNodes);
  //alert(isRowWin)

  // samalla rivillä voitto?
  if (isRowWin) {
    return true;
  }
  let i = 0;
  for (i = 0; i < rowNodes.length; i++) {
    if (clicked.isSameNode(rowNodes[i])) {
      //console.log(i);
      break;
    }
  }

  // sarakkeella voitto?
  i = i + 1;
  let columnNodes = document.querySelectorAll(
    "#ruudukko .row .col:nth-child(" + Number(i) + ")"
  );
  //alert(columnNodes.length)
  let isColumnWin = checkAll(columnNodes);
  if (isColumnWin) {
    return true;
  }

  // diagonaali voitto ?
  let diagonalNodes = document.getElementsByClassName("diagonal");
  //alert(diagonalNodes.length)
  let isDiagonalWin = checkAll(diagonalNodes);
  if (isDiagonalWin) {
    return true;
  }
  let antiDiagonalNodes = document.getElementsByClassName("antiDiagonal");
  let isantiDiagonalWin = checkAll(antiDiagonalNodes);
  if (isantiDiagonalWin) {
    return true;
  }
  return false;
}

function checkAll(elements) {
  let noWin = false;
  let played = elements[0].getAttribute("data-played");

  [].forEach.call(elements, function(element) {
    if (
      element.getAttribute("data-played") === null ||
      element.getAttribute("data-played") !== played
    ) {
      noWin = true;
    }
  });
  if (noWin) {
    return false;
  } else {
    return true;
  }
  // rivin tarkistus
}

/* Paikan asetus ja vuoron vaihto */
function set(cell) {
  if (cell.innerHTML.length !== 0) {
    return false;
  }
  cell.innerHTML = turn;
  if (turn === "x") {
    cell.style.backgroundColor = "rgb(124, 252, 0)";
    cell.setAttribute("data-played", "x");
  } else {
    cell.style.backgroundColor = "rgb(250, 128, 114)";
    cell.setAttribute("data-played", "o");
  }
  moves += 1;
  score[turn] += cell.identifier;
  if (win(cell)) {
    alert("Player " + vuoro + " won!");
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    alert("Draw!");
    startNewGame();
  } else {
    turn = turn === "x" ? "o" : "x";
    vuoro = vuoro === "1" ? "2" : "1";
    document.getElementById("turn").textContent = "Player " + vuoro;
  }
  // move();
}
//
/*function move() {
  var elem = document.getElementById("myBar");
  elem.style.width = moves * 4 + "%";
}*/
Init();
