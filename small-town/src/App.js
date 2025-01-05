import './App.css';
import Village from './Village'
import Villager from './Villager';
import Resources from './Resources';
import Game from './Game';
import Counter from './Calendar';
import React, { useState, useEffect, useRef } from 'react';


// FIREBASE
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

//#region TODO:
/*
  - Verify if resource type already exists in list and Add to it
  - Get Male and Female names from API
*/
//#endregion

export default function App() {

  //FIREBASE
  const [startTime, setStartTime] = useState(Date.now());
  const [hasReached5000, setHasReached5000] = useState(false);
  const [elapsedTimes, setElapsedTimes] = useState([]); // To store the times fetched from Firestore
  const docRef = doc(db, "gameData", "elapsedTimes"); // Firebase document reference



  //#region Variables
  // useState
  const [village, setVillage] = useState(null)
  const [villagers, setVillagers] = useState([]);
  const [cityResources, setResources] = useState(null)
  const [maxResources, setMaxResources] = useState()
  const maxResourcesByLevel = 1000
  const villagersRef = useRef(villagers)

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
  const createVillager = function(customID) {
    
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
      id: customID || villagers.length + 1,
      name: villagerName,
      yearOfBirth: 2000,
      job: null,
      gender: villagerGender,
      inventory: [],
    }

    console.log("Created new Villager", newVillager)

    setVillagers((prevVillagers) => {
      const updatedVillagers = [...prevVillagers, newVillager]
      villagersRef.current = updatedVillagers
      return updatedVillagers
    })

    setVillage((prevVillage) => ({
      ...prevVillage,
      villagePopulation: prevVillage.villagePopulation + 1
    }))
  };

  const testData = function() {
    const defaultVillagers = [
      {
        id: 0,
        name: "John",
        yearOfBirth: 2000,
        job: null,
        gender: 'M',
        inventory: [],        
      },
      {
        id: 1,
        name: "Sarah",
        yearOfBirth: 2000,
        job: null,
        gender: 'F',
        inventory: [],
      }
    ]

    setVillagers(defaultVillagers)    
    
    setVillage((prevVillage) => ({
      ...prevVillage,
      villagePopulation: villagers.length + 2
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

  // const generateRandomResource = function () {
  //   let type = Math.floor(Math.random() * 4)
  //   let quantity = Math.floor(Math.random() * 100)

  //   const resources = [ 'gold', 'food', 'wood', 'stone' ]

  //   createResources(resources[type], quantity)
  // }

  // // Function to manage resources
  // const createResources = function (type, quantity) {
  //   // Find the resource matching the specified type
  //   const resourceIndex = cityResources.findIndex(resource => resource.type === type);
  
  //   if (resourceIndex !== -1) {
  //     // Copy the current resources array
  //     const updatedResources = [...cityResources];
  
  //     // Update the quantity of the matching resource
  //     updatedResources[resourceIndex] = {
  //       ...updatedResources[resourceIndex],
  //       quantity: updatedResources[resourceIndex].quantity + quantity,
  //     };
  
  //     // Set the updated resources array
  //     setResources(updatedResources);
  //   } else {
  //     console.error(`Resource of type "${type}" not found.`);
  //   }
  // };
  //#endregion

  // Call createVillage when the component mounts
  useEffect(() => {
    createVillage(2);
    testData();
    resourceInitializer();
    setMaxResources(maxResourcesByLevel)
  }, []);


    /******************FIREBASE************************* */
     // Fetch times from Firebase when the app loads
     useEffect(() => {
      const fetchTimes = async () => {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setElapsedTimes(docSnap.data().times || []);
          } else {
            console.log("No times found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching times from Firestore:", error);
        }
      };
  
      fetchTimes();
  
      // Real-time listener for changes to the times document
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setElapsedTimes(docSnap.data().times || []);
        }
      });
  
      return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);
  
    // Save elapsed time to Firebase
    const saveElapsedTimeToFirebase = async (elapsedTime) => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            times: [...docSnap.data().times, elapsedTime],
          });
        } else {
          await setDoc(docRef, { times: [elapsedTime] });
        }
        console.log("Time saved:", elapsedTime);
      } catch (error) {
        console.error("Error saving elapsed time:", error);
      }
    };
  
    // Track gold and save elapsed time when it reaches 5000
    useEffect(() => {
      if (cityResources) {
        const goldResource = cityResources.find((resource) => resource.type === "gold");
        if (goldResource && goldResource.quantity >= 5000) {
          if (!hasReached5000) {
            // alert("Won")
            const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
            saveElapsedTimeToFirebase(elapsedTime);
            setStartTime(Date.now()); // Reset start time
            setHasReached5000(true); // Mark as reached
          }
        } else {
          setHasReached5000(false); // Reset when gold drops below 5000
        }
      }
    }, [cityResources]);
  
  
    /******************FIREBASE************************* */

  // JSX elements
  return (
    <main>
      <header>
        <Village village={village}/>        
      </header>

      <body>
      <div className='content'>
        <div className='villagerListApp'>
          <Villager createVillager={createVillager} villagers={villagers} setResources={setResources}/>
        </div>

        <div className='game'>
          <Game 
            grid={grid}
            setGrid={setGrid}
            cityResources={cityResources}
            setResources={setResources}
            villagers={villagers}
            setVillagers={setVillagers}
            setVillage={setVillage}
            createVillager={createVillager}
            maxResources={maxResources}
            setMaxResources={setMaxResources}
            maxResourcesByLevel={maxResourcesByLevel}
            villagersRef={villagersRef}
          />          
        </div>

        <div className='eventList'>
          <div className='eventList-Calendar'>
            <Counter />
          </div>
          <div className='eventList-ResourceControlHud'>
            <Resources cityResources={cityResources} maxResources={maxResources}/>
          </div>
          {/*<button onClick={generateRandomResource}>Create Resource</button>*/}
          {/*  MOSTRAR OS TEMPOS*/}
          <div className="eventList-Listing">
            <h3>Elapsed Times (seconds):</h3>
            <ul>
                {elapsedTimes.map((time, index) => (
                <li key={index}>Time {index + 1}: {time}s</li>
                ))}
            </ul>
          </div>
          {/*******************/ }
        </div>  
      </div>
      </body>
    </main>
  );
}