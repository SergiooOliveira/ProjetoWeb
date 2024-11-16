import React from 'react';
import './Villager.css';

const Villager = ({ createVillager }) => {
  return (
    <>
      <div>
          <button onClick={createVillager}>Create Villager</button>
      </div>
    </>
  );
}

export default Villager;