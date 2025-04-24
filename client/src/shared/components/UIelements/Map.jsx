import React, { useRef, useEffect } from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import './Map.css';

const MapComponent = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });
  }, [center, zoom]);

  return (
    <div 
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default MapComponent;
