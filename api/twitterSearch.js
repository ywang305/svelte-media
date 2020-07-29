import 'isomorphic-fetch';

const TWITTER_SEARCH = 'https://api.twitter.com/1.1/search/tweets.json';

export default async (req, res) => {
  const { query } = req;
  const { lat, lng } = query;
  const resp = await fetch(
    TWITTER_SEARCH + `?geocode=${lat},${lng},5mi&result_type=mixed&count=100`
  );
  const json = await resp.json();
  res.status(200).json(
    json?.statuses.map(({ created_at, id, id_str, text, user }) => ({
      created_at,
      id,
      id_str,
      text,
      user_name: user.name,
    }))
  );
};
