// server/api/soundcloud.ts
import { xml2js } from 'xml-js';

export default defineEventHandler(async () => {
  // Verschillende URL formats om te proberen
  const urlsToTry = [
    'https://feeds.soundcloud.com/users/soundcloud:users:198991864/sounds.rss',
    'https://soundcloud.com/accuratemusic/tracks.rss',
    'https://feeds.soundcloud.com/users/accuratemusic/sounds.rss',
    'https://soundcloud.com/accuratemusic.rss',
    'https://feeds.soundcloud.com/users/soundcloud:users:accuratemusic/sounds.rss'
  ];

  for (const url of urlsToTry) {
    try {
      console.log(`🎧 Trying URL: ${url}`);
      
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      console.log(`🎧 Response status for ${url}: ${res.status}`);
      
      if (!res.ok) {
        console.log(`❌ Failed with status ${res.status}, trying next URL...`);
        continue;
      }

      const xml = await res.text();
      console.log('🎧 Raw XML length:', xml.length);
      console.log('🎧 First 500 characters of XML:', xml.substring(0, 500));
      
      if (!xml || xml.length < 100) {
        console.log('❌ RSS response is empty or too short, trying next URL...');
        continue;
      }

      const parsed = xml2js(xml, { compact: true }) as any;
      console.log('🎧 Parsed RSS structure:', Object.keys(parsed));

      // Check verschillende mogelijke structuren
      let items = null;
      
      if (parsed.rss?.channel?.item) {
        items = parsed.rss.channel.item;
      } else if (parsed.feed?.entry) {
        items = parsed.feed.entry;
      } else {
        console.log('🎧 Full parsed structure:', JSON.stringify(parsed, null, 2));
        console.log('❌ RSS structure not recognized, trying next URL...');
        continue;
      }

      console.log('🎧 Items found:', Array.isArray(items) ? items.length : 'single item');

      // Zorg ervoor dat items altijd een array is
      if (!Array.isArray(items)) {
        items = [items];
      }

      return {
        count: items.length,
        source: url,
        items: items
          .filter((item: any) => {
            const title = item.title?._text || item.title || '';
            return title.toLowerCase().includes('techtonic');
          })
          .slice(0, 10)
          .map((item: any) => {
          const link = item.link?._text || item.link || '';
          
          // Converteer SoundCloud URL naar embed URL
          const embedLink = link.replace('https://soundcloud.com/', 'https://w.soundcloud.com/player/?url=https://soundcloud.com/');
          
          return {
            title: item.title?._text || item.title || '',
            link: link,
            pubDate: item.pubDate?._text || item.pubDate || item.published?._text || item.published || '',
            embedLink: embedLink,
            // Maak ook een complete iframe embed string
            embedHtml: `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" loading="lazy" src="${embedLink}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`
          };
        }),
      };
    } catch (err: any) {
      console.error(`❌ Error with URL ${url}:`, err.message);
      continue;
    }
  }

  // Als alle URLs falen
  return { 
    error: 'Alle RSS URLs gefaald',
    details: 'Geen werkende RSS feed gevonden',
    timestamp: new Date().toISOString(),
    triedUrls: urlsToTry
  };
});