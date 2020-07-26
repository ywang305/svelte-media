import mapboxgl from 'mapbox-gl';

// https://docs.mapbox.com/help/glossary/access-token/
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxnaWV5YW8iLCJhIjoiY2tjenJwYXlyMG1rNjJybW5taW1mdjBnZCJ9.RhqJ4U0_262BCOyagNjmYA';

const key = {};

const placesUri = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const getPlaceSuggests = async (queryStr, center) => {
  if (queryStr?.trim().length < 2) return [];
  const encodedStr = encodeURI(queryStr);
  const queryCenter = center ? `proximity=${center.lng},${center.lat}&` : '';
  try {
    const resp = await fetch(
      `${placesUri}/${encodedStr}.json?${queryCenter}access_token=${mapboxgl.accessToken}`
    );
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getPlace = async ({ lng, lat }) => {
  try {
    const resp = await fetch(
      `${placesUri}/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export { mapboxgl, key, getPlace, getPlaceSuggests };
