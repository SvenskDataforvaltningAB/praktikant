<template>
  <div v-if="loggedIn">
    <v-app id="inspire">
      <v-navigation-drawer
      class="green lighten-2"
      v-model="drawer"
      app 
    >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 white--text" >
              Zucchini
            </v-list-item-title>
            <v-list-item-subtitle>
              Zucchinis are nice...
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
        class="green lighten-3 white--text"
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :to="item.to"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon class=" white--text">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app hide-on-scroll class=" white--text light-green lighten-2">
        <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Zucchini</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
  <div v-else>
    <Login @login="login($event)" />
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Login from './views/Login.vue'

export default Vue.extend({
    data: function () {
      return{
        drawer: null,
        items: [
          { title: "Home", icon:"mdi-home", to: "/" },
          { title: "About", icon:"mdi-information", to: "/about"},
        ],
        
        loggedIn: false,
      }
    },

    components:
    {
      Login
    },

    methods: {
      login: async function (params: any) {
        this.loggedIn = true;
      }


    }
})
    
</script>

