import React from 'react';
import './Villager.css';
import VillagerCard from './VillagerCard';

/*
  - Create message when new villager is added
  - Add button to show all villagers
*/

const Villager = ({ createVillager, villagers }) => {

  function liClickHandler(event, villager) {
    console.log("Clicked: ", villager.id)
  }

  return (
    <>
      <div className='villagerListTitle'>
        <h1>Villagers</h1>
        <button onClick={createVillager}>Create Villager</button>
      </div>
      <div>
        <div className='villagerListGroup'>
          <ul className='villagerListElements'>
            {villagers.map((villager) => (
              <li
                key={villager.id}
                onClick={(event) => liClickHandler(event, villager)}
              >
                <img></img>
                <span>{villager.name}</span>
              </li>
            ))}
          </ul>
          <div className='villagerListDetails'>

          </div>
        </div>
      </div>
    </>
  );
}

export default Villager;