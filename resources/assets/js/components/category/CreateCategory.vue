<template>
  <v-container>
    <v-form @submit.prevent="submit">
      <v-text-field label="Category Name" v-model="form.name" required></v-text-field>

      <v-btn type="submit" color="teal" v-if="editSlug">update</v-btn>
      <v-btn color="teal" @click="cancel" v-if="editSlug">cancel</v-btn>

      <v-list-tile-action v-else>
        <v-btn type="submit" color="teal">create</v-btn>
      </v-list-tile-action>
    </v-form>

    <v-card>
      <v-toolbar color="indigo" dark dense class="mt-2">
        <v-toolbar-title>Categories</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list two-line>
        <div v-for="(category,index) in categories" :key="category.id">
          <v-list-tile>
            <v-list-tile-action>
              <v-btn icon small @click="edit(index)">
                <v-icon color="orange">edit</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{category.name}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon small @click="destroy(category.slug,index)">
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null
      },
      categories: {},
      editSlug: null,
      editIndex: null
    };
  },
  created() {
    if (!User.admin()) {
      this.$router.push("/forum");
    }
    this.list();
  },
  methods: {
    submit() {
      this.editSlug ? this.update() : this.create();
    },
    update() {
      axios
        .patch(`/api/category/${this.editSlug}`, this.form)
        .then(response => {
          this.categories.unshift(response.data);
          this.form.name = null;
        })
        .catch(error => console.log(error.response.data));
    },
    create() {
      axios
        .post("/api/category", this.form)
        .then(response => {
          this.categories.unshift(response.data);
          this.form.name = null;
        })
        .catch(error => console.log(error.response.data));
    },
    list() {
      axios
        .get("/api/category")
        .then(response => {
          this.categories = response.data.data;
        })
        .catch(error => console.log(error.response.data));
    },
    destroy(slug, index) {
      axios
        .delete(`/api/category/${slug}`)
        .then(response => {
          this.categories.splice(index, 1);
        })
        .catch(error => console.log(error.response.data));
    },
    edit(index) {
      this.form.name = this.categories[index].name;
      this.editSlug = this.categories[index].slug;
      this.editIndex = this.categories[index].id;
      this.categories.splice(index, 1);
    },
    cancel() {
      if (this.editSlug) {
      }
    }
  }
};
</script>