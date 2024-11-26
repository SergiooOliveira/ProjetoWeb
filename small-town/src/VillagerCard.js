import React, { useState } from 'react';
import './VillagerCard.css';

/*#Region To-do
  Fix villager list presentation
  Fix the way villagers are created

  hidden class not working as intended
*/

const VillagerCard = ({ villagers }) => {
  const [expandedVillagers, setExpandedVillagers] = useState({});

  const handleClick = (villagerId) => {
    setExpandedVillagers((prev) => ({
      ...prev,
      [villagerId]: !prev[villagerId], // Toggle the specific villager's state
    }));
  };

  return (
    <div className="villagerList">
      {villagers.map((villager) => (
        <div key={villager.id}>
          {/* Collapsed Card */}
          <div className={`card ${expandedVillagers[villager.id] ? "hidden" : ""}`}>
            <div className="card-expanded">
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
          <div className={`card-expanded ${expandedVillagers[villager.id] ? "" : "hidden"}`}>
            <div className="card">
              <p>
                <strong>Job:</strong> {villager.job || "Unknown"}
              </p>
              <p>
                <strong>Age:</strong> {villager.age || "Unknown"}
              </p>
              <ul>
                {Object.entries(villager.stats).map(([key, value]) => (
                  <li key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Inventory:</strong> {villager.inventory.name} (
                {villager.inventory.quantity})
              </p>
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
      ))}
    </div>
  );
}

export default VillagerCard;