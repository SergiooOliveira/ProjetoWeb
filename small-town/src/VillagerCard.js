import React from 'react';
import './VillagerCard.css';

const VillagerCard = ({ villagers }) => {
  return (
    <>
    <div className='villagerList'>
        {villagers.map(villager => (                 
            <div className='card' key={villager.id}>
                <div className='face'>
                    
                </div>
                <div className='name'>
                    <h4>{villager.name}</h4>
                </div>
            </div>
        ))}
    </div> 
    </>
  );
}

export default VillagerCard;