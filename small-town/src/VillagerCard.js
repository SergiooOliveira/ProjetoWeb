import React, { useState } from 'react';
import './VillagerCard.css';

/*#Region To-do
  Fix villager list presentation (Height not matching)
  Fix the way villagers are created
*/

const VillagerCard = ({ villagers }) => {
  const [isHidden, setHidden] = useState({});

  const handleClick = (villagerId) => {
    setHidden((prev) => ({
      ...prev,
      [villagerId]: !prev[villagerId], // Toggle the specific villager's state
    }));
  };

  return (
    <div className="villagerList">
      {villagers.map((villager) => (
        <div key={villager.id}>

          {/* Collapsed Card */}
          <div className={`card-expanded ${isHidden[villager.id] ? "hidden" : ""}`}>
            <div className="card">
              <img src="images/200x150.png" alt="Character" />
              <div className="card-details">
                <span>{villager.name}</span>
                <span
                  className="more-options"
                  onClick={() => handleClick(villager.id)}
                >
                  ...
                </span>
              </div>
            </div>          
          </div>

          {/* Expanded Card */}
          <div className={`card-expanded  ${isHidden[villager.id] ? "" : "hidden"}`}>
            <div className="card">
              <div className='content'>
              <p>Job: {villager.job || "Unknown"}</p>
              <p>Age: {villager.age || "Unknown"}</p>
              <ul>Stats:
                {Object.entries(villager.stats).map(([key, value]) => (
                  <li key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </li>
                ))}
              </ul>
              <p>Inventory:</p>
              <ul>
                {Object.entries(villager.inventory).map(([key, value]) => (
                  <li key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </li>
                ))}
              </ul>
              </div>
              <div className="card-details">
                <span>{villager.name}</span>
                <span
                  className="more-options"
                  onClick={() => handleClick(villager.id)}
                >
                  ...
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VillagerCard;