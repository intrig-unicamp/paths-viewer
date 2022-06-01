import { Wrapper } from "@googlemaps/react-wrapper";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { IEntity } from "../../models/IEntity";

interface MapWrapperProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  entities: IEntity[];
}

const MapWrapper: FunctionComponent<MapWrapperProps> = ({
  center,
  zoom,
  entities,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          clickableIcons: false,
          // disableDefaultUI: true,
          // fullscreenControl: false,
          // mapTypeControl: false,
          // maxZoom: 1,
          // minZoom: 10,
          // restriction: null,
          streetViewControl: false,
          zoom,
          // zoomControl: false,
        })
      );
    }
  }, [center, ref, zoom, map]);

  useEffect(() => {
    entities?.forEach(({ coordinates, color }) => {
      new google.maps.Polyline({
        geodesic: true,
        map,
        path: coordinates?.map((row) => ({
          lat: Number(row.latitude),
          lng: Number(row.longitude),
        })),
        strokeColor: color,
        strokeOpacity: 0.5,
        strokeWeight: 2,
      });
    });
  }, [entities, map]);

  return <div ref={ref} id="map" />;
};

interface MapProps {
  entities: IEntity[];
}

const Map: FunctionComponent<MapProps> = ({ entities }) => {
  const NEXT_PUBLIC_GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const center = {
    lat: Number(entities[0]?.coordinates?.[0].latitude),
    lng: Number(entities[0]?.coordinates?.[0].longitude),
  };

  if (!NEXT_PUBLIC_GOOGLE_API_KEY) {
    throw new Error("No Google Maps API Key specified.");
  }

  return (
    <Wrapper apiKey={NEXT_PUBLIC_GOOGLE_API_KEY}>
      <MapWrapper center={center} zoom={14} entities={entities} />
    </Wrapper>
  );
};

export default Map;
