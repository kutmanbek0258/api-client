<template>
    <div class="nav-item">
        <router-link
                :to="link.path"
                @click.native="linkClick"
                class="nav-link"
                :target="link.target"
                :href="link.path">
            <template>
                <base-button type="primary" size="sm">{{ link.name }}</base-button>
            </template>
        </router-link>
    </div>
</template>
<script>
  export default {
    name: 'sidebar-item-inside',
    props: {
      link: {
        type: Object,
        default: () => {
          return {
            name: '',
            path: '',
            children: []
          };
        },
        description:
          'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
      }
    },
    inject: {
      autoClose: {
        default: true
      }
    },
    data() {
      return {
        children: [],
        collapsed: true
      };
    },
    methods: {
      linkClick() {
        if (
          this.autoClose &&
          this.$sidebar &&
          this.$sidebar.showSidebar === true
        ) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
