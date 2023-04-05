let player1 = {elo: 2839, cash: 13390, level: 3, xp: 120, wins: 420, losses: 69, ballHits: 284, ballMisses: 22, ballHitRatio: undefined};
let player2 = {elo: 2750, cash: 3856, level: 2, xp: 110, wins: 69, losses: 420, ballHits: 198, ballMisses: 19, ballHitRatio: undefined};
console.log(player1, player2);


function matchPlayed() {
    function calcCash() {
        let ballHits = 24;
        let extraIncome = Math.floor(ballHits / 5);
        let newWinnerCash = player1.cash + 100 + extraIncome;
        let newLoserCash = player2.cash + 50 + extraIncome;
        player1.cash = newWinnerCash;
        player2.cash = newLoserCash;
    };
    
    function calcELO() {
      let loserELOExtra = player2.elo * 0.03;
      let newLoserELO = player2.elo - 5 - loserELOExtra;
      let newWinnerELO = player1.elo + 5 + loserELOExtra;
      newLoserELO = Math.ceil(newLoserELO);
      newWinnerELO = Math.floor(newWinnerELO);
      
      // Check if the newELO value is less than 1, and if it is, set it to 1
      if (newLoserELO < 1) {
        newLoserELO = 1;
      }
      if (newWinnerELO < 1) {
        newWinnerELO = 1;
      }
      player1.elo = newWinnerELO;
      player2.elo = newLoserELO;
    };
    calcCash();
    calcELO();
};

matchPlayed();
console.log("---------------");
console.log(player1, player2);