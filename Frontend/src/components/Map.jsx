import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const Map = ({ center, markers }) => {
  const apiKey = 'AIzaSyBhmTiJlx-7WspC835Yf3rGC3tZHpB1Kjo';

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
