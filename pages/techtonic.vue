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
    useHead({
      title: 'TECHTONIC BY ROBBI ALTIDORE'
    });
  },
  methods: {
    async fetchRadioshows() {
      try {
        const db = getFirestore(firebaseApp);
        const radioshowCollection = collection(db, 'radioshow');
        const q = query(radioshowCollection, orderBy('uploadDate', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);

        let radioshowList = [];
        querySnapshot.forEach((doc) => {
          radioshowList.push({ ...doc.data(), id: doc.id });
        });

        this.radioshowList = radioshowList;

         const allDocsSnapshot = await getDocs(query(radioshowCollection, orderBy('uploadDate', 'desc')));
        const allDocs = [];
        allDocsSnapshot.forEach((doc) => {
          allDocs.push({ ...doc.data(), id: doc.id });
        });

 
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
      <p class="break-line-text">TECHTONIC BY ROBBI ALTIDORE</p>
    </div>
    <h4>ACCURATE BLACK PRESENTS : </h4>
    <div class="header">
        <h1 class="h1 inprogress">ROBBI ALTIDORE - TECHTONIC <a class="" href="https://inprogressradio.com/index.php/members/robbi-altidore/" target="_blank">@INPROGRESSRADIO.COM</a></h1>
    </div>
    <ul>
      <li v-for="radioshow in radioshowList" :key="radioshow.id">
        <div class="sc-embed" v-html="radioshow.embeddedLink"></div>
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

h4{
    margin-top: 2rem;
    font-size: 2rem;
    @include respond(phone){
      font-size: 1.6rem;
    }
}
 
.headers {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  color: var(--primary-grey-light1);
}
</style>
