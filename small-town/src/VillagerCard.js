import React from 'react';
import './VillagerCard.css';

/*#Region To-do
  - fix Image not showing
*/

const VillagerCard = ({ villagers }) => {

  const handleClick = () => {
    console.log("Ver mais")
  }

  return (
    <>
    <div className='villagerList'>
        {villagers.map(villager => (
          <div key={villager.id}>
            <div className='card'>
                <img src="images/200x150.png" alt="Character"/>
                <div className='card-details'>
                    <span>{villager.name}</span>
                    <span className="more-options" onClick={handleClick}>...</span>
                </div>
            </div>
            <div className="card" key={villager.id}>    
              <div className="card-expanded">
                <p><strong>Job:</strong> </p>
                <p><strong>Age:</strong> </p>
                <p><strong>Stats:</strong> </p>
                <p><strong>Inventory:</strong> </p>
              </div>
              <div className="card-details">
                <span>{villager.name}</span>
                <span className="more-options">...</span>
              </div>
            </div>
          </div>
        ))}
    </div> 
    </>
  );
}

export default VillagerCard;