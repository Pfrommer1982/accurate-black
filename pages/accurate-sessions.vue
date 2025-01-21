<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, deleteDoc, limit, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export default {
  async created() {
    await this.fetchRadioshows();
  },
  methods: {
  async fetchRadioshows() {
    try {
      // Verbind de juiste Firebase app met Firestore
      const db = getFirestore(firebaseApp);
      const radioshowCollection = collection(db, 'accurate-sessions');
      const q = query(radioshowCollection, orderBy('sessionDate', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);

      let radioshowList = [];
      querySnapshot.forEach((doc) => {
        radioshowList.push({ ...doc.data(), id: doc.id });
      });

      this.radioshowList = radioshowList;

      // Fetch all documents to check if there are more than 15
      const allDocsSnapshot = await getDocs(query(radioshowCollection, orderBy('sessionDate', 'desc')));
      const allDocs = [];
      allDocsSnapshot.forEach((doc) => {
        allDocs.push({ ...doc.data(), id: doc.id });
      });

      // Delete documents older than the 15 most recent
      if (allDocs.length > 15) {
        const docsToDelete = allDocs.slice(15);
        for (const docToDelete of docsToDelete) {
          await deleteDoc(doc(radioshowCollection, docToDelete.id));
        }
      }

    } catch (error) {
      console.error('Error fetching radioshow list: ', error);
    }
  },
},

  data() {
    return {
      radioshowList: []
    };
  }
};
</script>

<template>
  <section class="section-radioshow">
    <div v-once class="break-line top">
      <p class="break-line-text">ALL ACCURATE SESSIONS</p>
    </div>
    <div class="headers">
      <h1 class="h1">ACCURATE SESSIONS ARCHIVE</h1>
    </div>
    <ul>
      <li v-for="radioshow in radioshowList" :key="radioshow.id">
        <div class="sc-embed" v-html="radioshow.sessionLink"></div>
        <div v-once class="break-line top">
          <p class="break-line-text"></p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>


.section-radioshow {
  padding: 0 2rem;
  overflow: hidden;
  height: auto;
  min-height: 100vh;
  @include respond(phone) {
    padding: 0 1rem;
    overflow: hidden;
  }
}
.headers{
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;
  color: var(--primary-grey-light1)
}

.h1 {
    font-size: 2rem;
    color: white;
    justify-content: start;
    align-items: start;
    width: 100%;
    @include respond(phone){
      font-size: 1.6rem;
    }
}

.sc-embed {
  margin-top: 3rem;
}
.date {
  color: white;
}

a {
  text-decoration: none;
  color: var(--primary-grey-light2);

  &:hover {
    color: var(--primary-grey-light1);

  }
}
</style>
