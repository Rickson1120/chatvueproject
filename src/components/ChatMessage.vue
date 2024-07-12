<template>
    <div>
      <h2>Conversations</h2>
      <ul>
        <li v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation)">
          {{ conversation.name }}
          <button @click.stop="deleteConversation(conversation.id)">Delete</button>
        </li>
      </ul>
      <input v-model="newConversationName" placeholder="New Conversation" @keyup.enter="addConversation" />
      <button @click="addConversation">Add</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'ConversationList',
    props: ['conversations'],
    emits: ['selectConversation', 'deleteConversation'],
    setup(props, { emit }) {
      const newConversationName = ref('');
  
      const addConversation = () => {
        if (newConversationName.value.trim()) {
          emit('selectConversation', { name: newConversationName.value.trim() });
          newConversationName.value = '';
        }
      };
  
      const selectConversation = (conversation) => {
        emit('selectConversation', conversation);
      };
  
      const deleteConversation = (id) => {
        emit('deleteConversation', id);
      };
  
      return {
        newConversationName,
        addConversation,
        selectConversation,
        deleteConversation,
      };
    },
  };
  </script>
  
  <style>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  button {
    margin-left: 10px;
  }
  </style>
  