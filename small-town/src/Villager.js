import React from 'react';
import './Villager.css';
import VillagerCard from './VillagerCard';

/*
  - Create message when new villager is added
  - Add button to show all villagers
*/

const Villager = ({ createVillager, villagers }) => {
  return (
    <>
      <div>
          <button onClick={createVillager}>Create Villager</button>
      </div>
      <h1>Villagers</h1>
      
      {villagers.map((villager) => (
      <div key={villager.id}>
        <ul>
          <li><span>{villager.name}</span></li>
          {/*<VillagerCard villagers={villagers}/>*/}
        </ul>
      </div>
      ))}
    </>
  );
}

export default Villager;