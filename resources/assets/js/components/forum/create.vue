
<template>
  <v-container>
    <v-form @submit.prevent="create">
      <v-flex xs12 sm6>
        <v-autocomplete
          label="Category"
          :items="categories"
          v-model="form.category_id"
          item-text="name"
          item-value="id"
        ></v-autocomplete>
      </v-flex>
      <v-text-field v-model="form.title" type="text" label="Title" required></v-text-field>
      <markdown-editor v-model="form.body"></markdown-editor>
      <v-btn color="green" type="submit">Create</v-btn>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: null,
        category_id: null,
        body: null
      },
      categories: [],
      errors:{}
    };
  },
  created() {
    axios.get("/api/category").then(response => {
      this.categories = response.data.data;
    });
  },
  methods: {
    create() {
      axios.post("/api/question",this.form).then(response => {
        this.$router.push(response.data.path);
      }).catch(error => this.errors = error.response.data);
    }
  }
};
</script>