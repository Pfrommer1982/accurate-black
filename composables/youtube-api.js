async function fetchLatestVideo() {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
  
    const queryParams = new URLSearchParams({
      part: 'snippet',
      channelId,
      maxResults: 1,
      order: 'date',
      type: 'video',
      key: apiKey,
    });
  
    const url = `https://www.googleapis.com/youtube/v3/search?${queryParams.toString()}`;
  
    const response = await fetch(url);
  
    if (response.ok) {
      const data = await response.json();
      const items = data.items;
      if (items.length > 0) {
        return items[0].id.videoId;
      }
    } else {
      console.error('Error fetching video:', response.statusText);
    }
  
    return null;
  }
  
  export default fetchLatestVideo;
  