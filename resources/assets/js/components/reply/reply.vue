<template>
  <div class="mt-3">
    <v-card>
      <v-card-title>
        <div class="headline">{{data.user}}</div>
        <div class="ml-2">said {{data.created_at}}</div>
      </v-card-title>
      <v-divider></v-divider>
      <edit-reply v-if="editing" :data="data" :questionSlug="questionSlug"></edit-reply>
      <div v-else>
        <v-card-text v-html="reply"></v-card-text>
        <v-card-actions v-if="own">
          <v-btn icon small>
            <v-icon color="orange" @click="edit">edit</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon color="red" @click="destroy">delete</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import EditReply from "./EditReply";
export default {
  data() {
    return {
      editing: false
    };
  },
  props: ["data", "index", "questionSlug"],
  components: { EditReply },
  computed: {
    own() {
      return User.own(this.data.user_id);
    },
    reply() {
      return md.parse(this.data.reply);
    }
  },
  created() {
    this.listen();
  },
  methods: {
    destroy() {
      axios
        .delete(
          `/api/question/${this.questionSlug}/reply/${this.data.reply_id}`
        )
        .then(reponse => {
          EventBus.$emit("deleteReply", this.index);
        })
        .catch(error => console.log(error.reponse.data));
    },
    edit() {
      this.editing = true;
    },
    listen() {
      EventBus.$on("cancelEditing", () => {
        this.editing = false;
      });
    }
  }
};
</script>