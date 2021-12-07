<template>
  <div>
    <v-card
      ><v-fab-transition>
        <v-btn
          style="z-index: 9"
          color="green"
          width="48"
          height="48"
          fab
          dark
          small
          absolute
          bottom
          right
          @click="fetchFacilities"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card>
    <v-data-table
      :loading="facilitiesLoading"
      loading-text="Fetching data..."
      class=""
      :headers="headers"
      :items="facilities"
      @click:row="clickFacility"
      dark
      style="
        min-height: 100%;
        border-color: #3c3c3c;
        border-style: solid;
        border-width: 1px;
        background-color: dark-gray;
      "
    >
    </v-data-table>
    <v-dialog
      v-model="facilityDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="pa-2" flat dark>
        <v-toolbar class="green lighten-1" fixed>
          <v-btn
            fab
            icon
            class="white--text"
            @click="facilityDialog = !facilityDialog"
            ><v-icon>mdi-close</v-icon></v-btn
          >
          <v-spacer></v-spacer>
          <v-toolbar-title class="white--text">{{
            getFacilityName()
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <!--${selectedFacility.customer} | ${selectedFacility.facilityName}` <--- titleBar -->

        <v-card
          class="white--text ma-auto mt-8 scroll"
          style="
            max-height: 275px;
            width: 95%;
            background-color: #232323;
            border: 1px solid gray;
          "
        >
          <v-toolbar
            flat
            style="background-color: #191919; border-bottom: 1px solid gray"
          >
            <v-toolbar-title>Issues</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              class="green mx-1"
              small
              fab
              icon
              @click="ciDialog = !ciDialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>

          <v-data-table
            class=""
            style="background-color: #232323; border-right: 1px solid gray"
            :headers="issueHeaders"
            :items="selectedFacility.issues"
          ></v-data-table>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="500px"
      v-model="ciDialog"
      transition="dialog-bottom-transition"
    >
      <v-card flat>
        <v-card flat>
          <v-card-title>
            <span class="text-h5">Create Issue</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="newIssue.facility.id"
                  label="Anläggning"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="newIssue.name"
                  label="Benämning"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="newIssue.yourReference"
                  label="Beställare"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-textarea
                  outlined
                  v-model="newIssue.description"
                  label="Beskrivning"
                ></v-textarea>
              </v-row>
              <v-row>
                <v-text-field
                  outlined
                  v-model="newIssue.coordinates.latitude"
                  label="Latitude"
                ></v-text-field>

                <v-text-field
                  outlined
                  v-model="newIssue.coordinates.longitude"
                  label="Longitude"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-file-input
                  :rules="rules"
                  accept="image/jpeg, image/jfif, image/tiff"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                  counter
                  show-size="1000"
                  @change="handleFile()"
                  v-model="exifFile"
                  >Image...</v-file-input
                >
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeIssuePanel">
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                () => {
                  createIssue();
                  clickFacility(selectedFacility);
                }
              "
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<!-- :search="search"   -->

<script>
import Vue from "vue";
import { sendFormData, sendData } from '../api/znet'
import { parseIssues } from '../api/zdata'
import { create } from 'exif-parser'
import { decimal } from "vuelidate/lib/validators";
export default Vue.extend({
  data: () => ({

    rules: [
      value => value.size > 20000000 ? 'Image size should be less than 20 MB!' : true,
    ],

    selectedFacility: {
      issues: [
        {

        }
      ]

    },
    facilitiesLoading: false,
    facilityDialog: false,
    ciDialog: false,

    exifData: {},
    exifFile: {},

    newIssue: {
      facility: {
        id: "Agreed"
      },

      coordinates: {
        longitude: "0.0 N",
        latitude: "0.0 E"
      },

      description: "Basically yes",
      name: "Testing",
      yourReference: "Tester",
    },

    defaultItem: {
      facility: {
        id: ""
      },

      description: "",
      name: "",
      yourReference: "",
    },

    facilities: [
      {
        customer: "Apple Inc.",
        facilityName: "Phone Factory",
        facilityNumber: 9,
        address: "Longhua Town, Shenzhen, China",
        ort: "Shenzhen",
        issues: [{}],
      },
    ],

    headers: [
      {
        text: "Kund",
        align: "start",
        value: "customer",
      },
      { text: "Namn", value: "facilityName" },
      { text: "Nummer", value: "facilityNumber" },
      { text: "Besöksadress", value: "address", sortable: false },
      { text: "Ort", value: "ort" },
    ],

    issueHeaders: [

      {
        text: "Beställningsnummer",
        value: "orderNumber",
        sort: "start"
      },
      {
        text: "Status",
        value: "status",
      },
      {
        text: "Feltext",
        value: "errortext",
        align: "start"
      },
      {
        text: "Datum",
        value: "date",
      },


    ],
  }),

  mounted() {
    setTimeout(() => {
      console.log("ye")
    }, 1000);
    this.fetchFacilities()

  },

  methods: {
    getFacilityName() {
      var customer = this.selectedFacility.customer || "Unknown Customer";
      var facilitiyName = this.selectedFacility.facilityName || "Unknown Facility";

      return `${customer} | ${facilitiyName}`
    },

    async clickFacility(value) {
      this.facilityDialog = true;
      this.selectedFacility = value;

      sendFormData("https://api.sdf.cloud/test/issues/?facilityId=" + value.id).then((response) => {
        this.selectedFacility.issues = parseIssues(response.items);
      })

    },

    fetchFacilities() {
      // Initialize

      this.facilitiesLoading = true;

      let request = sendFormData("https://api.sdf.cloud/test/facilities", {}, "GET")

      request.then(response => {
        console.log("Fetching facilities...")

        this.facilities = [];
        let line = "h";

        response.items.forEach(element => {
          console.log(element)

          const line1 = element["address"].line1;
          const line2 = element["address"].line2;
          const city = element["address"].city;

          line = `${line1 || ""}${line2 || ""} ${city || ""} `;

          this.facilities.push({
            customer: element.customer.name,
            facilityName: element["name"],
            facilitiyNumber: element["orgNumber"],
            address: `${line} ${element["address"].postalCode}`,
            ort: element["municipaility"],
            id: element["id"],
            issues: []
          })
          this.facilitiesLoading = false;

        })

        this.facilitiesLoading = false;
      }).catch((err) => {
        console.log("Failed to fetch facilities!\r\n");
        console.log(err);

        this.facilitiesLoading = false;

      })
    },

    closeIssuePanel() {


      this.ciDialog = false
      this.$nextTick(() => {
        this.newIssue = Object.assign({}, this.defaultItem)
      })
    },

    handleFile() {
      this.exifFile.arrayBuffer().then(data => {
        var parser = create(data)
        this.exifData = parser.parse()
        console.log(this.exifData)
        this.newIssue.coordinates.latitude = parseFloat(this.exifData.tags.GPSLatitude);
        this.newIssue.coordinates.longitude = parseFloat(this.exifData.tags.GPSLongitude);

      })
    },

    issueFormat() {
      const issue = {
        facility: this.newIssue.facility,
        coordinates: this.newIssue.coordinates,
        description: this.newIssue.description,
        name: this.newIssue.name,
        yourReference: this.newIssue.yourReference,
      };

      return issue;
    },


    createIssue() {
      this.newIssue.facility.id = this.selectedFacility.id;

      var issue = this.issueFormat();
      const data = JSON.stringify(issue);
      sendData("https://api.sdf.cloud/test/issues", data, "POST").then((function (response) {
        this.fetchFacilities();
        this.closeIssuePanel();

      })).catch(function(err) {
        console.log("Failed to create")
      });

    },
  },
})
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
}
</style>