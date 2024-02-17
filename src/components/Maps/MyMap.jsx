import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import red from "../../assets/Red.svg";
import yellow from "../../assets/Yellow.svg";
import green from "../../assets/Green.svg";
const containerStyle = {
  width: "auto",
  height: "400px"
};

const center = {
  lat: 12.925908092826257,
  lng: 80.10999503336767
};
function MyMap({ markers }) {
  const points = [
    {
      icon: red,
      point: {
        lat: 12.925908092826257,
        lng: 80.10999503336767
      }
    },
    {
      icon: yellow,
      point: {
        lat: 12.925782980738843,
        lng: 80.10983450793967
      }
    },
    {
      icon: green,
      point: {
        lat: 12.92591313105288,
        lng: 80.11018384800474
      }
    }
  ];

  if (!markers || markers.length === 0) {
    return <div>No markers available.</div>;
  }
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB1p60HbteJZDoegNMQqRY854Zqfaz5a4Q"
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false
      }}
    >
      {points.map((item, index) => (
        <MarkerF key={index} position={item.point} icon={item.icon}></MarkerF>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyMap);
