import React from 'react';
import './Villager.css';

const Villager = ({  }) => {

  const generateVillager = function() {
    
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

  const work = function() {

  };

  return (
    <>
      <div>
          <button onClick={generateVillager}>Create Villager</button>
          <button onClick={work}>Create Villager</button>
      </div>
    </>
  );
}

export default Villager;