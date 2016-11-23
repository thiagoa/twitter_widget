import jQuery from 'jquery';

function handleError(error) {
  const newError = new Error();
  newError.response = { status: error.status, data: error.responseJSON };

  throw newError;
}

export default function fetchTimeline(id) {
  return jQuery.get(`/twitter_timeline/${id}`).catch(handleError);
}
