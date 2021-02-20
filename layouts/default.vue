<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed 
      :width="$device.isMobile ? '260' : '245'"
      app
    >
      <v-list class="pt-0">
        <v-list-item class="site-info px-4">
          <v-list-item-action>
            <div class="logo-page">
              <img src="" style="width : 100%" alt />
            </div>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">CAMs Ecommerce</v-list-item-title>
            <v-list-item-subtitle>
              <a
                :href="baseURL"
                target="_blank"
                class="white--text text-decoration-none"
              >
                abc.com.vn
              </a>
              <v-icon
                style="float: right"
                small
                color="white"
              >mdi-cog</v-icon>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- Render navigation's items -->
        <v-list class="py-0" v-for="item in navigationContent" :key="item.name">
          <v-list-group
            :value="false"
            v-if="item.subItems"
            :key="item.name"
            @click="item.link"
          >
            <template v-slot:activator>
              <v-list-item-action class="mr-2">
                <v-icon small>{{item.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text-sm-body-2">{{item.name}}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list class="py-0" v-for="subItem in item.subItems" :key="subItem">
              <v-list-item class="pl-12" :to="subItem.link">
                <v-list-item-action class="mr-2">
                  <v-icon small>{{subItem.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="text-sm-body-2" v-text="subItem.name"/>
                </v-list-item-content>  
              </v-list-item>
            </v-list>
          </v-list-group>

          <v-list-item :to="item.link" v-if="!item.subItems || item.subItems === 0">
            <v-list-item-action class="mr-2">
              <v-icon small>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-sm-body-2" v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list-group
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon small>fas fa-archive</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Inventory</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item class="pl-12" to="/inventory/item">
            <v-list-item-action>
              <v-icon small>fa fa-box-open</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Item'" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pl-12" to="/inventory/warehouse">
            <v-list-item-action>
              <v-icon small>fa fa-warehouse</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Warehouse'" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pl-12" to="/inventory/stock">
            <v-list-item-action>
              <v-icon small>fa fa-boxes</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Stock'" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed height="61" flat>
      <v-btn class="hidden-lg-and-up" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn class="hidden-md-and-down" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import navigationContent from "../static/navigation.js";

export default {
  data () {
    return {
      drawer: true,
      miniVariant: false,
      navigationContent,
      title: 'Vuetify.js'
    }
  },
  methods: {
    barNavClick: function() {
      if (this.$device.isDesktop) {
        this.miniVariant = !this.miniVariant;
      } else {
        console.log(this.$device)
        this.drawer = !this.drawer;
      }
    }
  }
}
</script>
<style>
.site-info {
  background: var(--v-primary-base);
}
.logo-page {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: white;
}
</style>
