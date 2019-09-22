<template>
  <div>
    <reply v-for="(reply,index) in content" :data="reply" :key="reply.id" :index="reply.id" :questionSlug="questionSlug"></reply>
  </div>
</template>

<script>
import Reply from "./reply";
export default {
  props: ["replies","questionSlug"],
  data() {
    return {
      content: {}
    };
  },
  components: { Reply },
  created() {
    this.content = this.replies;
    this.listen();
  },
  methods: {
    listen() {
      EventBus.$on("newReply", reply => {
        this.content.unshift(reply);
      });

      EventBus.$on("deleteReply", index => {
        this.content.splice(index,1);
      });
    }
  }
};
</script>