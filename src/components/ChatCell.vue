<template>
  <div id="chat-cell" :class="{ is_me: is_me }">
    <Avatar :src="teamAvatar"></Avatar>
    <div class="message">
      <div class="message-content" :class="{ is_me: is_me }">
        {{ props.msg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "./Avatar.vue";
import teamAvatar from "../assets/teamAvatar.png";

const props = defineProps({
  is_me: Boolean,
  msg: String,
});
</script>

<style scoped>
#chat-cell {
  /* background-color: rgb(244, 245, 247); */
  min-height: 48px;
  margin: 10px;
  padding: 0 16px 16px;
  overflow: hidden;
  position: relative;
  float: left;
  border: 0;
}

#chat-cell.is_me {
  float: right;
}

#chat-cell > #avatar {
  float: left;
}

#chat-cell.is_me > #avatar {
  float: right;
}

.is_me .message {
  float: right;
  color: #fff;
}

.message {
  float: left;
  max-width: 300px;
  margin: 0 10px;
  position: relative;
  overflow: hidden;
  color: #333;
}

.message .message-content {
  position: relative;
  z-index: 1;
  line-height: 1.5;
  font-size: 14px;
  min-height: 37px;
  padding: 8px 16px;
  word-wrap: break-word;
  word-break: break-word;
  border-radius: 0 16px 16px 16px;
  overflow: hidden;
  background-color: #fff;
}

.message .message-content.is_me {
  float: right;
  background-color: rgb(128, 185, 242);
  border-radius: 16px 0 16px 16px;
}

#chat-cell.is_me {
  animation: moveToTop 0.3s ease-in-out forwards;
}

@keyframes moveToTop {
  0% {
    transform: translateY(200px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
