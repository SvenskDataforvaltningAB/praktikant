<template>
  <v-app id="inspire" v-if="loggedIn">
    <v-navigation-drawer
      outlined
      class="green lighten-1"
      v-model="drawer"
      fixed
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 white--text">
            Zucchini
          </v-list-item-title>
          <v-list-item-subtitle> Zucchinis are nice... </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list outlined class="green white--text" dense nav>
        <v-list-item v-for="item in items" :to="item.to" :key="item.title" link>
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar outlined app absolute class="white--text green lighten-2">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Zucchini</v-toolbar-title>
    </v-app-bar>

    <v-main style="background-color: #2c2c2c">
      <router-view style="background-color: #2c2c2c"></router-view>
    </v-main>
  </v-app>
  <v-app style="background-color: #2c2c2c" v-else>
    <Login @login="login($event)" />
  </v-app>
</template>


<script lang="ts">
import Vue from "vue";
import Login from "./views/Login.vue";
import { getData, createData, isValid } from "./api/zdata";
import { authenticate, refreshAuth, sendFormData } from "./api/znet"
import { AxiosResponse } from "axios";

export default Vue.extend({
  data: function () {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-home-outline", to: "/" },
        { title: "Facilities", icon: "mdi-factory", to: "/facilities" },
      ],

      loggedIn: false,
    };
  },

  created() {
    this.checkAuth()
  },

  components: {
    Login,
  },

  methods: {
    login: function (params: any) {
      this.loggedIn = true;
    },

    checkAuth() {
      this.loggedIn = false;
      const atoken = getData("authToken");
      const rtoken = getData("reAuthToken");
      let success = 0;
      const req = sendFormData("https://api.sdf.cloud/test/me", "", "GET").then((response) => {
        this.loggedIn = true;
      }).catch((err) => {

        console.log("Failed to authorize, retrying.");
        refreshAuth().then((response: AxiosResponse<any, any>) => {

          if (isValid(getData("authToken").value)) {
            createData("authToken", response.data.access_token, 30);
            createData("reAuthToken", response.data.refresh_token, 60);
            console.log("Authorization success!");
            this.loggedIn = true;
          }
        });
      })



    }

  },
});
</script>

