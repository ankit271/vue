<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand">
                <router-link to="/" class="nav-link" active-class="active-link">Vue</router-link>         
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/home" class="nav-link" active-class="active-link">Home</router-link>         
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link" active-class="active-link">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/contact" class="nav-link" active-class="active-link">Contact</router-link>
                </li>
                <li class="nav-item dropdown">                
                    <router-link to="/product" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" 
                     aria-expanded="false" active-class="active-link">Product</router-link>                
                <ul class="dropdown-menu">
                    <router-link to="/product/create" class="dropdown-item">Create Product</router-link>
                    <router-link to="/product/listing" class="dropdown-item">Listing Products</router-link>
                </ul>
                </li>
            </ul>
                  <!-- Add User Profile Section -->
                <div class="nav-item dropdown ms-auto" v-if="user">
                    <a class="nav-link dropdown-toggle user-profile" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img :src="user.photoURL" alt="Profile" class="profile-image" v-if="user.photoURL">
                        <span class="user-name">{{ user.displayName || user.email }}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <router-link to="/profile" class="dropdown-item">
                                <i class="fas fa-user me-2"></i> Profile
                            </router-link>
                        </li>                      
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="handleLogout">
                                <i class="fas fa-sign-out-alt me-2"></i> Logout
                            </a>
                        </li>
                    </ul>
                </div>                
            </div>
        </div>
    </nav>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const user = ref(null)
const auth = getAuth()

onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
    })
})

const handleLogout = async () => {
    try {
        await signOut(auth)
        router.push('/login')
    } catch (error) {
        console.error('Error logging out:', error)
    }
}
</script>

<style scoped>
.navbar{
    background-color: #712cf9;
}

.active-link {
  font-weight: 600; 
  color: #fff;
}

.nav-item{
    gap: 50px;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
}

.profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

.user-name {
    color: white;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.dropdown-item i {
    width: 20px;
}

/* Hover effects */
.dropdown-item:hover {
    background-color: #f8f9fa;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .user-profile {
        padding: 0.5rem 0;
    }

    .profile-image {
        width: 28px;
        height: 28px;
    }

    .user-name {
        max-width: 120px;
    }
}

.navbar-collapse {
    justify-content: space-between;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 15px;
}
</style>