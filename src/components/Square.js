import React from 'react';

/**
 * Function square - returns html
 * @param {*} props 
 */
export function Square(props) {
    return (
      <button className={props.value === "X" ? "square x-square" : "square"} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  