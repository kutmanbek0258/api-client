<template>

  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->

    </base-header>

    <div class="container-fluid mt--7">

      <div class="card shadow"
           :class="type === 'dark' ? 'bg-default': ''">
        <div class="card-header border-0"
             :class="type === 'dark' ? 'bg-transparent': ''">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                Inbox
              </h3>
            </div>
            <div class="col text-right">
              <base-button type="primary" size="sm">See all</base-button>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <base-table class="table align-items-center table-flush"
                      :class="type === 'dark' ? 'table-dark': ''"
                      :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                      tbody-classes="list"
                      :data="messages.items">
            <template slot="columns">
              <th>From</th>
              <th>Title</th>
              <th>Created date</th>
              <th>Link</th>
            </template>

            <template slot-scope="{row}">
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">{{row.sender.firstName}}</span>
                  </div>
                </div>
              </th>
              <td class="budget">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">{{row.title}}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">{{row.createdDate}}</span>
                  </div>
                </div>
              </td>

              <td>

                <div class="media align-items-center">
                  <div class="media-body">
                    <sidebar-item-inside :link="{
                      name: 'Open message',
                      path: '/open_message/'+row.id
                    }"/>
                  </div>
                </div>

              </td>

            </template>

          </base-table>
        </div>

        <div class="card-footer d-flex justify-content-end"
             :class="type === 'dark' ? 'bg-transparent': ''">
          <base-pagination total="30"></base-pagination>
        </div>

      </div>

    </div>

  </div>

</template>
<script>
  import {mapActions, mapState} from "vuex";
  export default {
    name: 'inbox',
    computed: {

      ...mapState({
        account: state => state.account,
        messages: state => state.messages.all
      })
    },

    created() {
      this.getReceiverMessages();
    },

    methods: {
      ...mapActions("messages", {
        getReceiverMessages: "getReceiverMessages"
      })
    }
  };
</script>
<style></style>
