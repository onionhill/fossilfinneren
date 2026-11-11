import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { config } from "../config";

export interface MapPoint {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

/**
 * Map of finds with Kartverket's topographic tiles.
 * UU-avvik 2.4.7: Leaflet's zoom and layer buttons have no visible focus yet.
 * Fix planned by 1 Feb 2027 (see docs/tilgjengelighetserklaering.md).
 */
export function FossilMap({ points, title }: { points: MapPoint[]; title: string }) {
  return (
    <section aria-label={title} className="fossil-map">
      <MapContainer center={[64.5, 12]} zoom={4} scrollWheelZoom={false} style={{ height: 480 }}>
        <TileLayer attribution="&copy; Kartverket" url={config.mapTileUrl} />
        {points.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]} title={point.label}>
            <Popup>{point.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <ul className="fossil-map__list">
        {points.map((point) => (
          <li key={point.id}>{point.label}</li>
        ))}
      </ul>
    </section>
  );
}
