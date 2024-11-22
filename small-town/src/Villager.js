import React from 'react';
import './Villager.css';
import VillagerCard from './VillagerCard';

const Villager = ({ createVillager, villagers }) => {
  return (
    <>
      <div>
          <button onClick={createVillager}>Create Villager</button>
      </div>
      <h1>Villagers</h1>
      <div>
          <VillagerCard villagers={villagers}/>
      </div>
    </>
  );
}

export default Villager;