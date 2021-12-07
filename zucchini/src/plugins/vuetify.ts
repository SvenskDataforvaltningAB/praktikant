import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes:{
            dark: {
                primary: "#32e232", 
                secondary: "#ffffff",
                background: "#353535",
                accent: "#4af54a",
            },
            light: {
                primary: "#32e232", 
                secondary: "#ffffff",
                background: "#353535",
                accent: "#4af54a",
            }
        }

    }
});