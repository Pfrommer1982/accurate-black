<script>
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'


export default {
    data() {
        return {
            artist: '',
            bio: '',
            imageUrl: '',
            artistImageUrl: '',
            socialLinks: [],
            imageUrls: [],
            acbIdentifiers: [],
            soundcloudUrls: {},
            lastThreeSoundcloudUrls: [],
            currentSoundcloudUrl: '',
            showFullBio: false,
        }
    },

    async created() {
        try {
            const artistName = this.$route.params.artist;
            const db = getFirestore();
            const q = query(collection(db, 'users'), where('artist', '==', artistName));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const reversedDocs = querySnapshot.docs.reverse();
                reversedDocs.forEach(doc => {
                    const data = doc.data();
                    this.artist = data.artist;
                    this.bio = data.bio;
                    this.socialLinks = data.socialLinks || [];
                    this.artistImageUrl = data.artistImageUrl;
                    this.acbIdentifiers.push(data.ACB);
                    this.imageUrls.push(data.imageUrl);
                    this.soundcloudUrls[data.ACB] = data.soundcloudUrl;
                });

                this.acbIdentifiers.sort((a, b) => b - a);

                this.lastThreeSoundcloudUrls = this.acbIdentifiers.map(acb => this.soundcloudUrls[acb]).slice(0, 3);

                if (this.imageUrls.length > 0) {
                    this.imageUrl = this.imageUrls[0];
                    const acbIdentifier = this.acbIdentifiers[0];
                    this.currentSoundcloudUrl = this.soundcloudUrls[acbIdentifier];

                 
                    
                }
            } else {
                console.error('Artist not found');
            }
        } catch (error) {
            console.error('Error fetching artist:', error);
        }
    },
    methods: {
        getSocialLink(platform) {
            const link = this.socialLinks.find((link) => link.includes(platform));
            return link ? link : '#';
        },
        changeHeaderImage(imageUrl, index) {
            this.imageUrl = imageUrl;
            const acbIdentifier = this.acbIdentifiers[index];
            this.currentSoundcloudUrl = this.soundcloudUrls[acbIdentifier];
        },
        changeSoundcloudUrl(index) {
            this.currentSoundcloudUrl = this.lastThreeSoundcloudUrls[index];
        },
        toggleBio() {
            this.showFullBio = !this.showFullBio;
        }
    },
}
</script>

<template>

    <section class="section-artist-profile">
        <div class="break-line top">
            <p class="break-line-text">{{ artist }}</p>
        </div>
        <div class="header-container">
            <NuxtImg :src="imageUrl" alt="" class="header-image" loading="lazy" width="1500" height="1500"/>
        </div>
    </section>

    <section class="body-top">
        <div class="left">
            <NuxtImg :src="artistImageUrl" :alt="artist" class="body-image" loading="lazy" width="200" height="200"/>
            <h3 class="biography">BIOGRAPHY</h3>
            <p class="bio" v-if="bio">{{ bio }}</p>
            <p v-else class="bio no">No biography yet...</p>
        </div>

        <div class="right">
            <h3 class="follow">FOLLOW {{ artist }} ON:</h3>
            <div class="socials">
                <a v-for="(link, index) in socialLinks" :key="index" :href="link" target="_blank" aria-label='social'>
                    <div class="icon-bg" v-if="link.includes('spotify')">
                        <Icon name="simple-icons:spotify" class="btn-socials" loading="lazy" />
                    </div>
                    <div class="icon-bg" v-if="link.includes('soundcloud')">
                        <Icon name="simple-icons:soundcloud" class="btn-socials" />
                    </div>
                    <div class="icon-bg" v-if="link.includes('youtube')">
                        <Icon name="simple-icons:youtube" class="btn-socials" />
                    </div>
                    <div class="icon-bg" v-if="link.includes('facebook')">
                        <Icon name="simple-icons:facebook" class="btn-socials" />
                    </div>
                    <div class="icon-bg" v-if="link.includes('instagram')">
                        <Icon name="simple-icons:instagram" class="btn-socials" />
                    </div>
                    <div class="icon-bg" v-if="link.includes('tiktok')">
                        <Icon name="simple-icons:tiktok" class="btn-socials" />
                    </div>
                    <div class="icon-bg" v-if="link.includes('twitter')">
                        <Icon name="simple-icons:twitter" class="btn-socials" />
                    </div>
                </a>
            </div>

            <div class="soundcloud-list">
                <div v-for="(url, index) in lastThreeSoundcloudUrls" :key="index" @click="changeSoundcloudUrl(index)"
                    role="button" tabindex="0" :aria-label="'Play soundcloud track ' + (index + 1)">
                    <div class="soundcloud-item" v-html="url"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="body-bottom">
        <div class="card">
            <span class="card-heading">ALL {{ artist }} RELEASES </span>
            <div class="card-list">
                <div v-for="(image, index) in imageUrls" :key="index">
                    <NuxtImg :src="image" alt="" class="card-list-item" @click="changeHeaderImage(image, index)"
                        :aria-label="'Change header image to release ' + (index + 1)" loading="lazy" width="200" height="200"/>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">


.section-artist-profile {
    padding: 0 2rem;
    overflow: hidden;

    @include respond(phone) {
        padding: 0 1rem;
    }
}

.header-container {
    display: flex;

    @include respond(tab-port) {
        flex-direction: column;
    }
}

.header-image {
    position: absolute;
    display: flex;
    margin: 0 auto;
    top: 0;
    left: 0;
    max-height: 100vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    z-index: -1;

    -webkit-animation: zoomEffect 35s infinite;
    animation: zoomEffect 35s infinite;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    @include respond(phone) {
        height: 100%;
        -webkit-animation: none;
        animation: none;
    }
}

@-webkit-keyframes zoomEffect {
    0% {
        -webkit-transform: scale(1) translateX(0);
        transform: scale(1) translateX(0);
    }

    100% {
        -webkit-transform: scale(1.2) translateX(-360px) translateY(-80px);
        transform: scale(1.2) translateX(-360px) translateY(-80px);
    }
}

@keyframes zoomEffect {
    0% {
        -webkit-transform: scale(1) translateX(0) translateY(0);
        transform: scale(1) translateX(0) translateY(0);
    }

    100% {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
}

.body-top {
    display: flex;
    margin-top: 10rem;
    justify-content: center;
    align-items: center;



    @include respond(tab-port) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @include respond(phone) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
    }

    .right,
    .left {
        flex: 1;
        background-color: #ffffffcd;
        margin: 2rem;
        padding: 1rem;
        max-width: 32rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 3px;

        @include respond(tab-land) {
            width: 100%;
            margin: 0rem 0;
        }

        @include respond(tab-port) {
            width: 100%;
            margin: 0rem 0;
        }

        @include respond(phone) {
            width: 100%;
        }

        .body-image {
            width: 30rem;
            height: 30rem;
            box-shadow: 5px 10px 75px rgba(0, 0, 0, .4);
            border: 14px solid white;
            transform: translateY(-10rem);

            @include respond(phone) {
                width: 16rem;
                height: 16rem;
                border: 7px solid white;
            }
        }

        .biography {
            color: var(--primary-grey-dark);
            font-size: 2rem;
            letter-spacing: 2rem;
            text-align: center;
            transform: translateY(-8rem);
            padding-left: 1.5rem;

            @include respond(tab-land) {
                padding-left: 1rem;
            }

            @include respond(phone) {
                font-size: 1.5rem;
                letter-spacing: 1.5rem;
                transform: translateY(-8rem);
            }
        }

        .bio {
            color: black;
            padding: 0 3rem;
            transform: translateY(-6rem);

            @include respond(phone) {
                padding: 0 .5rem;
                transform: translateY(-6rem);
            }
        }
    }

    .no {
        color: var(--primary-grey-light1);
        font-style: italic;
    }

    .follow {
        color: var(--primary-grey-dark);
        font-size: 2rem;
        margin-bottom: 1rem;
        width: 100%;
        text-align: center;

        @include respond(phone) {
            font-size: 1.5rem;
            border-top: 1px solid var(--primary-grey-dark);
            padding-top: 1rem;
        }
    }

    .socials {
        display: flex;
        width: 100%;
        justify-content: space-around;

        @include respond(phone) {
            padding: 0 1.5rem;
        }
    }

    .icon-bg {
        background-color: var(--primary-grey-dark);
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
            }
        }
    }

    .btn-socials {
        width: 24px;
        height: 24px;
        display: inline-block;

        color: white;
        transition: color 0.3s;
    }

    .embedded,
    .soundcloud-list {
        width: 100%;
        padding: 1rem;

        @include respond(phone) {
            padding: 0.5rem;
        }
    }

    .soundcloud-item {
        padding: 1rem 0;
    }
}

.body-bottom {
    width: 100%;
    background-color: #0000009f;

    .card-heading {
        font-size: 2rem;
        color: white;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: start;

        padding: 2rem 2rem 0rem 2rem;
        width: 100%;

        @include respond(phone) {
            border-top: 1px solid var(--primary-grey-dark);
            padding-top: 1rem;
        }
    }

    .card-list {
        width: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        grid-gap: 2rem;
        padding: 2rem;

        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));

        @include respond(tab-land) {
            grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        }

        @include respond(tab-port) {
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 1rem;
        }

        @include respond(phone) {
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 1rem;
        }
    }

    .card-list-item {
        width: 100%;
        height: auto;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.392);
        cursor: pointer;

        &:hover {
            transform: translateY(-5px);
            transition: all 0.3s ease-in-out;
        }
    }
}
</style>