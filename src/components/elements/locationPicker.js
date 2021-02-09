import React, {useState, useEffect} from "react";
import Location from "react-leaflet-location-picker";

const LocationPicker = ({value, onChange}) => {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    if(value){
        setPoints([value]);
    }
  }, [value])
  const pointMode = {
    control: {
      values: points,
      onClick: point => {
        setPoints([point]);
        onChange(point);
      },
      onRemove: point =>{
        setPoints([]);
      },
    }
  };

  return <Location pointMode={pointMode} />;
};

export default LocationPicker;