import React, { Component } from 'react';
import './Villager.css';

class Villager extends Component {
  // Constructor to initialize state and bind functions
  constructor(props) {
    super(props);
    this.state = {
        name: 'Villager 1',
        yearOfBirth: 2024,
        job: 'Lumber',
        gender: 'M',
        inventory: [],
        stats: []
    };

    this.showInfo = this.showInfo.bind(this);

  }

  showInfo() {
    console.log(this.state.name)
  }

  render() {
    return (
      <>
        <div>
            <button onClick={this.showInfo}>Show Info</button>
        </div>
      </>
    );
  }
}

export default Villager;