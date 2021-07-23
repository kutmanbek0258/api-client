<template>
    <div>
      <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        <!-- Card stats -->

      </base-header>

        <div class="container-fluid mt--7">
            <div class="row">

                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Write message</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                          <form @submit.prevent="handleSubmit">


                            <ul v-if="!messages.success">

                              <div class="form-group">
                                <label for="controller">Message controller</label>
                                <v-autocomplete
                                    type="text"
                                    :items="users.itemsKeywordController"
                                    v-model="controller"
                                    :get-label="getLabelController"
                                    :component-item='template'
                                    v-validate="'required'"
                                    name="controller"
                                    class="form-control"
                                    :class="{ 'is-invalid': submitted && errors.has('controller') }"
                                    @update-items="updateItemsController">
                                </v-autocomplete>
                                <div v-if="submitted && errors.has('controller')" class="invalid-feedback">{{ errors.first('controller') }}</div>
                              </div>
                              <div class="form-group">
                                <label for="receiver">Message receiver</label>
                                <v-autocomplete
                                    type="text"
                                    :items="users.itemsKeywordReceiver"
                                    v-model="receiver"
                                    :get-label="getLabelReceiver"
                                    :component-item='template'
                                    v-validate="'required'"
                                    name="controller"
                                    class="form-control"
                                    :class="{ 'is-invalid': submitted && errors.has('receiver') }"
                                    @update-items="updateItemsReceiver">
                                </v-autocomplete>
                                <div v-if="submitted && errors.has('receiver')" class="invalid-feedback">{{ errors.first('receiver') }}</div>
                              </div>
                              <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" v-model="message.title" v-validate="'required'" name="title" class="form-control" :class="{ 'is-invalid': submitted && errors.has('firstName') }" />
                                <div v-if="submitted && errors.has('title')" class="invalid-feedback">{{ errors.first('title') }}</div>
                              </div>
                              <div class="form-group">
                                <label for="message">Message</label>
                                <input type="text" v-model="message.message" v-validate="'required'" name="message" class="form-control" :class="{ 'is-invalid': submitted && errors.has('lastName') }" />
                                <div v-if="submitted && errors.has('message')" class="invalid-feedback">{{ errors.first('message') }}</div>
                              </div>
                              <div class="form-group">
                                <input @change="chooseFile" type="file">
                              </div>

                              <excel-viewer
                                  ref="excelViewer"
                                  :height="700"
                                  :first-row-num="firstRowNum"
                                  :min-col-counts="5"
                                  @on-reach-top="reachTop"
                                  @on-reach-bottom="reachBottom"
                              />

                              <div class="form-group">
                                <button class="btn btn-primary" :disabled="messages.loading">Send</button>
                                <img v-show="messages.loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                <router-link to="/" class="btn btn-link">Cancel</router-link>
                              </div>
                              <em v-if="messages.loading">Loading messages...</em>
                              <span v-if="messages.error" class="text-danger">ERROR: {{messages.error}}</span>

                            </ul>
                            <ul v-if="messages.success">
                              <div>{{submitFile(messages.success.id)}}</div>
                              <sidebar-item-inside :link="{
                                name: 'Open last message',
                                path: '/open_message/'+messages.success.id
                              }"/>
                            </ul>

                          </form>
                        </template>
                    </card>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
  import UserItemTemplate from "../messages/UserItemTemplate";
  import {mapActions, mapState} from "vuex";
  import {fileService} from "../_services/file.service";

  export default {
    name: 'write_message',
    data() {
      return {
        message: {
          sender: '',
          controller:'',
          receiver:'',
          title: '',
          message: '',
          fileExtension:''
        },
        file: '',
        submitted: false,
        fileSelected: false,
        controller: {
          id: '',
          firstName: '',
          lastName: '',
          username: ''
        },
        receiver: {
          id: '',
          firstName: '',
          lastName: '',
          username: ''
        },
        template: UserItemTemplate,

        firstRowNum: 2
      }
    },

    computed: {

      ...mapState({
        account: state => state.account,
        messages: state => state.messages.all,
        users: state => state.users.all
      })
    },

    methods: {

      ...mapActions(
          'messages', {
            createMessage: 'createMessage'
          }),
      ...mapActions('users',{
        getByKeyword: 'getByKeyword',
        getByKeywordController: 'getByKeywordController',
        getByKeywordReceiver: 'getByKeywordReceiver'
      }),

      handleSubmit () {
        this.submitted = true;
        this.$validator.validate().then(valid => {
          if (valid && this.fileSelected) {
            this.createMessage(this.message)
          }
        });
      },
      chooseFile(e){
        this.file = e.target.files[0];
        this.fileSelected = true;
        if(this.getExtension(this.file.name) === 'xls' || this.getExtension(this.file.name) === 'xlsx'){
          this.$refs.excelViewer.openExcelFile(this.file);
        }
      },

      submitFile(fileName){
        fileService.submitFile(this.file, fileName)
            //.then(this.$router.push({ name: 'outbox'}))
      },

      getLabelController (controller) {
        this.message.controller = controller.id;
        return controller.firstName + " " + controller.lastName
      },
      getLabelReceiver (receiver) {
        this.message.receiver = receiver.id;
        return receiver.firstName + " " + receiver.lastName
      },
      updateItemsController (text) {
        this.getByKeywordController(text)
      },
      updateItemsReceiver (text) {
        this.getByKeywordReceiver(text)
      },


      getExtension(filename){
        return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
      },

      reachTop() {//滚动到顶部的事件 on reach top
        console.info("touch top");
      },

      reachBottom() {//滚动到底部的事件 on reach bottom
        console.info("touch bottom");
      }

    }

  };
</script>
<style></style>
