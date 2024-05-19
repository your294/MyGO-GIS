<template>
  <div class="dialog">
    <div class="msg-list">
      <div v-for="(obj, i) in messages" :key="i">
        <div class="msg-time">
          {{ obj.time }}
        </div>
        <ChatCell :is_me="obj.is_me" :msg="obj.msg_content" />
      </div>
    </div>
    <div class="send-box">
      <div class="tool-box">
        <span class="icon-[ri--collage-line] img-upload-btn"></span>
        <span class="icon-[ri--bilibili-fill] emoji-btn"></span>
      </div>
      <form>
        <textarea
          v-model="editor_msg"
          name="msg"
          class="editor"
          placeholder="回复一下吧！"
        ></textarea>
        <div class="tool-box right">
          <span class="indicator">0/500</span>
          <button class="send-btn" @click="sendMsg">发送</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import ChatCell from "@/components/ChatCell.vue";
import { ref } from "vue";
import moment from "moment";

const editor_msg = ref("");

const messages = ref([
  {
    time: "2022年7月18日 18:42",
    msg_content: "你好",
    is_me: false,
  },
  {
    time: "2022年7月18日 18:44",
    msg_content:
      "B站跨年晚会《2023最美的夜》定档12月31日20:00直播，嘉宾阵容同步揭晓快去围观！",
    is_me: false,
  },
  {
    time: "2022年7月18日 18:44",
    msg_content: "你好",
    is_me: true,
  },
]);

function sendMsg(e) {
  e.preventDefault();
  console.log(editor_msg.value);
  messages.value.push({
    time: moment(new Date()).format("YYYY年MM月DD日 HH:mm:ss"),
    msg_content: editor_msg.value,
    is_me: true,
  });
  editor_msg.value = "";
}
</script>

<style scoped>
.dialog {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: calc(100vh - var(--nav-bar-height) - var(--tab-bar-height));
}

.msg-list {
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px 5px;
  height: 100%;
  overflow: auto;
}

.msg-time {
  width: 100%;
  min-height: 25px;
  line-height: 1.5rem;
  text-align: center;
}

.send-box {
  height: 160px;
  border-top: 1px solid #d8d8d8;
  border-bottom-right-radius: 4px;
  margin-top: auto;
  background-color: #f4f5f7;
  flex-shrink: 0;
  padding: 0 16px;
  position: relative;
  z-index: 2;
}

.send-box .editor {
  width: 100%;
  letter-spacing: 1px;
  overflow-x: hidden;
  overflow-y: auto;
  color: #222;
  background-color: transparent;
  color: inherit;
  vertical-align: baseline;
  font-size: 16px;
  min-height: 22px;
  max-height: 300px;
  word-break: break-word;
  word-wrap: break-word;
}

.send-box .tool-box {
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.tool-box.right {
  justify-content: flex-end;
  height: 46px;
}

.tool-box .indicator {
  color: #c0c0c0;
  position: absolute;
  bottom: 15px;
  right: 70px;
  font-size: 12px;
}

.tool-box .send-btn {
  background-color: #fff;
  color: #333;
  width: 60px;
  height: 25px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #e7e7e7;
  cursor: pointer;
}

.tool-box span {
  font-size: 32px;
}

.tool-box span:hover {
  color: rgb(128, 185, 242);
}

.tool-box .img-upload-btn {
  margin: 8px 15px 0 0;
  padding: 5px 7px;
  cursor: pointer;
}

.tool-box .emoji-btn {
  margin: 8px 15px 0 0;
  padding: 5px 7px;
  cursor: pointer;
}
</style>
