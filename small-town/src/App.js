import './App.css';
import Village from './Village'
import Villager from './Villager';
import Resources from './Resources';
import Game from './Game';
import Counter from './Calendar';
import React, { useState, useEffect } from 'react';

//#region TODO:
/*
  - Verify if resource type already exists in list and Add to it
  - Get Male and Female names from API
*/
//#endregion

export default function App() {

  //#region Variables
  // useState
  const [village, setVillage] = useState(null)
  const [villagers, setVillagers] = useState([]);
  const [cityResources, setResources] = useState(null)

  // Arrays for dinamic villagers
  const MaleNames = [ 'John', 'Mark', 'Carl' ]
  const FemaleNames = [ 'Charlotte', 'Amelia', 'Violet' ]

  // Grid
  const gridSize = 18;
  const [grid, setGrid] = useState(Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => ({ type: 'empty' }))));
  //#endregion

  //#region Village functions
  // Function to create new Village
  const createVillage = function(populationLimit) {
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
    
    let villagerGender = Math.floor(Math.random() * 2)
    let villagerName

    if (villagerGender === 0) {
      // if 0 is male
      villagerName = MaleNames[Math.floor(Math.random() * MaleNames.length)]
      villagerGender = 'M'
    } else if (villagerGender === 1) {
      // if 1 is female
      villagerName = FemaleNames[Math.floor(Math.random() * FemaleNames.length)]
      villagerGender = 'F'
    } else {
      console.log(villagerGender)
    }

    const newVillager = {
      id: villagers.length + 1,
      name: villagerName,
      yearOfBirth: 2000,
      job: null,
      gender: villagerGender,
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

  const testData = function() {
    const defaultVillager1 = {
      id: 0,
      name: "John",
      yearOfBirth: 2000,
      job: null,
      gender: 'M',
      inventory: [
        { name: "wood", quantity: 100, }
      ],
      stats: [
        { health: 100, },
        { strength  : 10, },
        { vigor: 20, },
      ]
    }

    const defaultVillager2 = {
      id: 1,
      name: "Sarah",
      yearOfBirth: 2000,
      job: null,
      gender: 'F',
      inventory: {
        name: "wood",
        quantity: 100,
      },
      stats: {
        health: 100,
        strength: 10,
        vigor: 20,
      }
    }

    setVillagers(defaultVillager1)
    setVillagers([...villagers, defaultVillager2])
    
    setVillage((prevVillage) => ({
      ...prevVillage,
      villagePopulation: villagers.length + 1
    }))

  }
  //#endregion

  //#region Resources functions
  // Resource initializer
  const resourceInitializer = function () {
  console.log("Resource Initializer")

    const resources = [
      { type: "gold", quantity: 50 },
      { type: "food", quantity: 50 },
      { type: "wood", quantity: 50 },
      { type: "stone", quantity: 50 },
    ];

    setResources(resources)
  }

  const generateRandomResource = function () {
    let type = Math.floor(Math.random() * 4)
    let quantity = Math.floor(Math.random() * 100)

    const resources = [ 'gold', 'food', 'wood', 'stone' ]

    createResources(resources[type], quantity)
  }

  // Function to manage resources
  const createResources = function (type, quantity) {
    // Find the resource matching the specified type
    const resourceIndex = cityResources.findIndex(resource => resource.type === type);
  
    if (resourceIndex !== -1) {
      // Copy the current resources array
      const updatedResources = [...cityResources];
  
      // Update the quantity of the matching resource
      updatedResources[resourceIndex] = {
        ...updatedResources[resourceIndex],
        quantity: updatedResources[resourceIndex].quantity + quantity,
      };
  
      // Set the updated resources array
      setResources(updatedResources);
    } else {
      console.error(`Resource of type "${type}" not found.`);
    }
  };
  //#endregion

  // Call createVillage when the component mounts
  useEffect(() => {
    createVillage(20);
    testData();
    resourceInitializer();
  }, []);

  // JSX elements
  return (
    <main>
      <header>
        <Village village={village}/>        
      </header>

      <body>
      <div className='content'>        
        <div className='villagerListApp'>
          <Villager createVillager={createVillager} villagers={villagers}/>
        </div>

        <div className='game'>
          <Game grid={grid} setGrid={setGrid} cityResources={cityResources} setResources={setResources} villagers={villagers} setVillagers={setVillagers}/>          
        </div>

        <div className='eventList'>
          <div className='eventList-Calendar'>
            <Counter />
          </div>
          <div className='eventList-ResourceControlHud'>
            <Resources cityResources={cityResources}/>
          </div>
          {/*<button onClick={generateRandomResource}>Create Resource</button>*/}
          <div className='eventList-Listing'>
            
          </div>
        </div>  
      </div>
      </body>
    </main>
  );
}