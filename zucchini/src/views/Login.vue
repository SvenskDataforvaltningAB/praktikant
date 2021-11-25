<template>
  <v-form ref="LoginForm" v-model="valid">
    <v-text-field
      v-model="username"
      :counter="50"
      label="Inloggning"
      error:rules="nameRules"
      required
      @keypress.enter="login"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :counter="75"
      label="Lösenord"
      required
      error:rules="passRules"
      @keypress.enter="login"
    ></v-text-field>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { LoginRequest } from "./../api";

export default Vue.extend({
  data: function () {
    return {
      username: "",
      password: "",

      valid: true,
      nameRules: [
        (v: any) => !!v || "Name is required",
        (v: any) =>
          ((v: any) => v && v.length <= 10) ||
          "Names can't be more than 50 characters",
      ],
      passRules: [
        (v: any) => !!v || "Password is required",
        ((v: any) => v && v.length <= 75) ||
          "Passwords can't be more than 75 characters",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },

  methods: {
    login: async function () {
      // const headers = new Headers();
      // headers.set('Access-Control-Allow-Origin', '127.0.0.1');
      // headers.set('content-type', 'application/json;charset=UTF-8');

      const data2: LoginRequest = {
        username: this.username,
        password: this.password,
        grant_type: "password",
        client_id: "sdf",
      };

      var form_data = new FormData();

      for (var key in data2) {
        form_data.append(key, data2[key]);
      }

      const data = new URLSearchParams();
      for (const pair of form_data) {
        data.append(pair[0], pair[1]);
      }

      const init = {
        method: "POST",
        headers: {},
        body: data,
      };

      const response = await window
        .fetch("https://api.sdf.cloud/test/connect/token", init)
        .catch((error) => console.log(error));

      if (response && response.ok) {
        console.log(response);
        this.$emit("login", {
          username: this.username,
          password: this.password,
        });

        //TODO: Auth storage
      }
    },
  },
});
</script>