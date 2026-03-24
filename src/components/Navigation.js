import React from 'react';
import '../index.css';
import {  Menu } from 'grommet';

export const Themes = {
    Classic: 'classic-theme',
    Survivor: 'survivor-theme',
    Disney: 'disney-theme',
    Pasta: 'pasta-theme'
};

/**
 * class Navigation
 * returns header and theme buttons
 */
export class Navigation extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            // default theme
            theme: Themes.Classic
        };

        // Create options for grommet dropdown
        this.themeOptions = Object.keys(Themes).map(theme => {
            return {label: theme, onClick: () => this.onThemeSelect(theme)}
        });

    }
  
    /**
     * Update the theme selection
     * 
     * @param {string} theme 
     */
    onThemeSelect(theme) {
        this.setState((state) =>( {...state, theme }));
        this.props.changeTheme(theme);
    }

  
    render() {
      return (
        <>
            <div className="header">
            <span className="header-name">Bingo</span>
           
                <span className="header-rules">
                    <Menu
                        label="Theme"
                        items={this.themeOptions}
                        value={this.state.theme}
                    /> 
                </span>
            </div>
            <div className="sub-header"></div>
            <br></br>
        </>
      );
    }
  }