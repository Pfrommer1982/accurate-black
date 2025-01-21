<template>
  <section class="section-releaseform">
    <div v-once class="break-line top">
      <div class="break-line-text">
        <div class="man-nav">
          <div class="btn-more back">
            <NuxtLink to="/admin/releasesform" class="btn-more-link">
              <p class="btn-more-p">RELEASE TOEVOEGEN</p>
            </NuxtLink>
          </div>
          <div class="btn-more back">
            <NuxtLink to="/admin/radioshow" class="btn-more-link">
              <p class="btn-more-p">RADIOSHOW TOEVOEGEN</p>
            </NuxtLink>
          </div>
          <div class="btn-more back">
            <NuxtLink to="/admin/table" class="btn-more-link">
              <p class="btn-more-p">OVERZICHT/DELETE</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="row">
          <p>* is required</p>
          <div class="col-md-6">
            <div class="form-group">
              <label for="ACB">ACB release *</label>
              <input type="text" class="form-control" id="ACB" placeholder="ACB000" v-model="ACB" required />
            </div>
            <div class="form-group">
              <label for="artist">Artist *</label>
              <input type="text" class="form-control" id="artist" placeholder="Artist name" v-model="artist" required />
            </div>
            <div class="form-group form-control w-full max-w-xs">
              <label for="artistImage">Artist Image Greyscale *</label>
              <input type="file" id="artistImage" @change="handleArtistImageUpload" ref="artistImageInput" required />
            </div>
            <div class="form-group">
              <label>Social Links</label>
              <div v-for="(link, index) in socialLinks" :key="index">
                <input type="text" class="form-control social" v-model="socialLinks[index]" placeholder="Social Link" />
              </div>
            </div>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn-update" @click="addSocialLink" v-if="socialLinks.length < 6">
              <p class="btn-update-p">Add Social</p>
            </button>
            <button type="button" class="btn-delete" @click="removeSocialLink(index)">
              <p class="btn-delete-p">Remove Social</p>
            </button>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="releaseName">Release Name *</label>
              <input type="text" class="form-control" id="releaseName" placeholder="Release Name" v-model="releaseName" required />
            </div>
            <label>Track Name *</label>
            <div v-for="(track, index) in tracks" :key="index">
              <div class="form-group">
                <input type="text" class="form-control" :id="'trackName' + index" v-model="track.trackName" placeholder="Track Name" />
              </div>
            </div>
            <div class="action-buttons">
              <button type="button" class="btn-update" @click="addTrack">
                <p class="btn-update-p">Add Track</p>
              </button>
              <button type="button" class="btn-delete" @click="removeTrack(index)">
                <p class="btn-delete-p">Remove Track</p>
              </button>
            </div>
            <label for="description">RELEASE Description:</label>
            <textarea class="form-control" id="description" placeholder="Enter description" v-model="description"></textarea>
            <div class="form-group">
              <label for="releaseTrailer">Release Trailer Video Link:</label>
              <input type="text" class="form-control" id="releaseTrailer" placeholder="Enter release trailer video link" v-model="releaseTrailer" />
            </div>
            <div class="form-group">
              <label for="soundcloudUrl">spotify embedded dark grey compact *</label>
              <input type="text" class="form-control" id="soundcloudUrl" placeholder="Hier plaats je de volledige embedded iframe code van spotify ( ziet er zo uit <iframe>heel veel data</iframe>)" v-model="soundcloudUrl" />
            </div>
            <div class="form-group">
              <label for="digDisLink">dig dis smrtlnk link</label>
              <input type="text" class="form-control" id="digDisLink" placeholder="Enter dig dis smrtlnk link" v-model="digDisLink" />
            </div>
            <div class="form-group form-control w-full max-w-xs">
              <label for="image">Image Upload *</label>
              <input type="file" id="image" @change="handleImageUpload" ref="imageInput" required />
              <div class="dropzone" id="imageDropzone">
                <div class="dz-message" data-dz-message></div>
              </div>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <button type="submit" class="btn-update send">
            <p class="btn-update-p">Submit Data</p>
          </button>
          <button type="button" class="btn-delete" @click="clearForm">
            <p class="btn-delete-p">Clear Form</p>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
  data() {
    return {
      ACB: '',
      artist: '',
      releaseName: '',
      soundcloudUrl: '',
      imageUrl: '',
      artistImageUrl: '',
      tracks: [{ trackName: '' }],
      socialLinks: [''],
      digDisLink: '',
      bio: '',
      description: '',
      releaseTrailer: ''
    };
  },
  methods: {
    async submitForm() {
      console.log('Form submit triggered');
      if (confirm('Weet je zeker dat je het formulier wilt verzenden?')) {
        try {
          await this.uploadImagesToStorage();
          await this.addUserToFirestore();
          this.showSuccessMessage();
          this.clearForm();
        } catch (error) {
          console.error('Fout bij het verzenden van het formulier:', error);
        }
      }
    },

    addSocialLink() {
      this.socialLinks.push('');
    },
    removeSocialLink(index) {
      this.socialLinks.splice(index, 1);
    },

    addTrack() {
      this.tracks.push({ trackName: '' });
    },
    removeTrack(index) {
      this.tracks.splice(index, 1);
    },

    async uploadImagesToStorage() {
      try {
        const storage = getStorage();

        if (this.artistImage) {
          const artistImagePath = `artists/${Date.now()}_${this.artistImage.name}`;
          const artistImageRef = storageRef(storage, artistImagePath);
          await uploadBytes(artistImageRef, this.artistImage);
          this.artistImageUrl = await getDownloadURL(artistImageRef);
        }

        if (this.image) {
          const releaseImagePath = `releases/${Date.now()}_${this.image.name}`;
          const releaseImageRef = storageRef(storage, releaseImagePath);
          await uploadBytes(releaseImageRef, this.image);
          this.imageUrl = await getDownloadURL(releaseImageRef);
        }
      } catch (error) {
        console.error('Error uploading images to storage: ', error);
        throw error;
      }
    },

    async addUserToFirestore() {
      try {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, 'users'), {
          ACB: this.ACB,
          artist: this.artist,
          releaseName: this.releaseName,
          soundcloudUrl: this.soundcloudUrl,
          imageUrl: this.imageUrl,
          artistImageUrl: this.artistImageUrl,
          tracks: this.tracks,
          socialLinks: this.socialLinks,
          digDisLink: this.digDisLink,
          bio: this.bio,
          description: this.description,
          releaseTrailer: this.releaseTrailer
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
        throw error;
      }
    },

    clearForm() {
      this.ACB = '';
      this.artist = '';
      this.releaseName = '';
      this.soundcloudUrl = '';
      this.imageUrl = '';
      this.artistImageUrl = '';
      this.tracks = [{ trackName: '' }];
      this.socialLinks = [''];
      this.digDisLink = '';
      this.bio = '';
      this.description = '';
      this.releaseTrailer = '';

      // Reset file inputs
      this.$refs.artistImageInput.value = '';
      this.$refs.imageInput.value = '';
    },

    handleImageUpload(event) {
      this.image = event.target.files[0];
    },

    handleArtistImageUpload(event) {
      this.artistImage = event.target.files[0];
    },

    showSuccessMessage() {
      alert('Formulier succesvol verzonden!');
    }
  }
};

definePageMeta({
  middleware: 'auth'
});
</script>

<style scoped lang="scss">

.section-releaseform {
  padding: 0 2rem;
  margin-bottom: 10rem;
}

.man-nav {
  display: flex;
  margin-right: 4rem;
  position: relative;
}

.back {
  margin-right: 2rem;
}

.form-container {
  position: relative;
  width: 100%;
  margin-top: 5rem;
}

.styled-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.social {
  margin-top: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--primary-grey-light1);
}

.form-control {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid var(--primary-grey-light2);
  border-radius: 4px;
  color: white;
  font: bolder;
}

.action-buttons {
  display: flex;
}

#artistImage,
#image {
  color: var(--primary-grey-light2);
}
</style>
