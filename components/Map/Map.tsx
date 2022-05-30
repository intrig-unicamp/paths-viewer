import { Wrapper } from "@googlemaps/react-wrapper";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { IFile } from "../../pages/_app";

interface MapContainerProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  files: IFile[];
}

const MapContainer: FunctionComponent<MapContainerProps> = ({
  center,
  zoom,
  files,
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
    files.forEach(({ data, color }) => {
      new google.maps.Polyline({
        geodesic: true,
        map,
        path: data?.map((row) => ({
          lat: Number(row.latitude),
          lng: Number(row.longitude),
        })),
        strokeColor: color,
        strokeOpacity: 0.5,
        strokeWeight: 2,
      });
    });
  }, [files, map]);

  return <div ref={ref} id="map" />;
};

interface MapProps {
  files: IFile[];
}

const Map: FunctionComponent<MapProps> = ({ files }) => {
  const { REACT_APP_GOOGLE_API_KEY } = process.env;
  const center = {
    lat: Number(files[0]?.data?.[0].latitude),
    lng: Number(files[0]?.data?.[0].longitude),
  };

  if (!REACT_APP_GOOGLE_API_KEY) {
    throw new Error("No Google Maps API Key specified.");
  }

  return (
    <Wrapper apiKey={REACT_APP_GOOGLE_API_KEY}>
      <MapContainer center={center} zoom={14} files={files} />
    </Wrapper>
  );
};

export default Map;
