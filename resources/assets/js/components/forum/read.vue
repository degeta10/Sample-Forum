<template>
  <div>
    <edit-question v-if="editing" :data="question"></edit-question>
    <div v-else>
      <show-question :data="question" v-if="question"></show-question>
    </div>
  </div>
</template>

<script>
import ShowQuestion from "./ShowQuestion";
import EditQuestion from "./editQuestion";

export default {
  data() {
    return {
      question: null,
      editing: false
    };
  },
  components: { ShowQuestion,EditQuestion },
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