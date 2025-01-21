// directives/v-lazy.js
export default {
    mounted(el, binding) {
      function loadImage() {
        el.src = binding.value;
      }
  
      function handleIntersect(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(el);
          }
        });
      }
  
      function createObserver() {
        const options = {
          root: null,
          threshold: "0"
        };
  
        const observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(el);
      }
  
      if (!window['IntersectionObserver']) {
        loadImage();
      } else {
        createObserver();
      }
    }
  };
  