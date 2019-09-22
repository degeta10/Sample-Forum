<template>
  <div class="mt-4">
    <markdown-editor v-model="form.body"></markdown-editor>
    <v-btn color="green" @click="reply">reply</v-btn>
  </div>
</template>
<script>
export default {
  props: ["questionSlug"],
  data() {
    return {
      form: {
        body: null
      }
    };
  },
  methods: {
    reply() {
      axios
        .post(`/api/question/${this.questionSlug}/reply`,this.form)
        .then(reponse => {
            this.form.body = ''
            EventBus.$emit('newReply',reponse.data);
        })
        .catch(error => console.log(error.reponse.data));
    }
  }
};
</script>