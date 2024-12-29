import React, { useState } from 'react';
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

const Game = ({ grid, setGrid, cityResources, setResources }) => {

    // State for Selected building
    const [selectedBuilding, setSelectedBuilding] = useState(null)

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
        //{ reference: "building", icon: '🏗️'},
        { reference: "road", icon: '🛣️',
            behaviour: () => null,
            cost: [
                {type: 'gold', quantity: 5},
                {type: 'wood', quantity: 0},
                {type: 'stone', quantity: 10},
            ]
        },
        { reference: "townHall", icon: '🏛️',
            behaviour: () => townHall(),
            cost: [
                {type: 'gold', quantity: 10},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 10},
            ]
        },
        { reference: "house", icon: '🏠',
            behaviour: () => house(),
            cost: [
                {type: 'gold', quantity: 20},
                {type: 'wood', quantity: 20},
                {type: 'stone', quantity: 20},
            ]
        },
        { reference: "lumberjack", icon: '🪓',
            behaviour: () => lumberjack(),
            cost: [
                {type: 'gold', quantity: 10},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 0},
            ]
        },
        { reference: "miner", icon: '⛏️',
            behaviour: () => miner(),
            cost: [
                {type: 'gold', quantity: 10},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 10},
            ]
        },
        { reference: "farm", icon: '🌾',
            behaviour: () => farm(),
            cost: [
                {type: 'gold', quantity: 5},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 5},
            ]
        },
        { reference: "hunter", icon: '⚔️',
            behaviour: () => hunter(),
            cost: [
                {type: 'gold', quantity: 5},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 5},
            ]
        },
        { reference: "fisher", icon: '🎣',
            behaviour: () => fisher(),
            cost: [
                {type: 'gold', quantity: 5},
                {type: 'wood', quantity: 10},
                {type: 'stone', quantity: 5},
            ]
        },
    ];
    //#endregion

    function buildingSelecter(reference) {
        const building = buildingIcons.find((b) => b.reference === reference)
        if (!building) return;

        if (canAfford(building.cost)) {
            setSelectedBuilding(building)
            console.log(`${building.reference} selected!`)
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
    }

    const placeItem = (rowIndex, colIndex) => {
        if (!selectedBuilding) {
            alert('No building selected!');
            return;
        }
    
        if (grid[rowIndex][colIndex] !== 'empty') {
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
                newGrid[rowIndex][colIndex] = selectedBuilding.reference;
                return newGrid;
            });
            console.log(`${selectedBuilding.reference} placed at [${rowIndex}, ${colIndex}]`);
            selectedBuilding.behaviour();
        } else {
            alert('Not enough resources to place this building!');
        }
    };

    //#region Behaviours
    function townHall () {
        console.log("Placed 1 townhall")
    }

    function house () {
        // For each house he consumes more food
    }

    function lumberjack () {
        // For each lumberjack it increases the amount of wood it collects
    }

    function miner () {
        // For each miner it increases the amount of stone it collects
    }

    function farm () {
        // For each farm it increases the amount of food it collects
    }

    function hunter () {
        // For each farm it increases the amount of food it collects as well some other material as leather and wool
    }

    function fisher () {
        // For each farm it increases the amount of food it collects
    }
    //#endregion

    return (
        <>
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
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`cell ${cell ? 'occupied' : 'empty'}`} // Add class for styles
                            onClick={() => placeItem(rowIndex, colIndex)} // Handle click
                        >
                            {buildingIcons.find(({ reference }) => reference === cell)?.icon || ''}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Game