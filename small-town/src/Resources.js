import React from 'react';
  
const Resources = ({ cityResources }) => {
  
    const resourceIcons = {
        gold: '🪙',
        food: '🍎',
        wood: '🪵',
        stone: '🪨',
    };
    
    return (
    <>
        {cityResources.map((resource, index) => (
            <div
                key={index}
                className={`eventList-ResourceControlHud-${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}`}
            >
                <span>
                {resourceIcons[resource.type]}: {resource.quantity}
                </span>
            </div>
        ))}
    </>
    );
}

export default Resources;