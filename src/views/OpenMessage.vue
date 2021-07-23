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
                  {{ messages.items.title }}
                </h3>
              </div>
            </div>
          </div>

          <div class="table-responsive">

            <em v-if="messages.loading">Loading messages...</em>
            <span v-if="messages.error" class="text-danger">ERROR: {{messages.error}}</span>
            <ul v-if="messages.items">
              <div>{{messages.items.title + " " + messages.items.message}}</div>
              <div>From {{messages.items.sender.firstName + " " + messages.items.sender.lastName}}</div>
              <ul v-if="messages.items.status === 'accepted'">
                <div>Controlled by {{messages.items.controller.firstName + " " + messages.items.controller.lastName}}</div>
              </ul>
              <ul v-if="messages.items.status === 'inaction' && messages.items.controller.id === account.user.id">
                <button @click="update(messages.items)">Accept</button>
              </ul>
            </ul>
            <div class="card">
              <div class="card-header">List of Files</div>
              <ul class="list-group list-group-flush">
                <li
                    class="list-group-item"
                    v-for="(file, index) in fileInfos"
                    :key="index"
                >
                  {{ file.name }}
                  <div class="col text-right">
                    <base-button type="primary" size="sm" @click="download(file.name)">Download file</base-button>
                  </div>
                  <div class="col text-right">
                    <ul v-if="getExtension(file.name) === 'xls' || getExtension(file.name) === 'xlsx'">
                      <div>
                        {{read(file.name)}}
                      </div>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <excel-viewer
                ref="excelViewer"
                :height="700"
                :first-row-num="firstRowNum"
                :min-col-counts="5"
                @on-reach-top="reachTop"
                @on-reach-bottom="reachBottom"
            />

          </div>

        </div>

      </div>

    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import {fileService} from "../_services/file.service";
//const jsFD = require('js-file-download');

export default {
    name: 'open_message',

    data(){
      return{
        message: '',
        id: '',
        fileInfos: [],
        firstRowNum: 2
      }
    },

    computed: {

      ...mapState({
        account: state => state.account,
        messages: state => state.messages.all
      })
    },

    created() {
      this.id = this.$route.params.id;
      this.getById({"_id":this.id});
      fileService.getFiles(this.id).then(response => {
        this.fileInfos = response.data;
      });
    },

    methods: {
      ...mapActions("messages", {
        getById: "getById",
        updateMessage: "updateMessage"
      }),

      update(message){
        this.updateMessage({"id":message.id})
      },

      download(filename){
        fileService.downloadFile(this.id, filename)
      },

      getExtension(filename){
        return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
      },

      read(fileName){
        fileService.readFile(this.id, fileName)
        .then((res) => {
          let blob = res.data;
          let reader = new FileReader();
          let self = this
          reader.onload = (e) => {
            //this.$refs.excelViewer.openExcelFile(e.target.result);
            console.log("file success read")
            self.$refs.excelViewer.openExcelData(e.target.result)
          };
          reader.readAsBinaryString(blob);
          //jsFD(res.data, fileName);
        }).catch((error) => {
          console.error("error", error);
        });
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
