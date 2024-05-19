<template>
  <div class="chat-list-container">
    <div
      class="chat-cell shadow-lg"
      v-for="(item, i) in chatRecord"
      :key="i"
      :style="{ '--t': i }"
      @click="
        () => {
          router.push('/msg');
        }
      "
    >
      <span :class="item.icon" style="color: inherit; font-size: 3rem"></span>
      <div class="text">
        <h3>{{ item.title }}</h3>
        <small>{{ item.new_info }}</small>
      </div>
      <div class="info">
        <small style="display: block">{{ item.time }}</small>
        <div class="badge" :class="{ system: item.system }">
          {{ item.record_num }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const chatRecord = ref([
  {
    icon: "icon-[ri--bilibili-line]",
    title: "GIS Robot",
    new_info: "你有一条新的系统消息",
    time: "18:42",
    record_num: "1",
    system: true,
  },
  {
    icon: "icon-[ri--contacts-fill]",
    title: "同事1号",
    new_info: "请巡查之前新设置的路线",
    time: "07:42",
    record_num: "5",
  },
  {
    icon: "icon-[ri--copilot-fill]",
    title: "同事2",
    new_info: "请巡查之前设置的固定点位",
    time: "12:00",
    record_num: "99+",
  },
]);
</script>

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
  min-width: 20px;
  padding: 5px;
  border: 0;
  border-radius: 20px;
  color: #fff;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge.system {
  background-color: rgb(242, 54, 54);
}
</style>
