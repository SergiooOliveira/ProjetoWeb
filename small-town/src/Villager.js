import React, { useState } from 'react';
import './Villager.css';
import VillagerCard from './VillagerCard';

/*
  - Create message when new villager is added
  - Format the information of the villagers  
*/

const Villager = ({ createVillager, villagers }) => {

  const [clickedVillager, setclickedVillager] = useState(null)

  function liClickHandler(event, villager) {
    setclickedVillager(villager)
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
            {villagers && villagers.map((villager) => (
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
            {clickedVillager && (
              <>
                <div className='villagerListDetails-Name'>
                  <h4>{clickedVillager.name}</h4>
                </div>
                <div className='villagerListDetails-Job'>
                  {clickedVillager.job || "Unemployed"}
                </div>
                <div className='villagerListDetails-Inventory'>
                  <ul>
                    {clickedVillager?.inventory?.map((item) => (
                      <li key={item.id}>
                        {item.name} {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Villager;