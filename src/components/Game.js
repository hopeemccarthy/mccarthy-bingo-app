import React from 'react';
import '../index.css';
import { DisneyCharacters } from '../constants/disneyCharacters';
import { SurvivorSeasons } from '../constants/survivor';
import { PastaTypes } from '../constants/pastaTypes';
import { Board } from './Board';
import { GenerateNumber } from './GenerateNumber';
import { Navigation, Themes } from './Navigation';
import {calculateWinner} from '../utils/bingoUtils'

/**
 * class Game
 * returns board 
 */
export class Game extends React.Component {
    constructor(props) {
      super(props);

      const {values, possibleValues} = this.getThemeValues(Themes.Classic);

      this.state = {
        history: [
          {
            squares: values
          }
        ],
        stepNumber: 0,
        theme: Themes.Classic,
        valueArray: possibleValues
      };
    }
  
    /**
     * When the square is clicked, update the array
     * 
     * @param {string} i 
     * @returns 
     */
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i] === "X") {
        return;
      }
  
      // TODO this is where validation could go (confirm the clicked number matches the called number)

      // When square is clicked, replace value with "X"
        squares[i] = "X";
        this.setState({
          history: history.concat([
            {
              squares: squares
            }
          ]),
          stepNumber: history.length,
          currentNumber: current.currentNumber
        });
    }

    /**
     * When the user selects a new theme,
     * reset the table with new data
     * 
     * @param {string} theme selected theme
     */
    changeTheme(theme) {
      if (Themes[theme] === this.state.theme) {
        // don't refresh if theme isn't changed. 
        return;
      }
        // New Theme values
        const {values, possibleValues} = this.getThemeValues(Themes[theme]);
        this.setState((state) => {
          return {
            ...state,
            history: [
              {
                squares: values
              }
            ],
            theme: Themes[theme],
            stepNumber: 0,
            valueArray: possibleValues
          }
        });
    }

    /**
     * Get the associated array based on the selected theme
     * 
     * @param {string} theme 
     * @returns array of theme values/strings
     */
    getThemeValues(theme) {
      let values = [],
        possibleValues = [];
      switch (theme) {
        case Themes.Classic:         
          possibleValues = Array.from(Array(100).keys())
          break;

        case Themes.Disney: 
          possibleValues = DisneyCharacters;
          break;
        
        case Themes.Survivor: 
          possibleValues = SurvivorSeasons;
          break;

        case Themes.Pasta: 
          possibleValues = PastaTypes;
          break;
        default:
          break;
      }
      for(let i = 0; i < 25; i++) {
        // TODO - can be improved by protecting against duplicate values
        values[i] = possibleValues[Math.floor(Math.random() * possibleValues.length)];
      }
      // values: the generated random array
      // possible values: the entire set of data to call from
      return {values, possibleValues};
    }

    /**
     * Reset the board values
     */
    reset() {
        const {values, possibleValues} = this.getThemeValues(this.state.theme);
        this.setState((state) => {
          return {
            ...state,
            history: [
              {
                squares: values
              }
            ],
            stepNumber: 0,
            valueArray: possibleValues
          }
        });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      let status;
      if (winner) {
        status = "You won!";
      } else {
        status = ``;
      }
  
      return (
        <div className={`game ${this.state.theme}`}>
          <Navigation changeTheme={this.changeTheme.bind(this)}></Navigation>
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
          <br></br>

          <div className="game-controls">
            <div className="instructions">
              Click the button below to call the next entry!
              If the number called is on your board, click that square to select it.
              Click reset to restart your game with a new board.
              To change your theme, choose from the menu in the upper right corner. 
            </div>
            <div className={status === '' ? "hide" : "winner"}>
              <span className="winner-status">
                {status}
              </span>
              <button className="btn" onClick={this.reset.bind(this)}>
                Play Again
              </button>
            </div>
              {!status && (<GenerateNumber values={this.state.valueArray} reset={this.reset.bind(this)} winner={!!status}/>)}
          </div>
        </div>
      );
    }
  }
