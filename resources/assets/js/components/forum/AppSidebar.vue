<template>
  <v-card>
    <v-toolbar color="cyan" dark dense class="mt-2">
      <v-toolbar-title>Category</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list two-line>
      <v-list-tile v-for="category in categories" :key="category.id">
        <v-list-tile-content>
          <v-list-tile-title>{{category.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      categories: {}
    };
  },
  created() {
    axios
      .get("/api/category")
      .then(response => {
        this.categories = response.data.data;
      })
      .catch(error => console.log(error.response.data));
  }
};
</script>