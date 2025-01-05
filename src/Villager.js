import React, { useState } from 'react';
import './Villager.css';

/*
  - Create message when new villager is added
  - Format the information of the villagers  
*/

const Villager = ({ createVillager, villagers, setResources }) => {

  const [clickedVillager, setClickedVillager] = useState(null)

  function liClickHandler(event, villager) {
    setClickedVillager(villager)
  }

  // Function to handle selling all gems
  const handleSellAllGems = (villager, itemName) => {
    console.log(`Trying to sell ${itemName} form ${villager.name}`)

    const itemIndex = villager.inventory.findIndex(item => item.name === itemName)
    const goldEarned = villager.inventory[itemIndex].quantity * 10 // Each gem is worth 10 gold

    villager.inventory[itemIndex].quantity = 0
    
    setResources((prevResources) => 
      prevResources.map((resource) =>
        resource.type === 'gold'
          ? { ...resource, quantity: resource.quantity + goldEarned}
          : resource
    ))
  };

  return (
    <>
      <div className='villagerListTitle'>
        <h1>Villagers</h1>        
      </div>
      <div>
        <div className='villagerListGroup'>
          <ul className='villagerListElements'>
            {villagers && villagers.map((villager) => (
              <li
                key={villager.id}
                onClick={(event) => liClickHandler(event, villager)}
              >
                {/* <img></img> */}
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
                  <ul className='villagerListDetails-Inventory-Inventory-List'>
                    {clickedVillager?.inventory?.map((item) => (
                      <li className='villagerListDetails-Inventory-Inventory-Item' key={item.id}>
                        {item.name} {item.quantity}
                        {item.name === 'gem' && (
                          <button onClick={() => handleSellAllGems(clickedVillager, item.name)}>
                            Sell All Gems
                          </button>
                        )}
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