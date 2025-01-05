import React, { useState, useEffect, useRef } from 'react';
import './Game.css'

//#region TODO:
/*
    - Fix grid height
    - Create override so first building of each is free
    - Tweak cost
    - Create some objectives for player to complete
    - Create Gameloop
    - Create Workplaces in each building so the villagers have something to do
    - Develop the behaviour of each building
*/
//#endregion

const Game = ({ grid, setGrid, cityResources, setResources, villagers, setVillagers }) => {

    //#region Variables
    // State for Selected building
    const [selectedBuilding, setSelectedBuilding] = useState(null)
    const [clickedBuilding, setclickedBuilding] = useState({})
    const loopActive = useRef(false); // Indicates if the game loop is running

    // Tracks the number of each building type
    // 'maxWorks' can change depending on upgrades
    const buildingCount = useRef({});

    // Hire Vilaggers modal
    const [isModalOpen, setModalOpen] = useState(false); // Modal toggle
    const [availableVillagers, setAvailableVillagers] = useState([]); // Villagers to display
    const villagersRef = useRef(villagers)

    //#endregion

    //#region Building Icons
    const buildingIcons = [
        /*{ reference: "empty", icon: '',
            behaviour: () => null,
            cost: [
                {type: 'gold', quantity: 0},
                {type: 'wood', quantity: 0},
                {type: 'stone', quantity: 0},
            ]
        },*/
        { reference: "Road", icon: '🛣️',
            cost: [
                {type: 'gold', quantity: 5},
                {type: 'wood', quantity: 0},
                {type: 'stone', quantity: 10},
            ]
        },
        { reference: "Town Hall", icon: '🏛️',
            cost: [
                {type: 'gold', quantity: 10},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 10},
            ]
        },
        { reference: "House", icon: '🏠',
            cost: [
                {type: 'gold', quantity: 20},
                {type: 'wood', quantity: 20},
                {type: 'stone', quantity: 20},
            ]
        },
        { reference: "Lumberjack", icon: '🪓',
            cost: [
                {type: 'gold', quantity: 10},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 0},
            ],
            resourceGainPerWorker: 2,
            foodConsumptionPerWorker: 1
        },
        { reference: "Miner", icon: '⛏️',
            cost: [
                {type: 'gold', quantity: 10},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 10},
            ],
            resourceGainPerWorker: 2,
            foodConsumptionPerWorker: 1
        },
        { reference: "Farm", icon: '🌾',
            cost: [
                {type: 'gold', quantity: 5},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 5},
            ]  ,
            resourceGainPerWorker: 2,
            foodConsumptionPerWorker: 1         
        },
        { reference: "Hunter", icon: '⚔️',
            cost: [
                {type: 'gold', quantity: 5},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 5},
            ],
            resourceGainPerWorker: 2,
            foodConsumptionPerWorker: 1
        },
        { reference: "Fisher", icon: '🎣',            
            cost: [
                {type: 'gold', quantity: 5},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 5},
            ],
            resourceGainPerWorker: 2,
            foodConsumptionPerWorker: 1
        },
    ];
    //#endregion

    //#region Functions
    function buildingSelecter(reference) {
        const building = buildingIcons.find((b) => b.reference === reference)
        if (!building) return;

        if (canAfford(building.cost)) {
            setSelectedBuilding(building)
            //console.log(`${building.reference} selected!`)
        }
    }

    const canAfford = (cost) => {
        return cost.every(({ type, quantity }) => {
            const resource = cityResources.find((res) => res.type === type);
            return resource && resource.quantity >= quantity;
        })
    }

    const deductResources = (cost) => {
        const updatedResources = cityResources.map((resource) => {
            const costItem = cost.find((c) => c.type === resource.type);
            if (costItem) {
                return { ...resource, quantity: resource.quantity - costItem.quantity };
            }
            return resource;
        });
        setResources(updatedResources);
        //console.log("After deducted resources: ", cityResources)
    }

    const placeItem = (rowIndex, colIndex) => {
        if (!selectedBuilding) {
            alert('No building selected!');
            return;
        }
    
        if (grid[rowIndex][colIndex].type !== 'empty') {
            alert('This cell is already occupied!');
            return;
        }
    
        // Ensure resources are sufficient
        if (canAfford(selectedBuilding.cost)) {
            // Deduct resources
            deductResources(selectedBuilding.cost);            

            // Update the grid to include the placed building
            setGrid((prevGrid) => {
                const newGrid = [...prevGrid];
                newGrid[rowIndex][colIndex] = {
                    type: selectedBuilding.reference,
                    id: `${rowIndex}-${colIndex}`,
                    workers: [],
                    coordinates: { row: rowIndex, col: colIndex }
                }
                return newGrid;
            });
            //console.log(`${selectedBuilding.reference} placed at [${rowIndex}, ${colIndex}]`);
            
            buildingCount.current[selectedBuilding.reference] =
                (buildingCount.current[selectedBuilding.reference] || 0) + 1;            
            if (!loopActive.current) startGameLoop(); // Ensure game loop is running

        } else {
            alert('Not enough resources to place this building!');
        }
    };

    const startGameLoop = () => {
        //console.log("Starting a loop")
        loopActive.current = true;
        let lastUpdateTime = Date.now(); // Tracks the last update time

        const loop = () => {
            //console.log("In loop")
            if (!loopActive.current) return; // Stop the loop if inactive

            const now = Date.now();
            const elapsedTime = (now - lastUpdateTime) / 1000; // Time in seconds

            if (elapsedTime >= 1) {                

                Object.entries(buildingCount.current).forEach(([buildingType, count]) => {
                    const building = buildingIcons.find(b => b.reference === buildingType)
                    if (!building) return

                    let workers = []

                    villagersRef.current.forEach((v) => {
                        if (v.job) workers.push(v)
                    })

                    // console.log("Workers: ", workers)

                    if (workers.length > 0) {

                        findGems(workers)

                        switch (buildingType) {
                            case "Lumberjack":
                                addResources("wood", workers.length * building.resourceGainPerWorker);         // Getting wood/s
                                addResources("food", workers.length * -building.foodConsumptionPerWorker);     // Consuming food/s
                                break;
                            case "Miner":
                                addResources("stone", workers.length * building.resourceGainPerWorker);        // Getting stone/s
                                addResources("food", workers.length * -building.foodConsumptionPerWorker);     // Consuming food/s
                                break;
                            case "Farm": 
                            case "Hunter": 
                            case "Fisher":
                                addResources("food", workers.length * building.resourceGainPerWorker);         // Getting stone/s
                                addResources("food", workers.length * -building.foodConsumptionPerWorker);     // Consuming food/s
                                break;
                            default:
                                break;
                        }
                    }
                });

                lastUpdateTime = now;                

            }

            requestAnimationFrame(loop); // Schedule next frame   
        };
        
        loop()                 
    };

    const handleCellClick = (rowIndex, colIndex) => {
        const cellData = grid[rowIndex][colIndex]

        if (cellData.type === 'empty') {
            placeItem(rowIndex, colIndex)
        } else {
            setclickedBuilding(cellData)
        }
    }
    //#endregion

    //#region Resource Management
    const addResources = (type, amount) => {
        // console.log(`Adding ${amount} of ${type}`);
        setResources((prevResources) =>
            prevResources.map((resource) =>
                resource.type === type
                    ? { ...resource, quantity: resource.quantity + amount }
                    : resource
        ));
    };

    function hasFood(resources) {

        if (!resources) {
            //console.log("Resources are undefined");
            return true
        }

        const food = resources.find(resource => resource.type === 'food');
        //console.log("Checking food in hasFood:", food);
        return food && food.quantity > 0;
    }

    const findGems = (workers) => {
        // console.log("Trying to find some gems")

        const gemChance = 0.9;

        workers.forEach((worker) => {
            if (worker.job === 'Miner') {
                // console.log(`${worker.name} attempting to find a gem`)

                if (Math.random() < gemChance) {
                    // console.log(`${worker.name} found a gem`)

                    const villagerIndex = villagersRef.current.findIndex(v => v.id === worker.id)
                    if (villagerIndex !== -1) {
                        const villager = villagersRef.current[villagerIndex]

                        // Update inventory in villagerRef
                        const gemIndex = villager.inventory.findIndex(item => item.name === 'gem')
                        if (gemIndex !== -1) {
                            villager.inventory[gemIndex].quantity += 1
                        } else {
                            villager.inventory.push({ name: "gem", quantity: 1 })
                        }
                    }
                } // else console.log(`${worker.name} did not find a gem`)
            }
        })

        // Only update villagers if we've made changes
        setVillagers([...villagersRef.current])
    };

    function winCon (resources) {

        if (!resources) {
            //console.log("Resources are undefined");
            return false
        }

        const gold = resources.find(resource => resource.type === 'gold');
        console.log("Checking gold in winCon:", gold.quantity);
        // console.log(gold && gold.quantity >= 500);
        return gold && gold.quantity >= 5000;
    }
    //#endregion


    //#region Modal
    const openModal = () => {  
        setAvailableVillagers(villagers.filter(villager => villager.job === null))
        setModalOpen(true);  // Open the modal window
    };

    const closeModal = () => setModalOpen(false);

    const hireVillager = (villagerId) => {
        //console.log("Hiring Villager: ", villagerId);

        // setVillagers((prevVillagers) =>
        //     prevVillagers.map((villager) =>
        //         villager.id === villagerId ? {
        //             ...villager,
        //             job: clickedBuilding.type,
        //             assignedBuildingID: clickedBuilding.id
        //             } : villager
        //     )
        // );

        setVillagers((prevVillagers) => {
            const updatedVillagers = prevVillagers.map((villager) => 
                villager.id === villagerId
                ? { ...villager, job: clickedBuilding.type, assignedBuildingID: clickedBuilding.id }
                : villager
            )

            villagersRef.current = updatedVillagers

            return updatedVillagers
        })
        
        console.log("Updated villagers via ref:", villagersRef.current)
        
        if (clickedBuilding.coordinates) {
            const { row, col } = clickedBuilding.coordinates
         
            setGrid((prevGrid) => {
                const newGrid = [...prevGrid]
                
                // Ensure workers array is defined
                const building = newGrid[row][col]
                if (!building.workers) building.workers = []

                // Add the villager only if they're not already in the list
                if (!building.workers.includes(villagerId)) building.workers.push(villagerId)
                
                return newGrid
            })
        } else console.error("Building coordinates are missing")

        

        alert(`Villager ${villagerId} Hired`)
        closeModal();
    };
    
    //#endregion

    useEffect(() => {
        //console.log("Updated cityResources: ", cityResources);

        if (!hasFood(cityResources)) {
            alert("Game Over")
            loopActive.current = false
            return
        }

        if (winCon(cityResources)) {
            alert("Won")
            loopActive.current = false
            return
        }
        
    }, [cityResources]);

    useEffect(() => {        
        return () => {
            // Clean up on unmount
            loopActive.current = false;
        };
    }, []);

    //#region JSX
    return (
        <>
            {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Hire a Villager</h2>
                    <ul>
                        {availableVillagers.map(villager => (
                            <li key={villager.id}>
                                {villager.name} ({villager.gender})
                                <button onClick={() => hireVillager(villager.id)}>Hire</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={closeModal} className="close-button">Close</button>
                </div>
            </div>
            )}
            <div className='game-BuildingMenu'>
                {buildingIcons.map(({reference, icon, cost}) => (
                    <div
                    key={reference}
                    className={`game-BuildingMenu-Icon ${selectedBuilding === reference ? 'selected' : ''}`}
                    onClick={(event) => buildingSelecter(reference)}
                    data-reference={`${reference}`} // Tooltip data
                    >
                        <span>{icon}</span>
                    </div>
                ))}
            </div>
            <div className="grid">                
                {grid.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`cell ${cell.type !== 'empty' ? 'occupied' : 'empty'}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            >
                                {buildingIcons.find(({ reference }) => reference === cell.type)?.icon || ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="game-SelectedBuilding">
                {clickedBuilding && clickedBuilding.type ? (                
                    <div className="game-SelectedBuilding-Content">
                        <div className="game-SelectedBuilding-Content-Title">
                            {clickedBuilding.type}
                        </div>
                        <div className="game-SelectedBuilding-Content-Buttons">
                            <button onClick={openModal}>Hire a Villager</button>
                        </div>
                        <div className='game-SelectedBuilding-Content-Workers'>
                            <h3>Assigned Workers</h3>
                            {clickedBuilding.workers && clickedBuilding.workers.length > 0 ? (
                                <ul>
                                    {clickedBuilding.workers.map(workerId => {
                                        const worker = villagers.find(v => v.id === workerId)
                                        return <li key={workerId}>{worker?.name || 'Unknown Worker'}</li>
                                    })}
                                </ul>
                            ) : (
                                <p>No workers assigned</p>
                            )}
                        </div>
                    </div>                
                ) : null }
            </div>
        </>
    );
    //#endregion
}

export default Game