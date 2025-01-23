import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'

// app.component('AlertMessage', AlertMessage);
// app.component('FormGroup', FormGroup);
const firebaseConfig = {
  apiKey: "AIzaSyBkwXGyH_lEx1gf29ncnAAVSuphCPjkSvA",
  authDomain: "vue-manager-b9a92.firebaseapp.com",
  projectId: "vue-manager-b9a92",
  storageBucket: "vue-manager-b9a92.firebasestorage.app",
  messagingSenderId: "804707759385",
  appId: "1:804707759385:web:6750450a76292387278188"
};
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
