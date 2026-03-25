export default defineNuxtPlugin((nuxtApp) => {
  const chars = '10X';

  const scrambleElement = (el, duration = 400) => {
    // Only run on client
    if (process.server) return;

    const getTextNodes = (node) => {
      let all = [];
      for (let child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType === 3) {
          if (child.nodeValue.trim() !== '') all.push(child);
        } else if (child.nodeType === 1) {
          all = all.concat(getTextNodes(child));
        }
      }
      return all;
    };

    const textNodes = getTextNodes(el);
    if (!textNodes.length) return;

    if (!el.__originalTexts) {
      el.__originalTexts = textNodes.map(n => n.nodeValue);
    }
    const originalTexts = el.__originalTexts;
    
    let iteration = 0;
    const intervalTime = 20; 
    const maxIterations = duration / intervalTime;

    if (el.__scrambleInterval) clearInterval(el.__scrambleInterval);

    el.__scrambleInterval = setInterval(() => {
      textNodes.forEach((node, index) => {
        const orig = originalTexts[index];
        let result = '';
        for(let i = 0; i < orig.length; i++) {
          if (orig[i] === ' ' || orig[i] === '\n') {
            result += orig[i];
            continue;
          }
          const charThreshold = (i / orig.length) * (maxIterations * 0.7); 
          
          if (iteration > charThreshold) {
             if (iteration > charThreshold + (maxIterations * 0.3)) {
                result += orig[i];
             } else {
                 result += Math.random() > 0.5 ? orig[i] : chars[Math.floor(Math.random() * chars.length)];
             }
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        node.nodeValue = result;
      });

      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(el.__scrambleInterval);
        textNodes.forEach((node, index) => {
          node.nodeValue = originalTexts[index];
        });
      }
    }, intervalTime);
  };

  nuxtApp.vueApp.directive('scramble', {
    getSSRProps(_binding, _vnode) {
      // Return empty props for SSR to prevent 'getSSRProps' error
      return {};
    },
    mounted(el) {
      // Only attach event listener on client
      el.addEventListener('mouseenter', () => {
        scrambleElement(el, 400); 
      });
    }
  });
});
