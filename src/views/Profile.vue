<template>
    <div class="profile-container">
        <div class="profile-card">
            <div class="profile-header">
                <img :src="user?.photoURL" alt="Profile" class="profile-avatar" v-if="user?.photoURL">
                <div class="profile-info">
                    <h2>{{ user?.displayName || 'User' }}</h2>
                    <p>{{ user?.email }}</p>
                </div>
            </div>
            <div class="profile-details">
                <div class="detail-item">
                    <strong>Email verified:</strong> 
                    <span :class="user?.emailVerified ? 'text-success' : 'text-warning'">
                        {{ user?.emailVerified ? 'Yes' : 'No' }}
                    </span>
                </div>
                <div class="detail-item">
                    <strong>Account created:</strong> 
                    <span>{{ formatDate(user?.metadata?.creationTime) }}</span>
                </div>
                <div class="detail-item">
                    <strong>Last sign in:</strong> 
                    <span>{{ formatDate(user?.metadata?.lastSignInTime) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const user = ref(null)

onMounted(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
    })
})

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>

<style scoped>
.profile-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.profile-card {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #712cf9;
}

.profile-info h2 {
    margin: 0;
    color: #333;
}

.profile-info p {
    margin: 0.5rem 0;
    color: #666;
}

.profile-details {
    border-top: 1px solid #eee;
    padding-top: 1rem;
}

.detail-item {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text-success {
    color: #198754;
}

.text-warning {
    color: #ffc107;
}

@media (max-width: 768px) {
    .profile-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }

    .detail-item {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
    }
}
</style>
