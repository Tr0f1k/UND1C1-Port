import './App.css';
import { useState, useEffect } from 'react';
import Rules from './Rules'
import Pitch from './Pitch'

function App() {
  const [turn, setTurn] = useState(1);
  const [totalTurns, setTotalTurns] = useState(0);
  const [team, setTeam] = useState(1);
  const [team1Goals, setTeam1Goals] = useState(0);
  const [team2Goals, setTeam2Goals] = useState(0);
  const [team1Shots, setTeam1Shots] = useState(0);
  const [team2Shots, setTeam2Shots] = useState(0);
  const [team1xG, setTeam1xG] = useState(0);
  const [team2xG, setTeam2xG] = useState(0);
  const [team1PassesAttempts, setTeam1PassesAttempts] = useState(0);
  const [team2PassesAttempts, setTeam2PassesAttempts] = useState(0);
  const [team1PassesCompleted, setTeam1PassesCompleted] = useState(0);
  const [team2PassesCompleted, setTeam2PassesCompleted] = useState(0);
  const [team1TacklesAttempts, setTeam1TacklesAttempts] = useState(0);
  const [team2TacklesAttempts, setTeam2TacklesAttempts] = useState(0);
  const [team1TacklesCompleted, setTeam1TacklesCompleted] = useState(0);
  const [team2TacklesCompleted, setTeam2TacklesCompleted] = useState(0);
  const [team1DribblesAttempts, setTeam1DribblesAttempts] = useState(0);
  const [team2DribblesAttempts, setTeam2DribblesAttempts] = useState(0);
  const [team1DribblesCompleted, setTeam1DribblesCompleted] = useState(0);
  const [team2DribblesCompleted, setTeam2DribblesCompleted] = useState(0);
  const [selectedValue, setSelectedValue] = useState('0');
  const [passSelectedValue, setPassSelectedValue] = useState('1');
  const [matchLog, setMatchLog] = useState(["Match Start!"]);
  const [isPossessionTeam1, setIsPossessionTeam1] = useState(true);
  const [possessionTurnsTeam1, setPossessionTurnsTeam1] = useState(0);
  const [teamWithPossession, setTeamWithPossession] = useState(1);
  const [showTeamWithPossession, setShowTeamWithPossession] = useState(teamWithPossession)
  const [grid, setGrid] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [remainingMovements, setRemainingMovements] = useState(3);
  const [passing, setPassing] = useState(false);
  const [displaySection, setDisplaySection] = useState('stats');
  const [diceResult1, setDiceResult1] = useState(null);
  const [diceResult2, setDiceResult2] = useState(null);
  const [modDiceResult1, setModDiceResult1] = useState(null);
  const [modDiceResult2, setModDiceResult2] = useState(null);
  const [coeff, setCoeff] = useState(0);
  const [gmDirection, setGmDirection] = useState(0);
  const [groupMove, setGroupMove] = useState(false);
  const [displayButtons, setDisplayButtons] = useState(false);
  

  
  const numRows = 18;
  const numCols = 16;



  const xGValues = {
    '6': 1,
    '5' : 0.97,
    '4': 0.92,
    '3': 0.83,
    '2': 0.72,
    '1': 0.58,
    '0': 0.42,
    '-1': 0.28,
    '-2': 0.17,
    '-3': 0.08,
    '-4': 0.03,
    '-5': 0,
  };

  const passValues = {
    '7': 0,
    '6': 0.17,
    '5': 0.33,
    '4': 0.5,
    '3': 0.67,
    '2': 0.83,
    '1': 1
  }

  const team1AvgAcc = team1PassesAttempts ? (team1PassesCompleted / team1PassesAttempts) * 100 : 0;
  const team2AvgAcc = team2PassesAttempts ? (team2PassesCompleted / team2PassesAttempts) * 100 : 0;
  const team1AvgTck = team1TacklesAttempts ? (team1TacklesCompleted / team1TacklesAttempts) * 100 : 0;
  const team2AvgTck = team2TacklesAttempts ? (team2TacklesCompleted / team2TacklesAttempts) * 100 : 0;
  const team1AvgDrb = team1DribblesAttempts ? (team1DribblesCompleted / team1DribblesAttempts) * 100 : 0;
  const team2AvgDrb = team2DribblesAttempts ? (team2DribblesCompleted / team2DribblesAttempts) * 100 : 0;
  const team1Pos = possessionTurnsTeam1 ? (possessionTurnsTeam1 / totalTurns) * 100 : 0;
  const team2Pos = possessionTurnsTeam1 ? (team1Pos - 100) * -1 : 0;

  const addMatchLogEntry = (message) => {
    setMatchLog([...matchLog, message]);
  };

  const handleShootingButtons = (isGoal) => {
    if (isGoal) {
      if (team === 1) {
        setTeam1Goals(team1Goals + 1);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} scores a goal after a shot with ${xGValues[selectedValue].toFixed(2)} xG! (automatic turn change)`
        );
      } else if (team === 2) {
        setTeam2Goals(team2Goals + 1);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} scores a goal after a shot with ${xGValues[selectedValue].toFixed(2)} xG! (automatic turn change)`
        );
      }
    }

    if (team === 1) {
      //setTeam1xG(team1xG + xGValues[selectedValue]);
      setTeam1Shots(team1Shots + 1);
      setShowTeamWithPossession(2);
      handleNextTurn();
      setIsPossessionTeam1(!isPossessionTeam1);
      setTeamWithPossession(2);
    } else if (team === 2) {
      //setTeam2xG(team2xG + xGValues[selectedValue]);
      setTeam2Shots(team2Shots + 1);
      setShowTeamWithPossession(1);
      handleNextTurn();
      setIsPossessionTeam1(!isPossessionTeam1);
      setTeamWithPossession(1);
    }

    if (!isGoal) {
      if (team === 1) {
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} misses a chance to score after a shot with ${xGValues[selectedValue].toFixed(2)} xG! (automatic turn change)`
        );
      }
      else if (team === 2) {
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} misses a chance to score after a shot with ${xGValues[selectedValue].toFixed(2)} xG! (automatic turn change)`
        );
      }
    }
  };

  const handleNextTurn = () => {
    if (isPossessionTeam1) {
      setPossessionTurnsTeam1(possessionTurnsTeam1 + 1);
    }
    if (turn === 22) {
      return;
    }
    if (team === 1) {
      setTeam(2);
    } else {
      if (turn < 21) {
        setTurn(turn + 1);
        setTeam(1);
      } else if (turn === 21 && team === 2) {
        setTurn(22);
        addMatchLogEntry(
          'Match Finished!'
        );
      }
    }
    setTotalTurns(totalTurns + 1);
    setRemainingMovements(3);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const circle = newGrid[i][j];
          if (circle && circle.turnsDisabled > 0) {
            // Update turnsDisabled property
            newGrid[i][j] = { ...circle, turnsDisabled: circle.turnsDisabled - 1 };
          }
        }
      }
      return newGrid;
    });
  };

  const handlePassingButtons = (isPass) => {
    if (isPass) {
      if (team === 1){
        setTeam1PassesCompleted(team1PassesCompleted + 1);
        setShowTeamWithPossession(1);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} makes a successful pass that had ${(passValues[passSelectedValue] * 100).toFixed(0)}% chance of success`
        );
      }
      else if (team === 2){
        setTeam2PassesCompleted(team2PassesCompleted + 1);
        setShowTeamWithPossession(2);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} makes a successful pass that had ${(passValues[passSelectedValue] * 100).toFixed(0)}% chance of success`
        );
      }
    }

    if (team === 1){
      setTeam1PassesAttempts(team1PassesAttempts + 1);
    }
    else if (team === 2){
      setTeam2PassesAttempts(team2PassesAttempts + 1);
    }

    if (!isPass){
      if (team === 1){
        setShowTeamWithPossession(2);
        setRemainingMovements(-1);
        setIsPossessionTeam1(!isPossessionTeam1);
        setTeamWithPossession(2);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} turns over the ball after a bad pass that had ${(passValues[passSelectedValue] * 100).toFixed(0)}% chance of success. (automatic turn change)`
        );
      }
      else if (team === 2){
        setShowTeamWithPossession(1);
        setRemainingMovements(-1);
        setIsPossessionTeam1(!isPossessionTeam1);
        setTeamWithPossession(1);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} turns over the ball after a bad pass that had ${(passValues[passSelectedValue] * 100).toFixed(0)}% chance of success. (automatic turn change)`
        );
      }
    }
  }

  const handleTacklingButtons = (isTackle) => {
    if (isTackle) {
      if (team === 1) {
        setTeam1TacklesCompleted(team1TacklesCompleted + 1);
        setShowTeamWithPossession(1);
        setIsPossessionTeam1(!isPossessionTeam1);
        setTeamWithPossession(1);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} wins the ball back after a tackle with ${(xGValues[selectedValue] * 100).toFixed(0)}% chance of success.`
        );
      }
      else if (team === 2) {
        setTeam2TacklesCompleted(team2TacklesCompleted + 1);
        setShowTeamWithPossession(2);
        setIsPossessionTeam1(!isPossessionTeam1);
        setTeamWithPossession(2);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} wins the ball back after a tackle with ${(xGValues[selectedValue] * 100).toFixed(0)}% chance of success.`
        );
      }
    }
    if (team === 1) {
      setTeam1TacklesAttempts(team1TacklesAttempts + 1);
    }
    if (team === 2){
      setTeam2TacklesAttempts(team2TacklesAttempts + 1);
    }

    if (!isTackle) {
      if (team === 1) {
        setShowTeamWithPossession(2);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} does not win the ball back after a tackle with ${(xGValues[selectedValue] * 100).toFixed(0)}% chance of success`
        );
      }
      else if (team === 2) {
        setShowTeamWithPossession(1);
        addMatchLogEntry(
          `Turn ${turn} Team ${team}: Team ${team} does not win the ball back after a tackle with ${(xGValues[selectedValue] * 100).toFixed(0)}% chance of success`
        );
      }
    }
  }

  const handleDribblingButtons = (isDribble) => {
    if (isDribble) {
      if (team === 1) {
        setTeam1DribblesCompleted(team1DribblesCompleted + 1);
        setShowTeamWithPossession(1);
      }
      else if (team === 2) {
        setTeam2DribblesCompleted(team2DribblesCompleted + 1);
        setShowTeamWithPossession(2);
      }
    }
    if (team === 1) {
      setTeam1DribblesAttempts(team1DribblesAttempts + 1);
    }
    else if (team === 2) {
      setTeam2DribblesAttempts(team2DribblesAttempts + 1);
    }

    if (!isDribble) {
      if (team === 1) {
        setShowTeamWithPossession(2);
        setRemainingMovements(-1);
        setIsPossessionTeam1(!isPossessionTeam1);
        setTeamWithPossession(2);
      }
      else if (team === 2) {
        setShowTeamWithPossession(1)
        setRemainingMovements(-1);
        setIsPossessionTeam1(!isPossessionTeam1);
        setTeamWithPossession(1);
      }
    }
  }

  const isGameEnded = turn === 22;

  const handleStatsClick = () => {
    setDisplaySection('stats');
  };

  const handleLogClick = () => {
    setDisplaySection('log');
  };

  // Grid
  

  useEffect(() => {
    // Initialize the game board with circles in specific squares
    
    const newGrid = Array.from({ length: numRows }, () => Array(numCols).fill(null));
    // Set circles in specific squares
    newGrid[8][0] = { team: 1, name: 'VonMeerSalz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Paw', 'Gladiator', 'Playmaker'] };
    newGrid[2][4] = { team: 1, name: 'CRadolno', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Rabbit', 'Viper', 'Black Archer', 'Black Wizard', 'Black Cannon'] };
    newGrid[15][4] = {team: 1, name: 'Art', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Playmaker', 'Wizard']};
    newGrid[9][3] = {team: 1, name: 'Keens', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Black Gladiator', 'Playmaker']};
    newGrid[7][7] = {team: 1, name: 'VanBindelrooy', hasBall: true, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Wizard', 'Black Viper', 'Black Cannon', 'Ram']};
    newGrid[9][6] = {team: 1, name: 'Romeny', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Wizard', 'Viper', 'Black Cannon']};
    newGrid[8][3] = {team: 1, name: 'Shovels', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Black Playmaker', 'Black Archer', 'Black Cannon', 'Ram']};
    newGrid[3][2] = {team: 1, name: 'Bronze', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gladiator']};
    newGrid[7][2] = {team: 1, name: 'Silberves', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Tractor', 'Gladiator']};
    newGrid[10][2] = {team: 1, name: 'Fremant', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Tractor', 'Black Gladiator', 'Playmaker', 'Ram']};
    newGrid[14][2] = {team: 1, name: 'Hentz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gladiator', 'Archer', 'Ram']};
    newGrid[9][15] = { team: 2, name: 'Marsillas', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Paw', 'Black Gladiator'] };
    newGrid[6][11] = { team: 2, name: 'Ziderm', hasBall: false, turnsDisabled: 0, gm: false, skills: [ 'Tractor', 'Black Playmaker', 'Black Archer', 'Black Wizard', 'Black Cannon'] };
    newGrid[7][13] = { team: 2, name: 'Rasmoz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Gladiator', 'Ram'] };
    newGrid[7][9] = { team: 2, name: 'Radolno', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Black Wizard', 'Black Cannon', 'Black Viper'] };
    newGrid[10][13] = { team: 2, name: 'Boomwhale', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gladiator', 'Ram'] };
    newGrid[3][13] = { team: 2, name: 'Santiago', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Wizard'] };
    newGrid[14][13] = { team: 2, name: 'Larcos', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Rabbit', 'Black Archer', 'Wizard', 'Black Cannon'] };
    newGrid[11][11] = { team: 2, name: 'Yuti', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Playmaker', 'Archer', 'Wizard'] };
    newGrid[8][12] = { team: 2, name: 'Gammelsen', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gorilla', 'Gladiator', 'Canon'] };
    newGrid[9][12] = { team: 2, name: 'Backpam', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Black Playmaker', 'Black Archer', 'Black Cannon'] };
    newGrid[9][9] = { team: 2, name: 'Rajol', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Playmaker', 'Wizard', 'Black Viper'] };

    setGrid(newGrid);
  }, [numRows, numCols]);

  const team1GoalGrid = Array.from({ length: numRows }, () => Array(numCols).fill(null));

    team1GoalGrid[8][0] = { team: 1, name: 'VonMeerSalz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Paw', 'Gladiator', 'Playmaker'] }
    team1GoalGrid[2][4] = { team: 1, name: 'CRadolno', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Rabbit', 'Viper', 'Black Archer', 'Black Wizard', 'Black Cannon'] };
    team1GoalGrid[15][4] = {team: 1, name: 'Art', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Playmaker', 'Wizard']};
    team1GoalGrid[9][3] = {team: 1, name: 'Keens', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Black Gladiator', 'Playmaker']};
    team1GoalGrid[7][6] = {team: 1, name: 'VanBindelrooy', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Wizard', 'Black Viper', 'Black Cannon', 'Ram']};
    team1GoalGrid[9][6] = {team: 1, name: 'Romeny', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Wizard', 'Viper', 'Black Cannon']};
    team1GoalGrid[8][3] = {team: 1, name: 'Shovels', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Black Playmaker', 'Black Archer', 'Black Cannon', 'Ram']};
    team1GoalGrid[3][2] = {team: 1, name: 'Bronze', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gladiator']};
    team1GoalGrid[7][2] = {team: 1, name: 'Silberves', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Tractor', 'Gladiator']};
    team1GoalGrid[10][2] = {team: 1, name: 'Fremant', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Tractor', 'Black Gladiator', 'Playmaker', 'Ram']};
    team1GoalGrid[14][2] = {team: 1, name: 'Hentz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gladiator', 'Archer', 'Ram']};
    team1GoalGrid[9][15] = { team: 2, name: 'Marsillas', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Paw', 'Black Gladiator'] };
    team1GoalGrid[6][11] = { team: 2, name: 'Ziderm', hasBall: false, turnsDisabled: 0, gm: false, skills: [ 'Tractor', 'Black Playmaker', 'Black Archer', 'Black Wizard', 'Black Cannon'] };
    team1GoalGrid[7][13] = { team: 2, name: 'Rasmoz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Gladiator', 'Ram'] };
    team1GoalGrid[7][8] = { team: 2, name: 'Radolno', hasBall: true, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Black Wizard', 'Black Cannon', 'Black Viper'] };
    team1GoalGrid[10][13] = { team: 2, name: 'Boomwhale', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gladiator', 'Ram'] };
    team1GoalGrid[3][13] = { team: 2, name: 'Santiago', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Wizard'] };
    team1GoalGrid[14][13] = { team: 2, name: 'Larcos', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Rabbit', 'Black Archer', 'Wizard', 'Black Cannon'] };
    team1GoalGrid[11][11] = { team: 2, name: 'Yuti', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Playmaker', 'Archer', 'Wizard'] };
    team1GoalGrid[8][12] = { team: 2, name: 'Gammelsen', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gorilla', 'Gladiator', 'Canon'] };
    team1GoalGrid[9][12] = { team: 2, name: 'Backpam', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Black Playmaker', 'Black Archer', 'Black Cannon'] };
    team1GoalGrid[9][9] = { team: 2, name: 'Rajol', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Playmaker', 'Wizard', 'Black Viper'] };

    const team2GoalGrid = Array.from({ length: numRows }, () => Array(numCols).fill(null));

    team2GoalGrid[8][0] = { team: 1, name: 'VonMeerSalz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Paw', 'Gladiator', 'Playmaker'] }
    team2GoalGrid[2][4] = { team: 1, name: 'CRadolno', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Rabbit', 'Viper', 'Black Archer', 'Black Wizard', 'Black Cannon'] };
    team2GoalGrid[15][4] = {team: 1, name: 'Art', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Playmaker', 'Wizard']};
    team2GoalGrid[9][3] = {team: 1, name: 'Keens', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Black Gladiator', 'Playmaker']};
    team2GoalGrid[7][7] = {team: 1, name: 'VanBindelrooy', hasBall: true, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Wizard', 'Black Viper', 'Black Cannon', 'Ram']};
    team2GoalGrid[9][6] = {team: 1, name: 'Romeny', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Wizard', 'Viper', 'Black Cannon']};
    team2GoalGrid[8][3] = {team: 1, name: 'Shovels', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Black Playmaker', 'Black Archer', 'Black Cannon', 'Ram']};
    team2GoalGrid[3][2] = {team: 1, name: 'Bronze', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gladiator']};
    team2GoalGrid[7][2] = {team: 1, name: 'Silberves', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Tractor', 'Gladiator']};
    team2GoalGrid[10][2] = {team: 1, name: 'Fremant', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Tractor', 'Black Gladiator', 'Playmaker', 'Ram']};
    team2GoalGrid[14][2] = {team: 1, name: 'Hentz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gladiator', 'Archer', 'Ram']};
    team2GoalGrid[9][15] = { team: 2, name: 'Marsillas', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Paw', 'Black Gladiator'] };
    team2GoalGrid[6][11] = { team: 2, name: 'Ziderm', hasBall: false, turnsDisabled: 0, gm: false, skills: [ 'Tractor', 'Black Playmaker', 'Black Archer', 'Black Wizard', 'Black Cannon'] };
    team2GoalGrid[7][13] = { team: 2, name: 'Rasmoz', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gorilla', 'Gladiator', 'Ram'] };
    team2GoalGrid[7][9] = { team: 2, name: 'Radolno', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Rabbit', 'Black Wizard', 'Black Cannon', 'Black Viper'] };
    team2GoalGrid[10][13] = { team: 2, name: 'Boomwhale', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Gladiator', 'Ram'] };
    team2GoalGrid[3][13] = { team: 2, name: 'Santiago', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Wizard'] };
    team2GoalGrid[14][13] = { team: 2, name: 'Larcos', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Rabbit', 'Black Archer', 'Wizard', 'Black Cannon'] };
    team2GoalGrid[11][11] = { team: 2, name: 'Yuti', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Black Playmaker', 'Archer', 'Wizard'] };
    team2GoalGrid[8][12] = { team: 2, name: 'Gammelsen', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Gorilla', 'Gladiator', 'Canon'] };
    team2GoalGrid[9][12] = { team: 2, name: 'Backpam', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Black Playmaker', 'Black Archer', 'Black Cannon'] };
    team2GoalGrid[9][9] = { team: 2, name: 'Rajol', hasBall: false, turnsDisabled: 0, gm: false, skills: ['Tractor', 'Playmaker', 'Wizard', 'Black Viper'] };

  const isPathClear = (start, end, currentGrid) => {
    const rowDiff = Math.abs(start.row - end.row);
    const colDiff = Math.abs(start.col - end.col);
    const step = Math.max(rowDiff, colDiff);
  
    for (let i = 1; i <= step; i++) {
      const interpRow = Math.round(start.row + i / step * (end.row - start.row));
      const interpCol = Math.round(start.col + i / step * (end.col - start.col));
  
      if (currentGrid[interpRow][interpCol]) {
        return false; // Occupied square in the path
      }
    }
  
    return true; // Path is clear
  };
  
  const isDefaultOccupiedSquare = (row, col) => {
    return (row === 0 && col === 0) ||
    (row === 0 && col === 1) ||
    (row === 0 && col === 2) ||
    (row === 0 && col === 3) ||
    (row === 0 && col === 4) ||
    (row === 0 && col === 5) ||
    (row === 0 && col === 6) ||
    (row === 0 && col === 7) ||
    (row === 0 && col === 8) ||
    (row === 0 && col === 9) ||
    (row === 0 && col === 10) ||
    (row === 0 && col === 11) ||
    (row === 0 && col === 12) ||
    (row === 0 && col === 13) ||
    (row === 0 && col === 14) ||
    (row === 0 && col === 15) ||
    (row === 1 && col === 15) ||
    (row === 2 && col === 15) ||
    (row === 3 && col === 15) ||
    (row === 4 && col === 15) ||
    (row === 5 && col === 15) ||
    (row === 6 && col === 15) ||
    (row === 7 && col === 15) ||
    (row === 10 && col === 15) ||
    (row === 11 && col === 15) ||
    (row === 12 && col === 15) ||
    (row === 13 && col === 15) ||
    (row === 14 && col === 15) ||
    (row === 15 && col === 15) ||
    (row === 16 && col === 15) ||
    (row === 17 && col === 15) ||
    (row === 17 && col === 14) ||
    (row === 17 && col === 13) ||
    (row === 17 && col === 12) ||
    (row === 17 && col === 11) ||
    (row === 17 && col === 10) ||
    (row === 17 && col === 9) ||
    (row === 17 && col === 8) ||
    (row === 17 && col === 7) ||
    (row === 17 && col === 6) ||
    (row === 17 && col === 5) ||
    (row === 17 && col === 4) ||
    (row === 17 && col === 3) ||
    (row === 17 && col === 2) ||
    (row === 17 && col === 1) ||
    (row === 17 && col === 0) ||
    (row === 16 && col === 0) ||
    (row === 15 && col === 0) ||
    (row === 14 && col === 0) ||
    (row === 13 && col === 0) ||
    (row === 12 && col === 0) ||
    (row === 11 && col === 0) ||
    (row === 10 && col === 0) ||
    (row === 7 && col === 0) ||
    (row === 6 && col === 0) ||
    (row === 5 && col === 0) ||
    (row === 4 && col === 0) ||
    (row === 3 && col === 0) ||
    (row === 2 && col === 0) ||
    (row === 1 && col === 0);
  };
  
  const shootingSquaresTeam1 = (row, col) => {
    return (row === 7 && col === 14) ||
    (row === 8 && col === 14) ||
    (row === 9 && col === 14) ||
    (row === 10 && col === 14) ||
    (row === 6 && col === 13) ||
    (row === 7 && col === 13) ||
    (row === 8 && col === 13) ||
    (row === 9 && col === 13) ||
    (row === 10 && col === 13) ||
    (row === 11 && col === 13) ||
    (row === 5 && col === 12) ||
    (row === 6 && col === 12) ||
    (row === 7 && col === 12) ||
    (row === 8 && col === 12) ||
    (row === 9 && col === 12) ||
    (row === 10 && col === 12) ||
    (row === 11 && col === 12) ||
    (row === 12 && col === 12) ||
    (row === 6 && col === 11) ||
    (row === 7 && col === 11) ||
    (row === 8 && col === 11) ||
    (row === 9 && col === 11) ||
    (row === 10 && col === 11) ||
    (row === 11 && col === 11)
  };

  const shootingSquaresTeam2 = (row, col) => {
    return (row === 7 && col === 1) ||
    (row === 8 && col === 1) ||
    (row === 9 && col === 1) ||
    (row === 10 && col === 1) ||
    (row === 6 && col === 2) ||
    (row === 7 && col === 2) ||
    (row === 8 && col === 2) ||
    (row === 9 && col === 2) ||
    (row === 10 && col === 2) ||
    (row === 11 && col === 2) ||
    (row === 5 && col === 3) ||
    (row === 6 && col === 3) ||
    (row === 7 && col === 3) ||
    (row === 8 && col === 3) ||
    (row === 9 && col === 3) ||
    (row === 10 && col === 3) ||
    (row === 11 && col === 3) ||
    (row === 12 && col === 3) ||
    (row === 6 && col === 4) ||
    (row === 7 && col === 4) ||
    (row === 8 && col === 4) ||
    (row === 9 && col === 4) ||
    (row === 10 && col === 4) ||
    (row === 11 && col === 4)
  };

  const handleSquareClick = (row, col) => {
    console.log(`Clicked square: ${row} ${col}`);
    const clickedCircleInfo = grid[row]?.[col];

    if ((row === 0 || row === 17) && remainingMovements > 0){
      setGroupMove(true);
      setDisplayButtons('dirButtons');
      if (col === 1 || col === 2) {
      for (let i = 1; i < 17; i++) {
        for (let j = 1; j < 3; j++) {
          if (grid[i][j]?.team === team) {
            setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              newGrid[i][j] = {
                ...grid[i][j],
                gm: true,
              };
              return newGrid;
            });
          }
        }
      }
    } else if (col === 3 || col === 4) {
      for (let i = 1; i < 17; i++) {
        for (let j = 3; j < 5; j++) {
          if (grid[i][j]?.team === team) {
            setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              newGrid[i][j] = {
                ...grid[i][j],
                gm: true,
              };
              return newGrid;
            });
          }
        }
      }
    } else if (col === 5 || col === 6) {
      for (let i = 1; i < 17; i++) {
        for (let j = 5; j < 7; j++) {
          if (grid[i][j]?.team === team) {
            setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              newGrid[i][j] = {
                ...grid[i][j],
                gm: true,
              };
              return newGrid;
            });
          }
        }
      }
    } else if (col === 7 || col === 8) {
      for (let i = 1; i < 17; i++) {
        for (let j = 7; j < 9; j++) {
          if (grid[i][j]?.team === team) {
            setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              newGrid[i][j] = {
                ...grid[i][j],
                gm: true,
              };
              return newGrid;
            });
          }
        }
      }
    } else if (col === 9 || col === 10) {
      for (let i = 1; i < 17; i++) {
        for (let j = 9; j < 11; j++) {
          if (grid[i][j]?.team === team) {
            setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              newGrid[i][j] = {
                ...grid[i][j],
                gm: true,
              };
              return newGrid;
            });
          }
        }
      }
    } else if (col === 11 || col === 12) {
      for (let i = 1; i < 17; i++) {
        for (let j = 11; j < 13; j++) {
          if (grid[i][j]?.team === team) {
            setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              newGrid[i][j] = {
                ...grid[i][j],
                gm: true,
              };
              return newGrid;
            });
          }
        }
      }
    } else if (col === 13 || col === 14) {
      for (let i = 1; i < 17; i++) {
        for (let j = 13; j < 15; j++) {
          if (grid[i][j]?.team === team) {
            setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              newGrid[i][j] = {
                ...grid[i][j],
                gm: true,
              };
              return newGrid;
            });
          }
        }
      }
    }
    };

    if (selectedCircle && selectedCircle.row === row && selectedCircle.col === col) {
      console.log("Clicked on the same circle. Reverting selection.");
      setSelectedCircle(null);
      setPassing(false); // Reset passing state if needed
      return;
    }

    if (selectedCircle) {
      const selectedCircleInfo = grid[selectedCircle.row]?.[selectedCircle.col];
      console.log("Selecting circle...");
      console.log("Selected circle info:", selectedCircleInfo);
      console.log("Clicked circle info:", clickedCircleInfo);
      const shootingSquareTeam1 = { row: 8, col: 15 };
      const shootingSquareTeam2 = { row: 9, col: 0 };
      if (selectedCircleInfo.turnsDisabled > 0) {
        console.log('This circle cannot move for ', selectedCircleInfo.turnsDisabled, ' turns');
        return;
      };
      if (isDefaultOccupiedSquare(row, col)) {
        console.log("Cannot move to an occupied square!");
        return;
      }
    else if (
      selectedCircleInfo.hasBall &&
      selectedCircleInfo.team === 1 &&
      row === shootingSquareTeam1.row &&
      col === shootingSquareTeam1.col &&
      remainingMovements > 0 &&
      !groupMove
    ) {
      console.log("Shooting for Team 1...");
      // Handle shooting for Team 1
      const block = grid[selectedCircle.row][selectedCircle.col+1];
      const dice1 = (Math.floor(Math.random() * 6) + 1);
      const dice2 = (Math.floor(Math.random() * 6) + 1);
      let coeff = 0;
      let diceResult1 = dice1;
      let diceResult2 = dice2;
      if ((selectedCircle.row === 6 || selectedCircle.row === 11 ) && selectedCircle.col === 11) {
        diceResult1 -= 4;
        coeff -= 4
      } else if (((selectedCircle.row === 7 || selectedCircle.row === 10 ) && (selectedCircle.col === 11)) || ((selectedCircle.row === 5 || selectedCircle.row === 12 ) && selectedCircle.col === 12)) {
        diceResult1 -= 3;
        coeff -= 3;
      } else if (((selectedCircle.row === 8 || selectedCircle.row === 9 ) && (selectedCircle.col === 11)) || ((selectedCircle.row === 6 || selectedCircle.row === 11 ) && selectedCircle.col === 12)) {
        diceResult1 -= 2;
        coeff -= 2;
      } else if ((selectedCircle.row === 7 || selectedCircle.row === 10 ) && selectedCircle.col === 12) {
        diceResult1 -= 1;
        coeff -= 2;
      } else if (((selectedCircle.row === 6 || selectedCircle.row === 11 ) && selectedCircle.col === 13) || ((selectedCircle.row === 8 || selectedCircle.row === 9 ) && selectedCircle.col === 12)) {
        diceResult1 += 0;
      } else if ((selectedCircle.row === 7 || selectedCircle.row === 10 ) && selectedCircle.col === 13) {
        diceResult1 += 1;
        coeff += 1;
      } else if ((selectedCircle.row === 8 || selectedCircle.row === 9 ) && selectedCircle.col === 13) {
        diceResult1 += 2;
        coeff += 2;
      } else if ((selectedCircle.row === 7 || selectedCircle.row === 10 ) && selectedCircle.col === 14) {
        diceResult1 += 3;
        coeff += 3;
      } else if ((selectedCircle.row === 8 || selectedCircle.row === 9 ) && selectedCircle.col === 14) {
        diceResult1 += 4;
        coeff += 4;
      } else {
        return;
      }
      if (((selectedCircle.row === 6 || selectedCircle.row === 7 || selectedCircle.row === 8 || selectedCircle.row === 9 || selectedCircle.row === 10 || selectedCircle.row === 11) && selectedCircle.col === 11) ||
      ((selectedCircle.row === 5 || selectedCircle.row === 6 || selectedCircle.row === 7 || selectedCircle.row === 8 || selectedCircle.row === 9 || selectedCircle.row === 10 || selectedCircle.row === 11 || selectedCircle.row === 12) && selectedCircle.col === 12)) {
        if (selectedCircleInfo.skills?.includes('Cannon')) {
          diceResult1 += 1;
          coeff += 1;
        } else if (selectedCircleInfo.skills?.includes('Black Cannon')) {
          diceResult1 +=2;
          coeff +=2;
        }
      }
      if (((selectedCircle.row === 6 || selectedCircle.row === 7 || selectedCircle.row === 8 || selectedCircle.row === 9 || selectedCircle.row === 10 || selectedCircle.row === 11) && selectedCircle.col === 13) ||
      (( selectedCircle.row === 7 || selectedCircle.row === 8 || selectedCircle.row === 9 || selectedCircle.row === 10 ) && selectedCircle.col === 14)) {
        if (selectedCircleInfo.skills?.includes('Viper')) {
          diceResult1 += 1;
          coeff += 1;
        } else if (selectedCircleInfo.skills?.includes('Black Viper')) {
          diceResult1 +=2;
          coeff +=2;
        }
      }
      if (grid[9][15].skills?.includes('Paw')) {
        diceResult2 += 1;
        coeff -= 1;
      } else if (grid[9][15].skills?.includes('Black Paw')) {
        diceResult2 += 2;
        coeff -= 2;
      }
      if (block && !(selectedCircle.row === 9 && selectedCircle.col === 14)) {
        diceResult1 -= 1;
        coeff -= 1;
      }
      if ((selectedCircleInfo.team === 1 && (diceResult1 >= diceResult2)) ||
              (selectedCircleInfo.team === 2 && (diceResult2 >= diceResult1))) {
                setGrid(team1GoalGrid);
                console.log('shooting cef: ', coeff);
                const coeffValue = coeff.toString();
                setTeam1xG(team1xG + xGValues[coeffValue]);
                setCoeff(coeff);
      handleShootingButtons(true);
      setDiceResult1(dice1);
            setDiceResult2(dice2);
            setModDiceResult1(diceResult1);
            setModDiceResult2(diceResult2);
      setRemainingMovements(3);
      setSelectedCircle(null);
      return team1GoalGrid;
    } else if ((selectedCircleInfo.team === 1 && (diceResult2 > diceResult1)) ||
      (selectedCircleInfo.team === 2 && (diceResult1 > diceResult2))) {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          const prevCircle = { ...newGrid[row + 1][col] }
          newGrid[selectedCircle.row][selectedCircle.col] = {
            ...selectedCircleInfo,
            hasBall: false,
          };
          newGrid[row + 1][col] = { ...prevCircle, hasBall: true };
          console.log('shooting cef: ', coeff);
          const coeffValue = coeff.toString();
          setTeam1xG(team1xG + xGValues[coeffValue]);
          handleShootingButtons(false);
          return newGrid;
        });
        setCoeff(coeff);
        setDiceResult1(dice1);
              setDiceResult2(dice2);
              setModDiceResult1(diceResult1);
              setModDiceResult2(diceResult2);
        setRemainingMovements(remainingMovements - 1);
        setSelectedCircle(null);
      }
    } else if (
      selectedCircleInfo.hasBall &&
      selectedCircleInfo.team === 2 &&
      row === shootingSquareTeam2.row &&
      col === shootingSquareTeam2.col &&
      remainingMovements > 0 &&
      !groupMove
    ) {
      console.log("Shooting for Team 2...");
      // Handle shooting for Team 2
      const block = grid[selectedCircle.row][selectedCircle.col-1];
      console.log('blocking: ', block);
      const dice1 = (Math.floor(Math.random() * 6) + 1);
      const dice2 = (Math.floor(Math.random() * 6) + 1);
      let coeff = 0;
      let diceResult1 = dice1;
      let diceResult2 = dice2;
      if ((selectedCircle.row === 6 || selectedCircle.row === 11 ) && selectedCircle.col === 4) {
        diceResult2 -= 4;
        coeff -= 4;
      } else if (((selectedCircle.row === 7 || selectedCircle.row === 10 ) && (selectedCircle.col === 4)) || ((selectedCircle.row === 5 || selectedCircle.row === 12 ) && selectedCircle.col === 3)) {
        diceResult2 -= 3;
        coeff -= 3;
      } else if (((selectedCircle.row === 8 || selectedCircle.row === 9 ) && (selectedCircle.col === 4)) || ((selectedCircle.row === 6 || selectedCircle.row === 11 ) && selectedCircle.col === 3)) {
        diceResult2 -= 2;
        coeff -= 2;
      } else if ((selectedCircle.row === 7 || selectedCircle.row === 10 ) && selectedCircle.col === 3) {
        diceResult2 -= 1;
        coeff -= 1;
      } else if (((selectedCircle.row === 6 || selectedCircle.row === 11 ) && selectedCircle.col === 2) || ((selectedCircle.row === 8 || selectedCircle.row === 9 ) && selectedCircle.col === 3)) {
        diceResult2 += 0;
      } else if ((selectedCircle.row === 7 || selectedCircle.row === 10 ) && selectedCircle.col === 2) {
        diceResult2 += 1;
        coeff += 1;
      } else if ((selectedCircle.row === 8 || selectedCircle.row === 9 ) && selectedCircle.col === 2) {
        diceResult2 += 2;
        coeff += 2;
      } else if ((selectedCircle.row === 7 || selectedCircle.row === 10 ) && selectedCircle.col === 1) {
        diceResult2 += 3;
        coeff += 3;
      } else if ((selectedCircle.row === 8 || selectedCircle.row === 9 ) && selectedCircle.col === 1) {
        diceResult2 += 4;
        coeff += 4;
      } else {
        return;
      }
      console.log('dice2 after position: ', diceResult2);
      if (((selectedCircle.row === 6 || selectedCircle.row === 7 || selectedCircle.row === 8 || selectedCircle.row === 9 || selectedCircle.row === 10 || selectedCircle.row === 11) && selectedCircle.col === 4) ||
      ((selectedCircle.row === 5 || selectedCircle.row === 6 || selectedCircle.row === 7 || selectedCircle.row === 8 || selectedCircle.row === 9 || selectedCircle.row === 10 || selectedCircle.row === 11 || selectedCircle.row === 12) && selectedCircle.col === 3)) {
        if (selectedCircleInfo.skills?.includes('Cannon')) {
          diceResult2 += 1;
          coeff += 1;
        } else if (selectedCircleInfo.skills?.includes('Black Cannon')) {
          diceResult2 +=2 ;
          coeff +=2 ;
        }
      }
      if (((selectedCircle.row === 6 || selectedCircle.row === 7 || selectedCircle.row === 8 || selectedCircle.row === 9 || selectedCircle.row === 10 || selectedCircle.row === 11) && selectedCircle.col === 2) ||
      (( selectedCircle.row === 7 || selectedCircle.row === 8 || selectedCircle.row === 9 || selectedCircle.row === 10 ) && selectedCircle.col === 1)) {
        if (selectedCircleInfo.skills?.includes('Viper')) {
          diceResult2 += 1;
          coeff += 1;
        } else if (selectedCircleInfo.skills?.includes('Black Viper')) {
          diceResult2 +=2 ;
          coeff +=2 ;
        }
      }
      console.log('dice2 after skills: ', diceResult2);
      if (grid[8][0].skills?.includes('Paw')) {
        diceResult1 += 1;
        coeff -= 1;
      } else if (grid[8][0].skills?.includes('Black Paw')) {
        diceResult1 += 2;
        coeff -= 2;
      }
      if (block && !(selectedCircle.row === 8 && selectedCircle.col === 1)) {
        diceResult2 -= 1;
        coeff -= 1;
      }
      console.log('dice2 after block: ', diceResult2);
      if ((selectedCircleInfo.team === 1 && (diceResult1 >= diceResult2)) ||
              (selectedCircleInfo.team === 2 && (diceResult2 >= diceResult1))) {
                setGrid(team2GoalGrid);
                const coeffValue = coeff.toString();
                setTeam2xG(team2xG + xGValues[coeffValue]);
                setCoeff(coeff);
                handleShootingButtons(true);
                setDiceResult1(dice1);
                      setDiceResult2(dice2);
                      setModDiceResult1(diceResult1);
                      setModDiceResult2(diceResult2);
                setRemainingMovements(3);
                setSelectedCircle(null);
                return team2GoalGrid;}
      else if ((selectedCircleInfo.team === 1 && (diceResult2 > diceResult1)) ||
      (selectedCircleInfo.team === 2 && (diceResult1 > diceResult2))) {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          const prevCircle = { ...newGrid[row - 1][col] }
          newGrid[selectedCircle.row][selectedCircle.col] = {
            ...selectedCircleInfo,
            hasBall: false,
          };
          newGrid[row - 1][col] = { ...prevCircle, hasBall: true };
          const coeffValue = coeff.toString();
                setTeam2xG(team2xG + xGValues[coeffValue]);
                setCoeff(coeff);
          handleShootingButtons(false);
          return newGrid;
        });
        setDiceResult1(dice1);
              setDiceResult2(dice2);
              setModDiceResult1(diceResult1);
              setModDiceResult2(diceResult2);
        setRemainingMovements(remainingMovements - 1);
        setSelectedCircle(null);
      }
    }

      else if (selectedCircleInfo.team !== team) {
        console.log("Cannot select a circle from the opposing team on this turn!");
        setSelectedCircle(null);
        return;
      }

      else if (
        passing &&
        selectedCircleInfo.team === team &&
        selectedCircleInfo.hasBall &&
        clickedCircleInfo &&
        clickedCircleInfo.team === team &&
        !clickedCircleInfo.hasBall &&
        clickedCircleInfo.turnsDisabled <= 0 &&
        remainingMovements > 0 &&
        !groupMove
      ) {
        console.log("Passing...");
        // Handle passing
        const dice1 = (Math.floor(Math.random() * 6) + 1);
        const dice2 = (Math.floor(Math.random() * 6) + 1);
        let diceResult1 = dice1;
        let diceResult2 = dice2;
        let coeff = 0;
        const distance = ((Math.abs(selectedCircle.row - row) + Math.abs(selectedCircle.col - col))/5).toFixed(0);
        coeff = distance * 1;
        console.log('Distance: ', distance);
        if (selectedCircleInfo.team === 1) {

        if (selectedCircleInfo.skills?.includes('Playmaker')) {
          diceResult1 += 1;
          coeff -= 1;
          console.log('Playmaker bonus: ', diceResult1);
        } else if (selectedCircleInfo.skills?.includes('Black Playmaker')) {
          diceResult1 += 2;
          coeff -= 2;
          console.log('Black Playmaker bonus: ', diceResult1);
        }
        if (grid[row - 1][col - 1]?.team === 2)  {
          diceResult1 -= 1;
          coeff += 1;
          console.log ('covered at: ', grid[row - 1][col - 1]);
        }
        if (grid[row - 1][col]?.team === 2)  {
          diceResult1 -= 1;
          coeff += 1;
          console.log ('covered at: ', grid[row - 1][col]);
        }
        if (grid[row - 1][col + 1]?.team === 2)  {
          diceResult1 -= 1;
          coeff += 1;
          console.log ('covered at: ', grid[row - 1][col + 1]);
        }
        if (grid[row][col + 1]?.team === 2)  {
          console.log ('covered at: ', grid[row][col + 1]);
          coeff += 1;
          diceResult1 -= 1;
        }
        if (grid[row + 1][col]?.team === 2)  {
          diceResult1 -= 1;
          coeff += 1;
          console.log ('covered at: ', grid[row + 1][col]);
        }
        if (grid[row + 1][col - 1]?.team === 2)  {
          diceResult1 -= 1;
          coeff += 1;
          console.log ('covered at: ', grid[row + 1][col - 1]);
        }
        if (grid[row + 1][col + 1]?.team === 2)  {
          diceResult1 -= 1;
          coeff += 1;
          console.log ('covered at: ', grid[row + 1][col + 1]);
        }
        if (grid[row][col - 1]?.team === 2)  {
          console.log ('covered at: ', grid[row][col - 1]);
          coeff += 1;
          diceResult1 -= 1;
        }
        if (diceResult1 >= distance) {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[selectedCircle.row][selectedCircle.col] = { ...selectedCircleInfo, hasBall: false };
          newGrid[row][col] = { ...clickedCircleInfo, hasBall: true };
          handlePassingButtons(true);
          return newGrid;
        });
        setDiceResult1(dice1);
        setModDiceResult1(diceResult1);
        setCoeff(coeff);
        setPassing(false); // Reset passing state after a successful pass
        setRemainingMovements(remainingMovements - 1);
        setSelectedCircle(null);}
        else if (diceResult1 < distance) {
          // Find the closest opponent circle and update newGrid
          const opponentCircles = [];
          for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
              const circle = grid[i][j];
              if (circle && circle.team !== team && !circle.hasBall) {
                opponentCircles.push({ row: i, col: j, distance: Math.abs(row - i) + Math.abs(col - j) });
              }
            }
          }
          
          opponentCircles.sort((a, b) => a.distance - b.distance);
          console.log ('Opp circles: ', opponentCircles);
          const closestOpponent = opponentCircles[0];
          console.log('closest Opponent: ', closestOpponent);
          
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[selectedCircle.row][selectedCircle.col] = { ...selectedCircleInfo, hasBall: false };
            newGrid[closestOpponent.row][closestOpponent.col] = { ...grid[closestOpponent.row][closestOpponent.col], hasBall: true };
            handlePassingButtons(false);
            return newGrid;
          });
          setCoeff(coeff);
          setDiceResult1(dice1);
          setModDiceResult1(diceResult1);
          setSelectedCircle(null);
        }} else if (selectedCircleInfo.team === 2) {

          if (selectedCircleInfo.skills?.includes('Playmaker')) {
            diceResult2 += 1
            coeff += 1
            console.log('Playmaker bonus: ', diceResult2);
          } else if (selectedCircleInfo.skills?.includes('Black Playmaker')) {
            diceResult2 += 2
            coeff += 2
            console.log('Black Playmaker bonus: ', diceResult2);
          }

          if (grid[row - 1][col - 1]?.team === 1)  {
            diceResult2 -= 1;
            coeff -= 1;
            console.log ('covered at: ', grid[row - 1][col - 1]);
          }
          if (grid[row - 1][col]?.team === 1)  {
            diceResult2 -= 1;
            coeff -= 1;
            console.log ('covered at: ', grid[row - 1][col]);
          }
          if (grid[row - 1][col + 1]?.team === 1)  {
            diceResult2 -= 1;
            coeff -= 1;
            console.log ('covered at: ', grid[row - 1][col + 1]);
          }
          if (grid[row][col + 1]?.team === 1)  {
            diceResult2 -= 1;
            coeff -= 1;
            console.log ('covered at: ', grid[row][col + 1]);
          }
          if (grid[row + 1][col]?.team === 1)  {
            diceResult2 -= 1;
            coeff -= 1;
            console.log ('covered at: ', grid[row + 1][col]);
          }
          if (grid[row + 1][col - 1]?.team === 1)  {
            diceResult2 -= 1;
            coeff -= 1;
            console.log ('covered at: ', grid[row + 1][col - 1]);
          }
          if (grid[row + 1][col + 1]?.team === 1)  {
            diceResult2 -= 1;
            coeff -= 1;
            console.log ('covered at: ', grid[row + 1][col + 1]);
          }
          if (grid[row][col - 1]?.team === 1)  {
            diceResult2 -= 1;
            coeff -= 1;
            console.log ('covered at: ', grid[row][col - 1]);
          }

          console.log('dice result:', diceResult2);
          if (diceResult2 >= distance) {
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[selectedCircle.row][selectedCircle.col] = { ...selectedCircleInfo, hasBall: false };
            newGrid[row][col] = { ...clickedCircleInfo, hasBall: true };
            handlePassingButtons(true);
            return newGrid;
          });
          setCoeff(coeff);
          setDiceResult2(dice2);
          setModDiceResult2(diceResult2);
          setPassing(false); // Reset passing state after a successful pass
          setRemainingMovements(remainingMovements - 1);
          setSelectedCircle(null);}
          else if (diceResult2 < distance) {
            // Find the closest opponent circle and update newGrid
            const opponentCircles = [];
            for (let i = 0; i < grid.length; i++) {
              for (let j = 0; j < grid[i].length; j++) {
                const circle = grid[i][j];
                if (circle && circle.team !== team && !circle.hasBall) {
                  opponentCircles.push({ row: i, col: j, distance: Math.abs(row - i) + Math.abs(col - j) });
                }
              }
            }
            
            opponentCircles.sort((a, b) => a.distance - b.distance);
            console.log ('Opp circles: ', opponentCircles);
            const closestOpponent = opponentCircles[0];
            console.log('closest Opponent: ', closestOpponent);
            
            setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              newGrid[selectedCircle.row][selectedCircle.col] = { ...selectedCircleInfo, hasBall: false };
              newGrid[closestOpponent.row][closestOpponent.col] = { ...grid[closestOpponent.row][closestOpponent.col], hasBall: true };
              handlePassingButtons(false);
              return newGrid;
            });
            setCoeff(coeff);
            setDiceResult2(dice2);
            setModDiceResult2(diceResult2);
            setSelectedCircle(null);
          }}
      } else {
        // If not passing, handle movement or tackle
        const isOccupied = grid[row]?.[col];
        const isPathClearBetween = isPathClear(selectedCircle, { row, col }, grid);
        const isSquareAvailable = availableSquares.some(
          (square) => square.row === row && square.col === col
        );
        const isAdjacent = isAdjacentSquare(selectedCircle, { row, col });
  
        console.log("Moving or tackling...");
        console.log("isOccupied:", isOccupied);
        console.log("isPathClearBetween:", isPathClearBetween);
        console.log("isSquareAvailable:", isSquareAvailable);
        console.log("isAdjacent:", isAdjacent);
  
        if (isAdjacent && remainingMovements > 0 && clickedCircleInfo && clickedCircleInfo.turnsDisabled <= 0 && clickedCircleInfo.team !== selectedCircleInfo.team && clickedCircleInfo.hasBall && !selectedCircleInfo.hasBall && !groupMove) {
          console.log("Tackling...");
          const dice1 = (Math.floor(Math.random() * 6) + 1);
          const dice2 = (Math.floor(Math.random() * 6) + 1);
          let diceResult1 = dice1;
          let diceResult2 = dice2;
          console.log('dice 1 before add:', dice1, 'dice 2:', dice2);
          if (selectedCircleInfo.skills?.includes('Gladiator')) {
            if (selectedCircleInfo.team === 1) {
              diceResult1 += 1;
            } else if (selectedCircleInfo.team === 2) {
              diceResult2 += 1;
            }
          };
          if (selectedCircleInfo.skills?.includes('Black Gladiator')) {
            if (selectedCircleInfo.team === 1) {
              diceResult1 += 2;
            } else if (selectedCircleInfo.team === 2) {
              diceResult2 += 2;
            }
          };
          if (clickedCircleInfo.skills?.includes('Wizard')) {
            if (clickedCircleInfo.team === 1) {
              diceResult1 += 1;
            } else if (clickedCircleInfo.team === 2) {
              diceResult2 += 1;
            }
          };
          if (clickedCircleInfo.skills?.includes('Black Wizard')) {
            if (clickedCircleInfo.team === 1) {
              diceResult1 += 2;
            } else if (clickedCircleInfo.team === 2) {
              diceResult2 += 2;
            }
          };
          console.log('dice 1: ', diceResult1, ' dice 2: ', diceResult2);
          if ((selectedCircleInfo.team === 1 && (diceResult1 >= diceResult2)) ||
              (selectedCircleInfo.team === 2 && (diceResult2 >= diceResult1))) {
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[selectedCircle.row][selectedCircle.col] = {...clickedCircleInfo, hasBall: false, turnsDisabled: 6};
            newGrid[row][col] = { ...selectedCircleInfo, hasBall: true };
            handleTacklingButtons(true);
            setRemainingMovements(remainingMovements - 1);
            setDiceResult1(dice1);
            setDiceResult2(dice2);
            setModDiceResult1(diceResult1);
            setModDiceResult2(diceResult2);
            setSelectedCircle(null);
            return newGrid;
          });
        } else if ((selectedCircleInfo.team === 1 && (diceResult2 > diceResult1)) ||
        (selectedCircleInfo.team === 2 && (diceResult1 > diceResult2))) {
      setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[selectedCircle.row][selectedCircle.col] = {...clickedCircleInfo, hasBall: true};
      newGrid[row][col] = { ...selectedCircleInfo, hasBall: false, turnsDisabled: 8 };
      handleTacklingButtons(false);
      setRemainingMovements(remainingMovements - 1);
      setDiceResult1(dice1);
            setDiceResult2(dice2);
            setModDiceResult1(diceResult1);
          setModDiceResult2(diceResult2);
      setSelectedCircle(null);
      return newGrid;
    });
  }
        } else if (!isOccupied && isPathClearBetween && isSquareAvailable && selectedCircleInfo.team === team) {
          console.log("Moving...");
          // Handle movement
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            // Keep the hasBall property when moving the player
            newGrid[selectedCircle.row][selectedCircle.col] = null;
            newGrid[row][col] = { ...selectedCircleInfo, team, hasBall: selectedCircleInfo.hasBall, gm: false };
            addMatchLogEntry(
              `${selectedCircleInfo.name} ${selectedCircle.row} ${selectedCircle.col} -> ${row} ${col}`
            );
            return newGrid;
          });
          if (!groupMove) {
          setRemainingMovements(remainingMovements - 1);
          }
          setSelectedCircle(null);
        } 
        else if (isAdjacent && remainingMovements > 0 && clickedCircleInfo && clickedCircleInfo.turnsDisabled <= 0 && clickedCircleInfo.team !== selectedCircleInfo.team && selectedCircleInfo.hasBall && !clickedCircleInfo.hasBall && !groupMove) {
          console.log("Dribbling...");
          const dice1 = (Math.floor(Math.random() * 6) + 1);
          const dice2 = (Math.floor(Math.random() * 6) + 1);
          let diceResult1 = dice1;
          let diceResult2 = dice2;
          console.log('dice 1 before add:', dice1, 'dice 2:', dice2);
          if (selectedCircleInfo.skills?.includes('Wizard')) {
            if (selectedCircleInfo.team === 1) {
              diceResult1 += 1;
            } else if (selectedCircleInfo.team === 2) {
              diceResult2 += 1;
            }
          };
          if (selectedCircleInfo.skills?.includes('Black Wizard')) {
            if (selectedCircleInfo.team === 1) {
              diceResult1 += 2;
            } else if (selectedCircleInfo.team === 2) {
              diceResult2 += 2;
            }
          };
          if (clickedCircleInfo.skills?.includes('Gladiator')) {
            if (clickedCircleInfo.team === 1) {
              diceResult1 += 1;
            } else if (clickedCircleInfo.team === 2) {
              diceResult2 += 1;
            }
          };
          if (clickedCircleInfo.skills?.includes('Black Gladiator')) {
            if (clickedCircleInfo.team === 1) {
              diceResult1 += 2;
            } else if (clickedCircleInfo.team === 2) {
              diceResult2 += 2;
            }
          };
          console.log('dice 1: ', diceResult1, ' dice 2: ', diceResult2);
          if ((selectedCircleInfo.team === 1 && (diceResult1 >= diceResult2)) ||
              (selectedCircleInfo.team === 2 && (diceResult2 >= diceResult1))) {
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[selectedCircle.row][selectedCircle.col] = {...clickedCircleInfo, turnsDisabled: 6};
            newGrid[row][col] = { ...selectedCircleInfo};
            console.log('Circle ', newGrid[selectedCircle.row][selectedCircle.col], ' is disabled for ', newGrid[selectedCircle.row][selectedCircle.col]?.turnsDisabled, ' turns');
            addMatchLogEntry(
              `${selectedCircleInfo.name} ${selectedCircle.row} ${selectedCircle.col} x ${clickedCircleInfo.name} ${row} ${col}`
            );
            handleDribblingButtons(true);
            return newGrid;
          });

          setRemainingMovements(remainingMovements - 1);
          setDiceResult1(dice1);
          setDiceResult2(dice2);
          setModDiceResult1(diceResult1);
          setModDiceResult2(diceResult2);
          setSelectedCircle(null);
        } else if ((selectedCircleInfo.team === 1 && (diceResult2 > diceResult1)) ||
        (selectedCircleInfo.team === 2 && (diceResult1 > diceResult2))){
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[selectedCircle.row][selectedCircle.col] = {...clickedCircleInfo, hasBall: true};
            newGrid[row][col] = { ...selectedCircleInfo, hasBall: false, turnsDisabled: 8 };
            handleDribblingButtons(false);
            setSelectedCircle(null);
            setDiceResult1(dice1);
            setDiceResult2(dice2);
            setModDiceResult1(diceResult1);
            setModDiceResult2(diceResult2);
            return newGrid;
          });
        }
      }
    }
    } else if (grid[row]?.[col]) {
      console.log("Selecting circle...");
      setSelectedCircle({ row, col });
      setPassing(grid[row][col]?.hasBall);
    }
  
    // Log the state of the game after the move
    console.log("Grid after move:", grid);
    console.log("Available squares after move:", getAvailableSquares(grid));
  };
  


  const isAdjacentSquare = (square1, square2) => {
    const rowDiff = (square1.row - square2.row);
    const colDiff = (square1.col - square2.col);
    const selectedCircleInfo = grid[selectedCircle.row]?.[selectedCircle.col];
    if (selectedCircleInfo.team === 2) {
      return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 1) || (rowDiff === -1 && colDiff === 1) || (rowDiff === -1 && colDiff === 0);
    }
    else if (selectedCircleInfo.team === 1) {
      return (rowDiff === -1 && colDiff === 0) || (rowDiff === 0 && colDiff === -1) || (rowDiff === -1 && colDiff === -1) || (rowDiff === 1 && colDiff === 0) || (rowDiff === 1 && colDiff === -1);
    }
  };
  
  const getAvailableSquares = (currentGrid) => {
    if (remainingMovements >= 0 && selectedCircle) {
      const availableSquares = [];
      const selectedCircleTurnsDisabled = grid[selectedCircle.row][selectedCircle.col]?.turnsDisabled;
      console.log('sel cir: ', selectedCircleTurnsDisabled);
      if (selectedCircleTurnsDisabled > 0) {
        return availableSquares;
      };
      const selectedCircleTeam = grid[selectedCircle.row][selectedCircle.col]?.team;
      const selectedCircleHasBall = grid[selectedCircle.row][selectedCircle.col]?.hasBall;
      const selectedCircleSkills = grid[selectedCircle.row][selectedCircle.col]?.skills;
      const selectedCircleGM = grid[selectedCircle.row][selectedCircle.col]?.gm;
    if (selectedCircleSkills?.includes('Paw') || selectedCircleSkills?.includes('Black Paw')) {
      return availableSquares;
    };

    const countCirclesInZone = (team, col1, col2) => {
      let count = 0;
      for (let i = 6; i <= 11; i++) {
        for (let j = col1; j <= col2; j++) {
          if (currentGrid[i][j]?.team === team) {
            count++;
          }
        }
      }
      return count;
    };

    const isWithinExclusionZone = (row, col, team) => {
      let count = countCirclesInZone(team, 1, 2);
      if (
        team === 1 &&
        row >= 6 &&
        row <= 11 &&
        col >= 1 &&
        col <= 2 &&
        count >= 4 &&
        !(selectedCircle.row >= 6 && selectedCircle.row <= 11 && selectedCircle.col >= 1 && selectedCircle.col <= 2)
      ) {
        return true;
      } else {
      count = countCirclesInZone(team, 13, 14);
      if (
        team === 2 &&
        row >= 6 &&
        row <= 11 &&
        col >= 13 &&
        col <= 14 &&
        count >= 4 &&
        !(selectedCircle.row >= 6 && selectedCircle.row <= 11 && selectedCircle.col >= 13 && selectedCircle.col <= 14)
      ) {
        return true;
      }}
      return false;
    };


      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          if ((i === 9 && j === 0) || (i === 8 && j === 15)) {
            continue;
        }
          const rowDiff = Math.abs(selectedCircle.row - i);
          const colDiff = Math.abs(selectedCircle.col - j);
          const row = selectedCircle.row - i;
          const col = selectedCircle.col - j;
          const isOccupied = currentGrid[i][j];
          const isPathClear = isPathClearBetweenSelectedAndSquare({ row: i, col: j }, currentGrid);
          const isDefaultOccupied = isDefaultOccupiedSquare(i, j);

          if (
            !isWithinExclusionZone(i, j, selectedCircleTeam) &&
            !isOccupied &&
            !isDefaultOccupied &&
            isPathClear &&
            selectedCircleTeam === team &&
            groupMove &&
            selectedCircleGM &&
            remainingMovements > 0 &&
            ((!selectedCircleHasBall &&
              selectedCircleSkills?.includes('Rabbit') &&
            ((gmDirection === 1 && (row === 0 && (col === -1 || col === -2 || col === -3))) ||
            (gmDirection === 2 && ((row === 1 && col === -1) || (row === 2 && col === -2) || (row === 3 && col === -3))) ||
            (gmDirection === 3 && ((row === 1 || row === 2 || row === 3) && col === 0)) ||
            (gmDirection === 4 && ((row === 1 && col === 1) || (row === 2 && col === 2) || (row === 3 && col === 3))) ||
            (gmDirection === 5 && (row === 0 && (col === 1 || col === 2 || col === 3))) ||
            (gmDirection === 6 && ((row === -1 && col === 1) || (row === -2 && col === 2) || (row === -3 && col === 3))) ||
            (gmDirection === 7 && ((row === -1 || row === -2 || row === -3) && col === 0)) ||
            (gmDirection === 8 && ((row === -1 && col === -1) || (row === -2 && col === -2) || (row === -3 && col === -3))))) ||
            (((selectedCircleHasBall &&
              selectedCircleSkills?.includes('Rabbit')) ||
             (!selectedCircleHasBall)) &&
            ((gmDirection === 1 && (row === 0 && (col === -1 || col === -2))) ||
            (gmDirection === 2 && ((row === 1 && col === -1) || (row === 2 && col === -2))) ||
            (gmDirection === 3 && ((row === 1 || row === 2) && col === 0)) ||
            (gmDirection === 4 && ((row === 1 && col === 1) || (row === 2 && col === 2))) ||
            (gmDirection === 5 && (row === 0 && (col === 1 || col === 2))) ||
            (gmDirection === 6 && ((row === -1 && col === 1) || (row === -2 && col === 2))) ||
            (gmDirection === 7 && ((row === -1 || row === -2) && col === 0)) ||
            (gmDirection === 8 && ((row === -1 && col === -1) || (row === -2 && col === -2))))) ||
            (((selectedCircleHasBall &&
              !selectedCircleSkills?.includes('Rabbit'))) &&
            ((gmDirection === 1 && (row === 0 && col === -1)) ||
            (gmDirection === 2 && (row === 1 && col === -1)) ||
            (gmDirection === 3 && (row === 1 && col === 0)) ||
            (gmDirection === 4 && (row === 1 && col === 1)) ||
            (gmDirection === 5 && (row === 0 && col === 1)) ||
            (gmDirection === 6 && (row === -1 && col === 1)) ||
            (gmDirection === 7 && (row === -1 && col === 0)) ||
            (gmDirection === 8 && (row === -1 && col === -1)))))
          ) {
            const square = { row: i, col: j };  
            availableSquares.push(square);
          } 

          if (
            !isWithinExclusionZone(i, j, selectedCircleTeam) &&
            !isOccupied &&
            !isDefaultOccupied &&
            isPathClear &&
            selectedCircleTeam === team &&
            !selectedCircleHasBall &&
            !groupMove &&
            !selectedCircleGM &&
            selectedCircleSkills?.includes('Rabbit') &&
            (remainingMovements > 0 || (remainingMovements === 0 && selectedCircleSkills?.includes('Tractor'))) &&
            ((rowDiff === 1 && colDiff === 0) ||
              (rowDiff === 1 && colDiff === 1) ||
              (rowDiff === 0 && colDiff === 1) ||
              (rowDiff === 2 && colDiff === 0) ||
              (rowDiff === 2 && colDiff === 2) ||
              (rowDiff === 0 && colDiff === 2) ||
              (rowDiff === 3 && colDiff === 3) ||
              (rowDiff === 3 && colDiff === 0) ||
              (rowDiff === 0 && colDiff === 3))
          ) {
            const square = { row: i, col: j };  
            availableSquares.push(square);
          } else if (
            !isWithinExclusionZone(i, j, selectedCircleTeam) &&
            !isOccupied &&
            !isDefaultOccupied &&
            isPathClear &&
            !groupMove &&
            !selectedCircleGM &&
            selectedCircleTeam === team &&
            (remainingMovements > 0 || (remainingMovements === 0 && selectedCircleSkills?.includes('Tractor'))) &&
            (!selectedCircleHasBall ||
              (selectedCircleHasBall &&
                selectedCircleSkills?.includes('Rabbit')))&&
            ((rowDiff === 1 && colDiff === 0) ||
              (rowDiff === 1 && colDiff === 1) ||
              (rowDiff === 0 && colDiff === 1) ||
              (rowDiff === 2 && colDiff === 0) ||
              (rowDiff === 2 && colDiff === 2) ||
              (rowDiff === 0 && colDiff === 2))
          ) {
            const square = { row: i, col: j };  
            availableSquares.push(square);
          } else if (
            !isWithinExclusionZone(i, j, selectedCircleTeam) &&
            !isOccupied &&
            !isDefaultOccupied &&
            !groupMove &&
            !selectedCircleGM &&
            isPathClear &&
            selectedCircleTeam === team &&
            selectedCircleHasBall &&
            (remainingMovements > 0 || (remainingMovements === 0 && selectedCircleSkills?.includes('Tractor'))) &&
            !selectedCircleSkills?.includes('Rabbit')&&
            ((rowDiff === 1 && colDiff === 0) ||
              (rowDiff === 1 && colDiff === 1) ||
              (rowDiff === 0 && colDiff === 1))
          ) {
            const square = { row: i, col: j };
            availableSquares.push(square);
          }
        }
      }
      return availableSquares;
    }
    return [];
  };
  
  const getAvailablePassingSquares = (currentGrid) => {
    if (remainingMovements !== 0 && selectedCircle) {
      const availablePassing = [];
      const selectedCircleHasBall = grid[selectedCircle.row][selectedCircle.col]?.hasBall;
      const selectedCircleTeam = grid[selectedCircle.row][selectedCircle.col]?.team;
      console.log('selected circle team: ', selectedCircleTeam);
      
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const receiver = currentGrid[i][j];
          const receiverTeam = currentGrid[i][j]?.team;
          const receiverHasBall = currentGrid[i][j]?.hasBall;
          const receiverSkills = currentGrid[i][j]?.skills;
          const receiverDisabled = currentGrid[i][j]?.turnsDisabled;
          console.log('receiver team: ', receiverTeam, currentGrid[i][j]);
          // Check if the square has a circle with the same team as selectedCircle
          if ( selectedCircleHasBall &&
              !receiverHasBall &&
              receiver && 
              receiverDisabled <= 0 &&
              receiverTeam === selectedCircleTeam &&
              !(receiverSkills.includes('Paw') ||
              receiverSkills.includes('Black Paw'))) {
            const square = { row: i, col: j };
            console.log('reciever is at ', square);
            availablePassing.push(square)
          }
        }
      }
      console.log('Available for pass: ', availablePassing);
      return availablePassing;
    }
  
    return [];
  };

  const getAvailableShootingSquares = (currentGrid) => {
    if (remainingMovements !== 0 && selectedCircle) {
      const availableShooting = [];
      const selectedCircleHasBall = grid[selectedCircle.row][selectedCircle.col]?.hasBall;
      const selectedCircleTeam = grid[selectedCircle.row][selectedCircle.col]?.team;
  
      // Define the shooting squares for each team
      const shootingSquareTeam1 = { row: 8, col: 15 };
      const shootingSquareTeam2 = { row: 9, col: 0 };
  
      // Check if the selected circle is on its team's shooting square
      if (
          selectedCircleTeam === 1 &&
          selectedCircleHasBall &&
          (shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, -4) ||
          shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, -3) ||
          shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, -2) ||
          shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, -1) ||
          shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, 0) ||
          shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, 1) ||
          shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, 2) ||
          shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, 3) ||
          shootingSquaresTeam1(selectedCircle.row, selectedCircle.col, 4))
      ) {
        availableShooting.push(shootingSquareTeam1);
      } else if (
        selectedCircleTeam === 2 &&
          selectedCircleHasBall &&
          shootingSquaresTeam2(selectedCircle.row, selectedCircle.col)
      ) {
        availableShooting.push(shootingSquareTeam2);
      }
      return availableShooting;
    }
  
    return [];
  };
  

  const getAvailableTacklingSquares = (currentGrid) => {
    if (remainingMovements !== 0 && selectedCircle) {
      const availableTackling = [];
      const selectedCircleHasBall = grid[selectedCircle.row][selectedCircle.col]?.hasBall;
      const selectedCircleTeam = grid[selectedCircle.row][selectedCircle.col]?.team;
  
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const opponent = currentGrid[i][j];
          const opponentTeam = currentGrid[i][j]?.team;
          const opponentHasBall = currentGrid[i][j]?.hasBall;
          const opponentDisabled = currentGrid[i][j]?.turnsDisabled;
          const rowDiff = (selectedCircle.row - i);
          const colDiff = (selectedCircle.col - j);
          console.log(rowDiff, colDiff);
          // Check if the square has a circle with the same team as selectedCircle
          if ( !selectedCircleHasBall &&
              opponentHasBall &&
              opponent && 
              opponentDisabled <= 0 &&
              opponentTeam !== selectedCircleTeam &&
              ((selectedCircleTeam === 2 &&
              ((rowDiff === 1 && colDiff === 0) ||
              (rowDiff === 0 && colDiff === 1) ||
              (rowDiff === 1 && colDiff === 1) ||
              (rowDiff === -1 && colDiff === 1) ||
              (rowDiff === -1 && colDiff === 0))) ||
              (selectedCircleTeam === 1 && (
              (rowDiff === -1 && colDiff === 0) ||
              (rowDiff === 0 && colDiff === -1) ||
              (rowDiff === -1 && colDiff === -1) ||
              (rowDiff === 1 && colDiff === 0) ||
              (rowDiff === 1 && colDiff === -1))))) {
            const square = { row: i, col: j };
            console.log('opponent is at ', square);
            availableTackling.push(square)
          }
        }
      }
      console.log('Available for tackle: ', availableTackling);
      return availableTackling;
    }
  
    return [];
  };
  
  const getAvailableDribblingSquares = (currentGrid) => {
    if (remainingMovements !== 0 && selectedCircle) {
      const availableDribbling = [];
      const selectedCircleHasBall = grid[selectedCircle.row][selectedCircle.col]?.hasBall;
      const selectedCircleTeam = grid[selectedCircle.row][selectedCircle.col]?.team;
  
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const opponent = currentGrid[i][j];
          const opponentTeam = currentGrid[i][j]?.team;
          const opponentHasBall = currentGrid[i][j]?.hasBall;
          const opponentDisabled = currentGrid[i][j]?.turnsDisabled;
          const rowDiff = (selectedCircle.row - i);
          const colDiff = (selectedCircle.col - j);
          console.log(rowDiff, colDiff);
          // Check if the square has a circle with the same team as selectedCircle
          if ( selectedCircleHasBall &&
              !opponentHasBall &&
              opponent && 
              opponentDisabled <= 0 &&
              opponentTeam !== selectedCircleTeam &&
              ((selectedCircleTeam === 2 &&
              ((rowDiff === 1 && colDiff === 0) ||
              (rowDiff === 0 && colDiff === 1) ||
              (rowDiff === 1 && colDiff === 1) ||
              (rowDiff === -1 && colDiff === 1) ||
              (rowDiff === -1 && colDiff === 0))) ||
              (selectedCircleTeam === 1 && (
              (rowDiff === -1 && colDiff === 0) ||
              (rowDiff === 0 && colDiff === -1) ||
              (rowDiff === -1 && colDiff === -1) ||
              (rowDiff === 1 && colDiff === 0) ||
              (rowDiff === 1 && colDiff === -1))))) {
            const square = { row: i, col: j };
            console.log('opponent is at ', square);
            availableDribbling.push(square)
          }
        }
      }
      console.log('Available for tackle: ', availableDribbling);
      return availableDribbling;
    }
  
    return [];
  };

  const isPathClearBetweenSelectedAndSquare = (square, currentGrid) => {
    const start = selectedCircle;
    const end = square;
    const rowDiff = Math.abs(start.row - end.row);
    const colDiff = Math.abs(start.col - end.col);
    const step = Math.max(rowDiff, colDiff);
  
    for (let i = 1; i <= step; i++) {
      const interpRow = Math.round(start.row + i / step * (end.row - start.row));
      const interpCol = Math.round(start.col + i / step * (end.col - start.col));
  
      if (currentGrid[interpRow][interpCol]) {
        return false; // Occupied square in the path
      }
    }
  
    return true; // Path is clear
  };
  
  const finishGM = () => {
    setGroupMove(false);
    setDisplayButtons('');
    setGmDirection(0);
    setRemainingMovements(remainingMovements - 1);
    for (let i = 1; i < numRows; i++) {
      for (let j = 1; j < numCols; j++) {
        if (grid[i][j]?.team === team) {
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[i][j] = {
              ...grid[i][j],
              gm: false,
            };
            return newGrid;
          });
        }
      }
    }
  }

  const dir = (d) => {
    setDisplayButtons('finish');
    setGmDirection (d);
  }

  const availableSquares = getAvailableSquares(grid);
  const availablePassing = getAvailablePassingSquares(grid);
  const availableTackling = getAvailableTacklingSquares(grid);
  const availableDribbling = getAvailableDribblingSquares(grid);
  const availableShooting = getAvailableShootingSquares(grid);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <div className='Scoreboard'>
        <div className='Team1'>
          Team 1
        </div>
        <div className='Score'>
          <div>{team1Goals}:{team2Goals}</div>
          <p><div className='time'>{isGameEnded ? 'Game Ended' : `Turn ${turn} Team ${team}`} Moves left: {Math.max(remainingMovements, 0)}</div></p>
        </div>
        <div className='Team2'>
          Team 2
        </div>
      </div>
      <div className='logstats'>
      <div className='log'>
      <p></p>
      <p></p>
      <p></p>
      <div className="App">
<Pitch
  grid={grid}
  handleSquareClick={handleSquareClick}
  availableSquares={availableSquares}
  selectedCircle={selectedCircle}
  availablePassing={availablePassing}
  availableTackling={availableTackling}
  availableDribbling={availableDribbling}
  availableShooting={availableShooting}
  remainingMovements={remainingMovements}
  team={team}
/>

    </div>
      </div>
      <div className='stats'>
      <p></p> 
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      {!isGameEnded && <button onClick={handleNextTurn}>Next Turn</button>}
      <button onClick={handleStatsClick}>Stats</button>
      <button onClick={handleLogClick}>Log</button>
      <div>
      <button onClick={openModal}>Rules</button>
      <Rules isOpen={isModalOpen} onClose={closeModal} />
      </div>
      {displaySection === 'stats' && (
      <>
      <p>STATS:</p>
      <p>{team1Goals} Goals {team2Goals}</p>
      <p>{team1Shots} Shots {team2Shots}</p>
      <p>{team1xG.toFixed(2)} xG {team2xG.toFixed(2)}</p>
      <p>{team1Pos.toFixed(0)}% Possession {team2Pos.toFixed(0)}%</p>
      <p>{team1PassesAttempts} ({team1PassesCompleted}) Passes Attempts (Completed) {team2PassesAttempts} ({team2PassesCompleted})</p>
      <p>{team1AvgAcc.toFixed(0)}% Passes Accuracy {team2AvgAcc.toFixed(0)}%</p>
      <p>{team1TacklesAttempts} ({team1TacklesCompleted}) Tackles Attempted (Completed) {team2TacklesAttempts} ({team2TacklesCompleted})</p>
      <p>{team1AvgTck.toFixed(0)}% Tackling Efficiency {team2AvgTck.toFixed(0)}%</p>
      <p>{team1DribblesAttempts} ({team1DribblesCompleted}) Dribbles Attempted (Completed) {team2DribblesAttempts} ({team2DribblesCompleted})</p>
      <p>{team1AvgDrb.toFixed(0)}% Dribbling Efficiency {team2AvgDrb.toFixed(0)}%</p>
      <div>
      <p>Coefficient: {coeff}</p>
      <p>Original: Team 1 - {diceResult1} : {diceResult2} - Team 2</p>
      <p>Modified: Team 1 - {modDiceResult1} : {modDiceResult2} - Team 2</p>
    </div>
      <p>Team {teamWithPossession} has the ball</p>
      {displayButtons === 'dirButtons' && (
        <>
        <p>Direction: </p>
      <button onClick={() => dir(1)}>&#8594;</button>
      <button onClick={() => dir(2)}>&#8599;</button>
      <button onClick={() => dir(3)}>&#8593;</button>
      <button onClick={() => dir(4)}>&#8598;</button>
      <button onClick={() => dir(5)}>&#8592;</button>
      <button onClick={() => dir(6)}>&#8601;</button>
      <button onClick={() => dir(7)}>&#8595;</button>
      <button onClick={() => dir(8)}>&#8600;</button>
      </>
      )}
      {displayButtons === 'finish' && (
        <button onClick={finishGM}>Finish Group Movement</button>
      )}
      </>
      )}
      {displaySection === 'log' && (
        <>
      <div>Match Log:</div>
      
      <ul>
        {matchLog.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
        </ul>
      </>
      )}
      </div>
      </div>
    </div>
  );
}

export default App;