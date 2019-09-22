<template>
  <div>
    <edit-question v-if="editing" :data="question"></edit-question>
    <div v-else>
      <show-question :data="question" v-if="question"></show-question>
      <v-container>
        <div v-if="question">
          <replies :replies="question.replies" :questionSlug="question.slug"></replies>
        </div>
        <div v-if="question">
          <new-reply :questionSlug="question.slug"></new-reply>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import ShowQuestion from "./ShowQuestion";
import EditQuestion from "./editQuestion";
import Replies from "../reply/replies";
import newReply from "../reply/newReply";

export default {
  data() {
    return {
      question: null,
      editing: false
    };
  },
  components: { ShowQuestion, EditQuestion, Replies, newReply },
  created() {
    this.listen();
    this.getQuestion();
  },
  methods: {
    listen() {
      EventBus.$on("startEditing", () => {
        this.editing = true;
      });
      EventBus.$on("cancelEditing", () => {
        this.editing = false;
      });
    },
    getQuestion() {
      axios.get(`/api/question/${this.$route.params.slug}`).then(response => {
        this.question = response.data.data;
      });
    }
  }
};
</script>