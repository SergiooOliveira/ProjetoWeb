import React from 'react';
import './Village.css';
import './Villager.js';
  
const Village = ({ village }) => {
  
  // Check if the village state is null
  if (!village) {
    return <div>Loading village...</div>;
  }

  return (
    <>
      <div>
        <div className='header'>

            <div className='home'>
                <h3>👥{village.villagePopulation}/{village.villagePopulationLimit}</h3>
            </div>

            <div className='title'>
                <h3>Small Town</h3>
            </div>
            
            <div className='contacts'>
                <h3>{village.villageName}</h3>
            </div>

        </div>        
      </div>
    </>
  );
}

export default Village;