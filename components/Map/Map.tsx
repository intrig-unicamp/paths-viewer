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
  const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);

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
    map?.setCenter(center);
  }, [center]);

  useEffect(() => {
    polylines.forEach((polyline) => polyline.setMap(null));
    setPolylines([]);

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
  const DEFAULT_CENTER = {
    lng: -47.075616,
    lat: -22.8225099,
  };

  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    DEFAULT_CENTER
  );

  useEffect(() => {
    if (entities?.at(0)?.coordinates?.at(0)) {
      const [{ coordinates }] = entities;
      const [{ latitude, longitude }] = coordinates;

      if (
        center.lat === DEFAULT_CENTER.lat &&
        center.lng === DEFAULT_CENTER.lng
      ) {
        setCenter({
          lng: Number(longitude),
          lat: Number(latitude),
        });
      }
    }
  }, [entities]);

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
