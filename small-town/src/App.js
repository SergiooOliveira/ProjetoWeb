import './App.css';
import Village from './Village'
import Villager from './Villager';
import React, { useState, useEffect } from 'react';

//#region TODO:
/*
  - Verify if resource type already exists in list and Add to it
*/
//#endregion

export default function App() {
  const [village, setVillage] = useState(null)
  const [villagers, setVillagers] = useState([]);
  const [cityResources, setResources] = useState([])


  //#region Village functions
  // Function to create new Village
  const createVillage = (populationLimit) => {
    // New Village properties
    const newVillage = {
      villageName: "My Village",
      villageList: villagers,
      villagePopulation: 0,
      villagePopulationLimit: populationLimit,
      resources: cityResources
    }

    setVillage(newVillage)
  };
  //#endregion

  //#region Villager functions
  // Function to create a new Villager
  const createVillager = function() {
    
    const newVillager = {
      id: villagers.length + 1,
      name: "John",
      yearOfBirth: 2000,
      job: "Lumber",
      gender: 'M',
      inventory: [],
      stats: []
    }

    console.log("Created new Villager")

    if (villagers.length < village.villagePopulationLimit) {
      setVillagers([...villagers, newVillager]);
      setVillage((prevVillage) => ({
        ...prevVillage,
        villagePopulation: villagers.length + 1
      }))
    } else
      console.log("Limit reached")
  };
  //#endregion

  //#region Resources functions
  // Function to manage resources
  const createResources = function(type, quantity) {
    const newResource = {
      type: type,
      quantity: quantity
    }

    // Add new resource to list
    setResources([...cityResources, newResource]);
  };
  //#endregion

  // Call createVillage when the component mounts
  useEffect(() => {
    createVillage(20);
    createResources("wood", 100);
    createResources("food", 100);
  }, []);

  // JSX elements
  return (
    <main>
      <div> {/* Header */}
        <Village village={village}/>
        <Villager createVillager={createVillager}/>
        <div>
          <h1>Villagers</h1>
          <ul>
            {villagers.map(villager => (
              <li key={villager.id}>{villager.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}