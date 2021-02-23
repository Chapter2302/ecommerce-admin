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

          <!-- Render with subitems -->
          <v-list-group
            :value="false"
            v-if="item.subItems"
          >
            <template v-slot:activator>
              <v-list-item-action class="mr-2">
                <v-icon small>{{item.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text-sm-body-2">{{item.name}}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list class="py-0" v-for="subItem in item.subItems" :key="subItem.name">
              <!-- Render with children -->
              <v-list-group v-if="subItem.children">
                <template v-slot:activator>
                  <v-list-item-action class="pl-3 mr-2">
                    <v-icon small>{{subItem.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="text-sm-body-2">{{subItem.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item 
                  v-for="child in subItem.children" 
                  :key="child.name" class="pl-12" 
                  :to="child.link" exact
                >
                  <v-list-item-action class="mr-2">
                    <v-icon small>{{child.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="text-sm-body-2" v-text="child.name"/>
                  </v-list-item-content>  
                </v-list-item>
              </v-list-group>

              <!-- Render with no children -->
              <v-list-item class="pl-6" v-if="!subItem.children" :to="subItem.link">
                <v-list-item-action class="mr-2">
                  <v-icon small>{{subItem.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="text-sm-body-2" v-text="subItem.name"/>
                </v-list-item-content>  
              </v-list-item>
            </v-list>
          </v-list-group>

          <!-- Render with no subitems -->
          <v-list-item exact :to="item.link" v-if="!item.subItems || item.subItems === 0">
            <v-list-item-action class="mr-2">
              <v-icon small>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-sm-body-2" v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed height="61" flat>
      <v-btn class="hidden-lg-and-up" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn class="hidden-md-and-down" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
      <Notification />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-avatar height="40" width="40">
              <img :src="require('../assets/medias/images/defaultuserimg.png')"/>
            </v-avatar>
            <span>Admin</span>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="logout-btn">Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
import Notification from "../components/Notification/Notification.vue"

export default {
  components: {
    Notification
  },
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
