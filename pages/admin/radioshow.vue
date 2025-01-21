<template>
  <section class="section-radioshow">
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

    <h2>Upload Embedded Link naar Radioshow</h2>
    <h5>
      Bij het uploaden van een nieuwe show, de datum erbij vermelden. <br />
      Altijd 15 shows op datum gesorteerd
    </h5>
    <div class="form-group">
      <form @submit.prevent="submitForm">
        <label for="embeddedLink">Embedded Link:</label>
        <input
          class="form-control"
          type="text"
          id="embeddedLink"
          v-model="embeddedLink"
          required
        />

        <label for="uploadDate">Upload Datum:</label>
        <input
          class="form-control"
          type="date"
          id="uploadDate"
          v-model="uploadDate"
          required
        />

        <button class="btn btn-success" type="submit">Uploaden</button>
      </form>
      <div v-if="showSuccessMessage" class="success-message">
        Radioshow succesvol geüpload!
      </div>
    </div>

    <!-- New Form for Accurate Sessions -->
    <h2>Upload Accurate Session</h2>
    <h5>
      Voeg een accurate session toe met de bijbehorende datum.
    </h5>
    <div class="form-group">
      <form @submit.prevent="submitAccurateSessionForm">
        <label for="sessionLink">Session Link:</label>
        <input
          class="form-control"
          type="text"
          id="sessionLink"
          v-model="sessionLink"
          required
        />

        <label for="sessionDate">Session Datum:</label>
        <input
          class="form-control"
          type="date"
          id="sessionDate"
          v-model="sessionDate"
          required
        />

        <button class="btn btn-success" type="submit">Uploaden</button>
      </form>
      <div v-if="showSessionSuccessMessage" class="success-message">
        Accurate session succesvol geüpload!
      </div>
    </div>
  </section>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      embeddedLink: '',
      uploadDate: '',
      sessionLink: '',
      sessionDate: '',
      showSuccessMessage: false,
      showSessionSuccessMessage: false
    };
  },
  methods: {
    async submitForm() {
      try {
        if (!this.embeddedLink || !this.uploadDate) {
          console.error('Embedded link and upload date are required.');
          return;
        }

        const firestore = getFirestore();

        await addDoc(collection(firestore, 'radioshow'), {
          embeddedLink: this.embeddedLink,
          uploadDate: this.uploadDate,
        });

        this.embeddedLink = '';
        this.uploadDate = '';
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

      } catch (error) {
        console.error('Error uploading radioshow:', error);
      }
    },
    async submitAccurateSessionForm() {
      try {
        if (!this.sessionLink || !this.sessionDate) {
          console.error('Session link and session date are required.');
          return;
        }

        const firestore = getFirestore();

        await addDoc(collection(firestore, 'accurate-sessions'), {
          sessionLink: this.sessionLink,
          sessionDate: this.sessionDate,
        });

        this.sessionLink = '';
        this.sessionDate = '';
        this.showSessionSuccessMessage = true;

        setTimeout(() => {
          this.showSessionSuccessMessage = false;
        }, 3000);

      } catch (error) {
        console.error('Error uploading accurate session:', error);
      }
    }
  },
};

definePageMeta({
  middleware: 'auth'
});
</script>

<style scoped lang="scss">


.section-radioshow {
  padding: 0 2rem;
  height: auto;
}

.man-nav { 
  display: flex;
  margin-right: 4rem;  
}

.back {
  margin-right: 2rem;
}

h2 {
  margin-top: 4rem;
  font-size: 2rem;
}

.form-container {
  margin-top: 4rem;
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

h5 {
  font-size: 1rem;
  margin-bottom: 4rem;
}

.form-control {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid var(--primary-grey-light2);
  border-radius: 4px;
  color: var(--primary-grey-light2);
  font: bolder;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
  margin-top: 1rem;
}

.btn-success:hover {
  background-color: #218838;
}

.dz-message {
  color: var(--primary-grey-light2);
}

.success-message {
  color: green;
}
</style>
