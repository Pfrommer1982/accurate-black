<script>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, query, orderBy, doc } from 'firebase/firestore';

export default {
    middleware: 'auth',
    setup() {
        const users = ref([]);
        const isOpen = ref([]);
        const editedUser = ref({});
        const searchQuery = ref('');
        const openIndex = ref(null); 

        const fetchUsers = async () => {
            try {
                const db = getFirestore();
                const usersCollection = collection(db, 'users');
                const q = query(usersCollection, orderBy('ACB'));
                const querySnapshot = await getDocs(q);
                const fetchedUsers = [];
                querySnapshot.forEach(doc => {
                    fetchedUsers.push({ ...doc.data(), id: doc.id });
                });
                users.value = fetchedUsers;
                isOpen.value = new Array(fetchedUsers.length).fill(false); 
            } catch (error) {
                console.error('Error getting users: ', error);
            }
        };

        const toggleRow = (index) => {
            const userIndex = users.value.findIndex(user => user.id === filteredUsers.value[index].id); 
            if (isOpen.value[userIndex]) {
                isOpen.value[userIndex] = false;
                openIndex.value = null;
            } else {
                isOpen.value.fill(false);
                isOpen.value[userIndex] = true;
                openIndex.value = userIndex;
                editedUser.value = { ...users.value[userIndex] };
            }
        };

        const updateUser = async (index) => {
            const userIndex = users.value.findIndex(user => user.id === filteredUsers.value[index].id);
            try {
                const db = getFirestore();
                const userDocRef = doc(db, 'users', users.value[userIndex].id);
                await updateDoc(userDocRef, editedUser.value);
                console.log('Release succesvol bijgewerkt');
                isOpen.value[userIndex] = false;
                showAlert('Release succesvol bijgewerkt');
            } catch (error) {
                console.error('Error updating user: ', error);
            }
        };

        const showAlert = (message) => {
            alert(message);
        };

        const deleteUser = async (index) => {
            const userIndex = users.value.findIndex(user => user.id === filteredUsers.value[index].id);
            try {
                const confirmation = confirm('Weet je zeker dat je deze release wilt verwijderen?');
                if (confirmation) {
                    const db = getFirestore();
                    const userDocRef = doc(db, 'users', users.value[userIndex].id);
                    await deleteDoc(userDocRef);

                    users.value.splice(userIndex, 1);
                    isOpen.value.splice(userIndex, 1);
                }
            } catch (error) {
                console.error('Error removing user: ', error);
            }
        };

        onMounted(fetchUsers);

        const filteredUsers = computed(() => {
            return users.value.filter(user => 
                user.artist.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        });

        return { users, isOpen, editedUser, searchQuery, filteredUsers, toggleRow, updateUser, deleteUser, openIndex };
    },
    computed: {
        sortedUsers() {
            return this.filteredUsers.sort((a, b) => {
                if (a.ACB === 'ACB001') return 1;
                return b.ACB.localeCompare(a.ACB);
            });
        }
    }
};


</script>

<template>
    <section class="section-overzicht">

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

        <div class=" search-filter">
            <p class="find"> &#128269; </p>
            <input v-model="searchQuery" type="text" placeholder="Filter op artiest..." />
        </div>

        <div class="accordion">
            <h2>Releases Overzicht, hier kun je de release verwijderen of updaten</h2>
            <template v-for="(user, index) in sortedUsers" :key="user.id">
                <div class="accordion-item">

                    <div class="accordion-header" @click="toggleRow(index)">
                        <span>{{ user.ACB }} - {{ user.artist }}</span>
                        <button class="btn-more accordion-toggle-btn">
                            <p class="btn-more-p">{{ isOpen[users.findIndex(u => u.id === user.id)] ? 'Sluiten' : 'Openen' }}</p>
                        </button>
                    </div>

                    <div class="accordion-content" :class="{ 'show': isOpen[users.findIndex(u => u.id === user.id)] }">

                        <div class="section-general">
                            <div class="acb">
                                <label>ACB:</label>
                                <input v-model="editedUser.ACB">

                                <label>Artiest:</label>
                                <input v-model="editedUser.artist">

                                <label>bio:</label>
                                <input v-model="editedUser.bio">
                            </div>
                        </div>

                        <div class="section-release">
                            <div class="release">
                                <label>Release name:</label>
                                <input v-model="editedUser.releaseName">
                                <label>Release tracks:</label>
                                <div v-for="(track, trackIndex) in editedUser.tracks" :key="trackIndex">
                                    <input v-model="editedUser.tracks[trackIndex].trackName">
                                </div>
                                <label>Release Trailer Link:</label>
                                <input v-model="editedUser.releaseTrailer" /> 
                                <label>Release Description:</label>
                                <textarea v-model="editedUser.description" />
                            </div>
                        </div>

                        <div class="section-media-links">
                            <div class="links">
                                <label>digDisLink:</label>
                                <input v-model="editedUser.digDisLink">

                                <label>Social Links:</label>
                                <div v-for="(link, linkIndex) in editedUser.socialLinks" :key="linkIndex">
                                    <div>
                                        <input v-model="editedUser.socialLinks[linkIndex]">
                                    </div>
                                </div>
                                <button @click="addSocialLink">Extra link toevoegen</button>
                            </div>
                        </div>

                        <div class="images">
                            <label>Artiest-image:</label>
                            <input v-model="editedUser.artistImageUrl">
                            <NuxtImg :src="editedUser.artistImageUrl" class="artist-image" />
                        </div>
                        <div class="images">
                            <label>Release-image:</label>
                            <input v-model="editedUser.imageUrl">
                            <NuxtImg :src="editedUser.imageUrl" class="artist-image" />
                        </div>

                        <div class="section-action-buttons">
                            <div class="btn-update">
                                <button class="btn-update-p " @click="updateUser(index)">Bijwerken</button>
                            </div>
                            <div class="btn-delete">
                                <button class="btn-delete-p " @click="deleteUser(index)">Verwijderen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>



<style lang="scss" scoped>


.section-overzicht {
    padding: 0 2rem;
    color: var(--primary-grey-light2);
}

h2 {
    color: var(--primary-grey-light1)
}

.section-general,
.release,
.links,
.images {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;

}

.man-nav {
    display: flex;
    margin-right: 4rem;
}

.back {
    margin-right: 2rem;
}

.acb {
    display: flex;
    flex-direction: column;
}



.section-action-buttons {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
}

.btn-update,
.btn-delete {
    margin-bottom: 10px;

}



.accordion {
    width: 100%;
    margin-top: 10rem;
}

.accordion-item {

    margin-bottom: 10px;
    border-radius: 5px;

}

.accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid var(--primary-grey-light1);
}

.accordion-content {
    position: relative;
    padding: 10px;
    display: none;
    background-color: rgba(39, 39, 39, 0.384);
    margin: 4rem 0;
    padding: 2rem 1rem;
    color: var(--primary-grey-light1);
    border: 1px solid var(--primary-grey-light1);


}

.accordion-content.show {
    display: flex;
    height: 30rem;
    @include respond(phone){
        flex-direction: column;
        height: auto;
    }
}

.action-buttons {
    display: flex;
    flex-direction: column;
}

.artist-image {
    width: 100px;
}

label {
    margin-bottom: 6px;
}

input {
    border: 1px solid var(--primary-grey-light2);
    margin-right: .5rem;
    margin-bottom: 1rem;
    width: 12rem;
}

.find {
    padding: 0 1rem;
    margin-top: 1rem;
    transform: scale(2);
}

.search-filter {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
}

.search-filter input {
    padding: 0.5rem;
    border: 1px solid var(--primary-grey-light1);
    border-radius: 4px;
    width: 200px;
    font-size: 1rem;
}

</style>