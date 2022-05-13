import { Wrapper } from "@googlemaps/react-wrapper";
import { FunctionComponent, useEffect, useRef } from "react";
import "./Map.css";

interface MapContainerProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const MapContainer: FunctionComponent<MapContainerProps> = ({
  center,
  zoom,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }
  }, [center, ref, zoom]);

  return <div ref={ref} id="map" />;
};

const Map: FunctionComponent = () => {
  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  if (!REACT_APP_GOOGLE_API_KEY) {
    throw new Error("No Google Maps API Key specified.");
  }

  return (
    <Wrapper apiKey={REACT_APP_GOOGLE_API_KEY}>
      <MapContainer center={{ lat: -22.8210849, lng: -47.066406 }} zoom={14} />
    </Wrapper>
  );
};

export default Map;
