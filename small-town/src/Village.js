import React, { Component } from 'react';
import './Village.css';

class Village extends Component {
  // Constructor to initialize state and bind functions
  constructor(props) {
    super(props);
    this.state = {
        villageName: 'Vila Teste',
        villageList: [],
        villagePopulation: 10,
        villagePopulationLimit: 20,
        resources: []
    };
    
    // Bind functions if needed
    //this.updatePopulation = this.updatePopulation.bind(this);
    //this.changeVillageStatus = this.changeVillageStatus.bind(this);
  }

  /*
  // Function to update the village population
  updatePopulation(newPopulation) {
    this.setState({
      villagePopulation: newPopulation
    });
  }

  // Function to change the village development status
  changeVillageStatus(status) {
    this.setState({
      isDeveloping: status
    });
  }
    */

  // Render function to display the component
  render() {
    return (
      <header>
        <div className='header'>

            <div className='home'>
                <h3>👥{this.state.villagePopulation}/{this.state.villagePopulationLimit}</h3>
            </div>

            <div className='title'>
                <h3>Teste de posição</h3>
            </div>
            
            <div className='contacts'>
                <h3>{this.state.villageName}</h3>
            </div>

        </div>        
      </header>
    );
  }
}

export default Village;