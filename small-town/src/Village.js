import React, { useState } from 'react';
import './Village.css';
import './Villager.js';
  
const Village = ({ defaultVillageName, defaultVillagePopulationLimit }) => {

  // Village info
  const [villageName, setVillagename] = useState(null)
  const [villageList, setVillageList] = useState([null])
  const [villagePopulation, setVillagePopulation] = useState(0)
  const [villagePopulationLimit, setVillagePopulationLimit] = useState(0)
  const [resources, setVillageResources] = useState([])

  setVillagename(defaultVillageName);
  setVillagePopulation(0);
  setVillagePopulationLimit(defaultVillagePopulationLimit);

  // Villager
  const [villagers, setVillagers] = useState([]);

  return (
    <>
      <div>
        <div className='header'>

            <div className='home'>
                <h3>👥{villagePopulation}/{villagePopulationLimit}</h3>
            </div>

            <div className='title'>
                <h3>Teste de posição</h3>
            </div>
            
            <div className='contacts'>
                <h3>{villageName}</h3>
            </div>

        </div>        
      </div>
    </>
  );
}

export default Village;