import React from 'react';
import '../index.css';
import { Square } from './Square';

/**
 * Board (made up of squares)
 */
export class Board extends React.Component {

    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }

    
    renderBoard() {
      const rows = [];
      // 5 rows
      for (let i = 0; i < 5; i++) {
        const rowSquares = [];
        // 5 squares per row
        for (let j = 0; j < 5; j++) {
          rowSquares.push(this.renderSquare((i*5) + j));
        }
        rows.push(<div className="board-row">{rowSquares}</div>);
      }
      return rows;
    }
  
    render() {
      return (
        <div className="board">
          {this.renderBoard()}
        </div>
      );
    }
  }