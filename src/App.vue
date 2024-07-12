<script setup lang="ts">
// import { ref, onMounted } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import { arrayBuffer } from 'stream/consumers';
interface Message {
  name: string;
  datetime: string;
  message: string;
}
const message = ref('Hello, Vue!');
const useraInput = ref<string>('');
function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}
function setCookieArray(name: string, value: any[], days: number){
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${expirationDate.toUTCString()}`;
  
  // Serialize the array into a string using JSON.stringify
  const serializedValue = JSON.stringify(value);
  
  document.cookie = `${name}=${encodeURIComponent(serializedValue)}; ${expires}; path=/`;
}
const messages: Message[] = [];

function loginRickson(){
  setCookie('User', 'Rickson', 7);
  alert('Rickson Login liao');
}
function loginAlex(){
  setCookie('User', 'Alex', 7);
  alert('Alex Login liao');
}

function getCookie(name: string): string | undefined {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return undefined;
}
const userInput = ref<string>('');
function handleSubmit() {
  const userName = getCookie('User') || 'none';;
  const message: Message = {
    name: userName, // Assuming this should be dynamic based on user or session
    datetime: new Date().toLocaleString(),
    message: useraInput.value,
  };
  messages.push(message);
  setCookieArray('message', messages, 7);
  alert(`You entered: ${userInput}`);
}
const getsCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};
const logMessagesFromCookie = () => {
  const messageCookie = getCookie('message');
  if (messageCookie) {
    const decodedCookie = decodeURIComponent(messageCookie);
    const messageShow = JSON.parse(decodedCookie);

    messageShow.forEach((message: { name: string; datetime: string; message: string }, index: number) => {
      console.log(`Message ${index + 1}:`);
      console.log(`Name: ${message.name}`);
      console.log(`Datetime: ${message.datetime}`);
      console.log(`Message: ${message.message}`);
    });
  }
};
logMessagesFromCookie();
userInput.value = '';
</script>
<template>
  <button @click="loginRickson">loginRickson</button>
  <button @click="loginAlex">loginAlex</button>
  <div class="container-fluid app-container">
    <div class="row no-gutters">
      <aside class="col-md-4 col-lg-3 bg-light sidebar">
        <div class="avatar-section text-center py-4">
          <div class="avatar mb-3">Avatar</div>
          <div class="username mb-3">Rickson</div>
          <button class="btn btn-primary">Logout</button>
        </div>
      </aside>
      <main class="col-md-8 col-lg-9 main-content d-flex flex-column">
        <div class="row no-gutters flex-grow-1">
          <section class="col-md-4 border-right chat-list-section">
            <div class="chat-list-header d-flex align-items-center py-2 px-3 border-bottom">
              <div class="chat-avatar">Avatar</div>
              <div class="ml-3">
                <div class="chat-name font-weight-bold">Alex</div>
                <div class="chat-status text-muted">Hi sir</div>
              </div>
              <div class="status-indicator ml-auto"></div>
            </div>
          </section>
          <section class="col-md-8 d-flex flex-column chat-window-section">
            <div class="chat-header d-flex justify-content-between align-items-center py-2 px-3 border-bottom">
              <h2 class="h5 mb-0">Conversation List</h2>
              <button class="btn btn-danger btn-sm">delete all messages</button>
            </div>
            <div class="chat-messages flex-grow-1 p-3 overflow-auto">
              <div class="chat-message p-2 mb-3 bg-light rounded">
                <div class="message-text">Yo sir, this is first chat from alex</div>
              </div>
              <div class="chat-message p-2 mb-3 bg-light rounded">
                <div class="message-text">Hi sir, this is first message from Rickson</div>
              </div>
              <div class="chat-message p-2 mb-3 bg-light rounded">
                <div class="message-text">Hi sir</div>
              </div>
            </div>
            <div class="chat-input d-flex p-3 border-top">
              <input type="text" v-model="useraInput" class="form-control mr-2" placeholder="Leave your message here"/>
              <button @click="handleSubmit" class="btn btn-success">Sent</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
}

.sidebar .avatar {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}

.chat-message {
  background-color: #f1f1f1;
}

.chat-input input {
  flex: 1;
}

.chat-input button {
  padding: 10px 20px;
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;
}

.no-gutters > .col, .no-gutters > [class*="col-"] {
  padding-right: 0;
  padding-left: 0;
}
</style>