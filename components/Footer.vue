<template>
  <Suspense>
    <footer class="footer">
      <div class="footer-content">
        <nav class="navigation">
          <ul class="nav-links">
            <li>
              <NuxtLink class="link" to="/">HOME</NuxtLink>
            </li>
            <li>
              <NuxtLink class="link" to="/releases">RELEASES</NuxtLink>
            </li>
            <li>
              <NuxtLink class="link" to="/artists">ARTISTS</NuxtLink>
            </li>
            <li>
              <NuxtLink class="link" to="/accurate-sessions">ACCURATE SESSIONS</NuxtLink>
            </li>
            <li>
              <NuxtLink class="link" to="/techtonic">TECHTONIC</NuxtLink>
            </li>
            <li>
              <NuxtLink class="link" to="/demo-submission">DEMO SUBMISSION</NuxtLink>
            </li>
            <li>
              <NuxtLink class="link" to="/about">ABOUT US</NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="icons">
          <div class="icon-wrapper">
            <a href="https://open.spotify.com/user/31dtsb4cdpslbtgu672zypx7jnxa?si=265ee0fc0f23402a" target="_blank"
              aria-label="Spotify">
              <div class="icon-bg">
                <NuxtImg src="/img/icons/spotify.svg" class="btn-socials" alt="Spotify" loading="lazy"
                width="200" height="200"/>
              </div>
            </a>
            <a href="https://soundcloud.com/accuratemusic" target="_blank" aria-label="SoundCloud">
              <div class="icon-bg">
                <NuxtImg src="/img/icons/soundcloud.svg" class="btn-socials" alt="SoundCloud" loading="lazy"
                width="200" height="200"/>
              </div>
            </a>
            <a href="https://www.youtube.com/channel/UCyl1a0TvGcYpysq3i3l9_qQ" target="_blank" aria-label="YouTube">
              <div class="icon-bg">
                <NuxtImg src="/img/icons/youtube.svg" class="btn-socials" alt="YouTube" loading="lazy"
                width="200" height="200"/>
              </div>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100063451548903" target="_blank" aria-label="Facebook">
              <div class="icon-bg">
                <NuxtImg src="/img/icons/facebook.svg" class="btn-socials" alt="Facebook" loading="lazy"
                width="200" height="200"/>
              </div>
            </a>
            <a href="https://www.instagram.com/accurate_black/" target="_blank" aria-label="Instagram">
              <div class="icon-bg">
                <NuxtImg src="/img/icons/instagram.svg" class="btn-socials" alt="Instagram" loading="lazy"
                width="200" height="200"/>
              </div>
            </a>
            <a href="https://www.tiktok.com/@accurateblack" target="_blank" aria-label="TikTok">
              <div class="icon-bg">
                <NuxtImg src="/img/icons/tiktok.svg" class="btn-socials" alt="TikTok" loading="lazy"
                width="200" height="200"/>
              </div>
            </a>
            <a href="https://twitter.com/AccurateBlack" target="_blank" aria-label="X">
              <div class="icon-bg">
                <NuxtImg src="/img/icons/x.svg" class="btn-socials" alt="X" loading="lazy"
                width="200" height="200"/>
              </div>
            </a>
            <a href="https://www.beatport.com/label/accurate-black/71241" target="_blank" aria-label="Beatport">
              <div class="icon-bg">
                <NuxtImg src="/img/icons/beatport.svg" class="btn-socials" alt="Beatport" loading="lazy"
                width="200" height="200"/>
              </div>
            </a>
          </div>
        </div>
        <div class="logo-container">
          <div class="left-section">
  
            <a href="https://www.linkedin.com/in/christoph-pfrommer/" target="_blank">
              <NuxtImg src="/img/CPWD-logo.svg" alt="Christoph Pfrommer" class="left1" loading="lazy"
              width="200" height="200" />
            </a>
          </div>
          <NuxtImg src="/img/Accurate-menu.webp" alt="accurate black" class="big-logo" loading="lazy" 
          width="1412" height="285"/>
          <LogoText class="logo-text" />
          <div class="right-section">
            <p class="right1">
              <NuxtLink to="/privacy-policy">Privacy policy</NuxtLink>
            </p>
            <p class="right">&copy; copyright {{ getCurrentYear() }}</p>
          </div>
        </div>
      </div>
    </footer>
  </Suspense>
</template>


<script>
export default {
  methods: {
    getCurrentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style lang="scss" scoped>


.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-top: 1px solid var(--primary-grey-dark-opacity);
  background-color: black;
  color: #fff;
  padding-top: 1rem;
  min-height: 20vh;
 

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .navigation {
      width: 100%;
      margin: 0 auto;

      .nav-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        padding: 0;
        list-style: none;
        color: var(--primary-grey-light1);

        @include respond(phone) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
      }

      .link {
        &:hover {
          color: white;
          transform: scale(1.1);
          transition: 0.3s all;
        }
      }
    }

    .icons {
      margin: 1rem 0;

      .icon-wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        border-top: 1px solid var(--primary-grey-dark-opacity);
        padding-top: 1rem;

        .social-icon {
          width: 24px;
          height: 24px;
          display: inline-block;
          margin: 0 1.5rem;
          cursor: pointer;

          @include respond(phone) {
            margin: 0 0.9rem;
          }

          &:hover {
            transform: scale(1.8);
            color: white;
            transition: 0.3s all;
          }
        }

        .icon-bg {
          background-color: var(--primary-grey-light2);
          border-radius: 60%;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.3s;
          

          &:hover {
            background-color: #ffffffcd;

            .btn-socials {
              color: var(--primary-grey-dark);
              filter: invert(0);
            }
          }
        }

        .btn-socials {
          width: 24px;
          height: 24px;
          display: inline-block;
              
        
        
          &:hover{
            filter: invert(0);

          }
        }
      }
    }

    .logo-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-top: 1px solid var(--primary-grey-dark-opacity);

      .left-section,
      .right-section {
        position: absolute;
        bottom: 1rem;
        display: flex;
        flex-direction: column;
        font-size: 0.875rem;
        color: var(--primary-grey-light1);
      }

      .left-section {
        left: 1rem;
        margin-bottom: 0.1rem;

        @include respond(phone) {
          transform: scale(0.8);
          margin-bottom: -0.7rem;
        }

        &:hover {
          opacity: 1;
          transform: scale(1.05);
          transition: 0.3s all;
        }

        .left1 {
          width: 4rem;
          height: 4rem;
          margin-left: 0.6rem;
          margin-bottom: -.8rem;
        }
      }

      .right-section {
        right: 1rem;

        @include respond(phone) {
          font-size: 0.7rem;
        }

        .right1, .right {
          line-height: 1;
     

          &:hover {
            color: white;
            transition: 0.3s all;
          }
        }
      }

      .big-logo {
        max-width: 30rem;
        height: 6rem;
        width: 100%;
        margin: 0 auto;

        @include respond(phone) {
          display: none;
        }
      }

      .logo-text {
        display: none;

        @include respond(phone) {
          display: flex;
        }
      }
    }
  }
}
</style>
