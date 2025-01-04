import { fetchData } from '../utils/fetchData';
import { API_URL } from '../config/env';

export const getUpcomingEvent = async () => {
  const result = await fetchData({
    url: `${API_URL}/event/getUpcomingEvent`,
    method: 'POST',
  });
  return result;
};

export const goToUpcomingEvent = async () => {
  const result = await getUpcomingEvent();
  const { success, event } = result;
  if (success) {
    const { link } = event;
    window.location.href = link;
    return;
  }
  window.location.href = '/';
};
