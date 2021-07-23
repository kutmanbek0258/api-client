<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Inbox',
            icon: 'ni ni-email-83 text-primary',
            path: '/inbox'
          }"
        />

        <sidebar-item :link="{name: 'Outbox', icon: 'ni ni-email-83 text-blue', path: '/outbox'}"/>
        <sidebar-item :link="{name: 'Controlbox', icon: 'ni ni-email-83 text-orange', path: '/controlbox'}"/>
        <sidebar-item :link="{name: 'Write message', icon: 'ni ni-email-83 text-yellow', path: '/write_message'}"/>
        <sidebar-item :link="{name: 'Logout', icon: 'ni ni-key-25 text-info', path: '/login'}"/>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
