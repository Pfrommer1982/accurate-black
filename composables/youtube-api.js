export const fetchLatestVideos = async (maxResults = 12) => {
  try {
    const response = await $fetch('/api/videos');
    return Array.isArray(response?.videos) ? response.videos.slice(0, maxResults) : [];
  } catch {
    return [];
  }
};
