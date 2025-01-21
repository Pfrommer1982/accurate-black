<template>
  <section class="section-demo-submit">
    <!-- Overlay voor gesloten demo-inzendingen -->
    <div v-if="submissionsClosed" class="overlay">
      <div class="closed-message">
        <h1>Demo Submission Closed </h1>
        <p>We are currently not accepting new demo submissions. Please check back later!</p>
      </div>
    </div>

    <!-- Hoofdinhoud als demo-inzendingen open zijn -->
    <div v-else>
      <div v-once class="break-line top">
        <p class="break-line-text">WE LOVE TO HEAR YOUR DEMO!</p>
      </div>

      <div class="main-container">
        <div class="pitch-container">
          <h1 class="pitch-header1">DEMO SUBMISSION FORM</h1>
          <h2 class="pitch-header2">
            Are you ready to take your music to the next level? Look no further!
          </h2>
          <p class="pitch-p1">
            We may be small, but our passion is huge, and we're on the hunt for fresh talent to join our label. 
          </p>
          <p class="pitch-p1">
            Every submission gets a fair listen, and we promise to provide valuable feedback to help you grow as an artist.
          </p>
          <p class="pitch-p1">
            We'll take care of everything from mastering to artwork to distribution on major platforms.
          </p>
          <p class="pitch-p1">
            Plus, you'll get a spot on our artist page to showcase your work to the world. So, what are you waiting for?
          </p>
        </div>

        <div class="form-container">
          <form ref="form" class="demo-submit-form" @submit.prevent="sendEmail">
            <div class="form-group">
              <label label="name">NAME</label>
              <input type="text" name="user_name" v-model="formData.user_name" required />
            </div>

            <div class="form-group">
              <label label="artist-ame">ARTIST NAME</label>
              <input type="text" name="user_artistName" v-model="formData.user_artistName" required />
            </div>

            <div class="form-group">
              <label label="email">EMAIL</label>
              <input type="email" name="user_email" v-model="formData.user_email" required />
            </div>

            <div class="form-group">
              <label label="link">LINK TO DEMO (Please note that we only accept links to your music.)</label>
              <input type="text" name="user_linkToDemo" v-model="formData.user_linkToDemo" required />
            </div>

            <div class="form-group">
              <label label="about">TELL US SOMETHING ABOUT YOURSELF </label>
              <textarea name="message" v-model="formData.message" required></textarea>
            </div>

            <button type="submit" class="btn-more">
              <p class="btn-more-p">SUBMIT</p>
            </button>
          </form>
        </div>
      </div>
    </div>

    <div v-if="successMessage" class="overlay">
      <div class="success-message">
        <div class="close-btn" @click="closeSuccessMessage">X</div>
        <div class="success-icon">✓</div>
        <div class="message">{{ successMessage }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  data() {
    return {
      formData: {
        user_name: '',
        user_artistName: '',
        user_email: '',
        user_linkToDemo: '',
        message: '',
      },
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicId: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      successMessage: '',
      submissionsClosed: true, // Demo's zijn gesloten
    };
  },
  methods: {
    sendEmail() {
      emailjs
        .sendForm(this.serviceId, this.templateId, this.$refs.form, {
          user_name: this.formData.user_name,
          user_artistName: this.formData.user_artistName,
          user_email: this.formData.user_email,
          user_linkToDemo: this.formData.user_linkToDemo,
          message: this.formData.message,
          publicKey: this.publicId,
        })
        .then(
          () => {
            this.successMessage = 'Thank you! Check your email!';
            this.clearForm();
          },
          (error) => {
            console.log('FAILED...', error.text);
          }
        );
    },
    clearForm() {
      Object.keys(this.formData).forEach((key) => {
        this.formData[key] = '';
      });
    },
    closeSuccessMessage() {
      this.successMessage = '';
    }
  }
};
</script>

<style scoped lang="scss">
.section-demo-submit {
  padding: 0 2rem;
  width: 100%;
  overflow: hidden;

  animation-name: fadeInOpacity;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url('/img/demo-submit3.webp');
    background-position: center;
    background-size: cover;
    filter: blur(8px);
    opacity: 0.5;
    z-index: -1;
  }
}

.main-container {
  display: flex;
  height: auto;
  max-width: 80rem;
  margin: 6rem auto;
  border-radius: 3px;
  overflow: hidden;
  background-color: #ffffff31;
}

.pitch-container {
  flex: 1;
  width: 100%;
  padding: 2rem;
  margin: 2rem auto;
  color: white;
  text-align: center;
}

.form-container {
  flex: 1;
  max-width: 50%;
  margin: 0 auto;
  color: var(--primary-grey-light1);
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

input[type="text"],
input[type="email"],
input[type="url"],
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--primary-grey-light1);
  border-radius: 4px;
  background-color: #1d1d1d86;
  color: white;
}

textarea {
  height: 150px;
}

.btn-more {
  appearance: none;
}

.btn-more-p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 2rem;
  text-decoration: none;
  color: var(--primary-grey);
  border-radius: 1px;
  background-image: linear-gradient(120deg, transparent 0%, transparent 50%, var(--primary-grey-dark) 50%);
  background-size: 220%;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-position: 100%;
    color: white;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}

.closed-message {
  background-color: var(--primary-grey-light2);
  color: white;
  padding: 2rem;
  border-radius: 5px;
  text-align: center;
  margin: 0 2rem;
}

.closed-message h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  @include respond(phone){
    font-size: 1.5rem;
  }
}

.closed-message p {
  font-size: 1.2rem;
  @include respond(phone){
    font-size: 1rem;
  }
}

.success-message {
  position: relative;
  background-color: #28a745;
  color: white;
  padding: 4rem 3rem;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close-btn {
  cursor: pointer;
  border: 1px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.7rem;
}
</style>
