import React from 'react';
import './Villager.css';
import VillagerCard from './VillagerCard';

/*
  - Create message when new villager is added
  - Add button to show all villagers
*/

const Villager = ({ createVillager, villagers }) => {

  function liClickHandler(event) {
    console.log("Clicked: ", event.villager.id)
  }

  const liElements = document.querySelectorAll('li');
  liElements.forEach(function(li) {
    li.addEventListener('click', liClickHandler)
  })

  return (
    <>
      <div className='villagerListTitle'>
        <h1>Villagers</h1>
        <button onClick={createVillager}>Create Villager</button>
      </div>
      <div className='villagerListElements'>
        <ul id="villagerName">
          {villagers.map((villager) => (            
            <li key={villager.id}><span>{villager.name}</span></li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Villager;