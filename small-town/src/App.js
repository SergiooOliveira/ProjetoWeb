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
  //#region Variables
  // useState
  const [village, setVillage] = useState(null)
  const [villagers, setVillagers] = useState([]);
  const [cityResources, setResources] = useState([])

  // Arrays for dinamic villagers
  const MaleNames = [ 'John', 'Mark', 'Carl' ]
  const FemaleNames = [ 'Charlotte', 'Amelia', 'Violet' ]
  const Jobs = [ 'Lumber', 'Baker', 'Miner' ]

  // Grid
  const gridSize = 10;
  const [grid, setGrid] = useState(Array.from({ length: gridSize }, () => Array(gridSize).fill('empty')));
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
    let name

    if (villagerGender === 0) {
      // if 0 is male
      name = MaleNames[Math.floor(Math.random() * MaleNames.length)]
    } else if (villagerGender === 1) {
      // if 1 is female
      name = FemaleNames[Math.floor(Math.random() * FemaleNames.length)]
    } else {
      console.log(villagerGender)
    }

    const newVillager = {
      id: villagers.length + 1,
      name: name,
      yearOfBirth: 2000,
      job: Jobs[Math.random() * (Jobs.length - 0) + 0],
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

  //#region Grid
  // Function to place an item on the grid
  const placeItem = (row, col) => {
    // Copy the grid to update state immutably
    const newGrid = grid.map((rowArray) => [...rowArray]);
    // Toggle between empty and building for simplicity
    newGrid[row][col] = newGrid[row][col] === 'empty' ? 'building' : 'empty';
    setGrid(newGrid);
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
      <header>
        <Village village={village}/>        
      </header>

      <body>
        <Villager createVillager={createVillager}/>
        <div>
          <h1>Villagers</h1>
          <ul>
            {villagers.map(villager => (
              <li key={villager.id}>{villager.name}</li>
            ))}
          </ul>
        </div>

        <div className="grid">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${cell}`}
                onClick={() => placeItem(rowIndex, colIndex)}
              >
                {cell === 'building' ? '🏗️' : ''}
              </div>
            ))
          )}
        </div>
      </body>
    </main>
  );
}