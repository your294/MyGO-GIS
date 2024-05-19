<template>
  <div class="chat-list-container">
    <div
      class="chat-cell shadow-lg"
      v-for="i in 3"
      :key="i"
      :style="{ '--t': i }"
    >
      <span
        class="icon-[ri--aliens-fill]"
        style="color: inherit; font-size: 3rem"
      ></span>
      <div class="text">
        <h3>Acwing web 应用课3群xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h3>
        <small>yxc: xxx[图片]yyyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxx</small>
      </div>
      <div class="info">
        <small style="display: block">18:42</small>
        <div class="badge">99+</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-list-container {
  background-color: inherit;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.chat-cell {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  width: 100%;
  height: 65px;
  padding: 13px 2px 15px 15px;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-bottom: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: slideLeft 0.5s ease-in forwards;
  animation-delay: calc(var(--t) * 200ms);
}

@keyframes slideLeft {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(0);
  }
}

.chat-cell.move {
  transform: translateX(-25%);
}

.chat-cell:last-of-type {
  border-bottom: 1px solid gray;
}

.chat-cell .text {
  overflow-x: hidden;
}

.chat-cell .text h3 {
  color: inherit;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}

.chat-cell .text small {
  color: inherit;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}

.chat-cell .info {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info .badge {
  background-color: gray;
  height: 20px;
  width: auto;
  padding: 5px 10px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
}
</style>
