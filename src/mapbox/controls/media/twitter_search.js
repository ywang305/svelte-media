// @ts-ignore
import { mapboxgl, key } from '../mapbox.js';

function getRnd(min, max, id_str) {
  if (!id_str) {
    return Math.random() * (max - min) + min;
  }
  const id_ran = Number(id_str.slice(-7)) / 10000000;
  return id_ran * (max - min) + min;
}

function distance(coord1, coord2) {
  return (
    // @ts-ignore
    new mapboxgl.LngLat(coord1.lng, coord1.lat).distanceTo(
      // @ts-ignore
      new mapboxgl.LngLat(coord2.lng, coord2.lat)
    ) / 1000
  ); // kilo-meters
}
function getTwiPlaceCenter(twiObj) {
  if (twiObj.place && twiObj.place.bounding_box) {
    const coords = twiObj.place.bounding_box.coordinates[0];
    const [lng1, lat1] = coords[0];
    const [lng2, lat2] = coords[2];
    const placeCenter = {
      lng: (lng1 + lng2) / 2,
      lat: (lat1 + lat2) / 2,
    };
    return placeCenter;
  }
}

export default async ({ lng, lat, bounds, lang = '' }) => {
  const ne = bounds._ne;
  const sw = bounds._sw;
  const search_radius = distance(ne, sw) / 4;

  const resp = await fetch(
    `https://nyc-function.azurewebsites.net/api/twitter_search?lng=${lng}&lat=${lat}&radius=${search_radius}&lang=${lang}`
  );
  const tweets = await resp.json();
  return tweets
    ? tweets.map((obj) => {
        const lng = getRnd(
          sw.lng,
          ne.lng,
          obj.place && obj.place.bounding_box ? obj.id_str : null
        );
        const lat = getRnd(
          sw.lat,
          ne.lat,
          obj.place && obj.place.bounding_box ? obj.id_str : null
        );
        return { ...obj, lng, lat };
      })
    : [];
};
