import React from 'react';
import '../index.css';

/**
 * Random Number Generator
 */
export class GenerateNumber extends React.Component {


    /**
     * When the array of possible values changes (the theme was updated),
     * clear the current number
     * 
     * @param {object} prevProps 
     */
    componentDidUpdate(prevProps) {
      if (prevProps.values !== this.props.values) {
        this.setState((state) => ({...state, currentNumber: ''}));
      }
    }

    /**
     * Generate a random element of the array and update the state
     */
    generate() {
      const values = this.props.values;
      this.setState({
        currentNumber: values[Math.floor(Math.random() * values.length)],
      });
    }

    /**
     * Reset the number and call the parent reset function
     */
    reset() {
      this.props.reset();
      this.setState((state) => ({
        ...state,
        currentNumber: null
      }));
    }
  
    render() {
      return (
        <>
          <div className="buttons">
              <button className="btn" onClick={this.generate.bind(this)}>
                Select Number
              </button>
              <button className="btn" onClick={this.reset.bind(this)}>
                Reset
              </button>
            </div>
          <div className="number-selection-container">
            <div className="number-called">
              <div className="header">{'Current Selection:\n'}</div>
                          <div className="sub-header"></div>
              <div className="current-number">
                {this.state ? this.state.currentNumber : ''}
              </div>
            </div>
          </div>
        </>
      )
    }
  }