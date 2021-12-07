<template>
  <v-card outlined class="ma-auto" style="height: 400px; min-width: 300px">
    <p class="text-center mt-6 mb-12 text-h5">Logga in</p>
    <v-form ref="form" v-model="form" class="" hide-details="auto">
      <v-text-field
        hide-details="auto"
        v-model="username"
        outlined
        label="Inloggning"
        :rules="nameRules"
        required
        class="ma-5 justify-center"
        @keypress.enter="login"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Lösenord"
        outlined
        hide-details="auto"
        class="ma-5 justify-center"
        required
        :rules="passRules"
        @keypress.enter="login"
      ></v-text-field>
      <v-btn
        class="white--text"
        color="#2CEAA3"
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        elevation="0"
        @click="login"
        @keypress.enter="login"
        :loading="loading"
        >Logga in</v-btn
      >
    </v-form>

    <v-card
      tile
      class="pa-1"
      style="
        background-color: #2ceaa3;
        position: absolute;
        height: 2%;
        width: 101%;
        bottom: 0;
      "
    ></v-card>
    <v-card
      tile
      style="
        background-color: #2ceaa3;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 102%;
        height: 7.5px;
      "
    ></v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import { AuthResponse, AuthRequest } from '../api/zmodels'
import { getData, createData } from '../api/zdata'
import { authenticate } from "../api/znet";

export default Vue.extend({
  data: () => ({
    username: "",
    loading: false,
    password: "",

    formHasErrors: true,
    form: false,
    nameRules: [
      (v: any) => !!v || "Name is required",
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
  }),

  methods: {
    login: async function () {
      this.loading = true;

      setTimeout(() => {
        this.formHasErrors = false;

        Object.keys(this.form).forEach((f) => {
          if (!this.form[f]) this.formHasErrors = true;
          this.$refs[f].validate(true);
        });

        if (!this.formHasErrors) {
          //#region  Ignore
          const request: AuthRequest = {
            username: this.username,
            password: this.password,
            grant_type: "password",
            client_id: "sdf",
          };

          const auth = authenticate(this.username, this.password);

          this.$emit('login');
        }

        this.loading = false;
      }, 50);


      //TODO: Auth storage

    },

    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
});
</script>