<template>
  <div>
    <markdown-editor v-model="form.reply"></markdown-editor>
    <v-card-actions>
      <v-btn icon small>
        <v-icon color="teal" @click="update">save</v-icon>
      </v-btn>
      <v-btn icon small @click="cancel">
        <v-icon>cancel</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        reply: null
      }
    };
  },
  mounted() {
    this.form = this.data;
  },
  props: ["data", "questionSlug"],
  methods: {
    cancel() {
      EventBus.$emit("cancelEditing");
    },
    update() {
      axios
        .patch(
          `/api/question/${this.questionSlug}/reply/${this.data.reply_id}`,
          { body: this.form.reply }
        )
        .then(reponse => {
          this.cancel();
        })
        .catch(error => console.log(error.reponse.data));
    }
  }
};
</script>