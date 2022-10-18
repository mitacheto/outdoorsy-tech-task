import React from 'react';

export default function VehiclesComponent({ fetchedData, imagesData }) {
    return (
        <div className='results'>
            {fetchedData &&
                fetchedData.map((item) => {
                    return (
                        <div className='itemContainer' key={item.id}>
                            <img className='vehicleImg' src={item.attributes.primary_image_url} alt={item.attributes.vehicle_title}></img>
                            <div className='itemHeader'>{item.attributes.name}</div>
                        </div>
                    );
                })}
        </div>
    );
}
