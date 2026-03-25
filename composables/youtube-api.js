export const fetchLatestVideos = async (maxResults = 12) => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) return [];

  const queryParams = new URLSearchParams({
    part: 'snippet',
    channelId,
    maxResults,
    order: 'date',
    type: 'video',
    key: apiKey,
  });

  const url = `https://www.googleapis.com/youtube/v3/search?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.items || [];
    } else {
      console.error('Error fetching videos:', response.statusText);
    }
  } catch (error) {
    console.error('YouTube API error', error);
  }

  return [];
};