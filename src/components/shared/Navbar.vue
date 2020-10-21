<template>
  <div>
    <v-card color="">
      <v-card-text>
        <v-row>
          <v-col sm="1">
            <v-btn @click="drawer = !drawer" icon>
              <v-icon>
                mdi-menu
              </v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <h1 class="navbar__title mt-2 purple--text darken-3">Electro Vue Note</h1>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        color="purple darken-3"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <span class="text-uppercase font-weight-bold">
                Menu
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            :to="item.url"
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-note',
          title: 'My notes',
          url: '/'
        },
        {
          icon: 'mdi-wizard-hat',
          title: 'Wizard import/export',
          url: '/wizard'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
  .navbar {
    &__title {
      font-family: 'Lobster', cursive;
    }
  }
</style>