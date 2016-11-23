import { get } from 'axios';

const options = { responseType: 'json' };

export default function fetchTimeline(id) {
  return get(`/twitter_timeline/${id}`, options).then(response => response.data);
}
