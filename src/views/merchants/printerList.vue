<template>
  <div>
    <v-alert :type="alertType" :value="showAlert" border="left" colored-border dismissible
             elevation="2" style="position: absolute;right: 8px" transition="slide-x-reverse-transition"
    >{{ message }}
    </v-alert>
    <v-data-table
        :headers="headers"
        :items="printers"
        class="elevation-1"
        height="70vh"
    >
      <template v-slot:item.state="{ item }">
        <span>
          <v-chip
              v-if="item.state === 0"
              class="ma-2"
              color="red"
              text-color="white"
          >未支付</v-chip>
          <v-chip
              v-if="item.state === 1"
              class="ma-2"
              color="secondary"
          >打印中</v-chip>
          <v-chip
              v-if="item.state === 2"
              class="ma-2"
              color="green"
              text-color="white"
          >已完成</v-chip>
        </span>
      </template>
      <template v-slot:item.supportDuplex="{item}">
        <span>{{ item.supportDuplex ? '支持' : '不支持' }}</span>
      </template>
      <template v-slot:item.supportColor="{item}">
        <span>{{ item.supportColor ? '支持' : '不支持' }}</span>
      </template>
      <template v-slot:item.isWork="{item}">
        <v-switch v-model="item.isWork"
                  style="display: inline-block" @change="changePrinterWorkingState(item)"
        ></v-switch>
      </template>
      <template v-slot:item.id="{ item }">
        <v-icon class="mr-5" color="primary" @click="editItem(item)">
          {{ icons.pen }}
        </v-icon>
        <v-icon color="red" @click="deleteItem(item)">
          {{ icons.del }}
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="showEditDialog" width="700" persistent>
      <modify-printer :printer="editingPrinter"
                      @cancelEdit="showEditDialog = false" @submitEdit="submitPrinter"></modify-printer>
    </v-dialog>

    <confirm-dialog ref="confirmDialog" confirm-color="red"></confirm-dialog>
  </div>
</template>

<script>
import {userRequest} from "@/network/request";
import {mdiDelete, mdiPencilOutline} from '@mdi/js';
import ModifyPrinter from "@/components/ModifyPrinter";
import ConfirmDialog from "@/components/ConfirmDialog";

export default {
  name: "printerList",
  components: {ConfirmDialog, ModifyPrinter},
  data() {
    return {
      search: '',
      printers: [],
      expandedRow: 0,
      icons: {
        pen: mdiPencilOutline,
        del: mdiDelete
      },
      message: "",
      showAlert: false,
      alertType: "success",
      showEditDialog: false,
      editingPrinter: {
        sizes: []
      }
    }
  },
  computed: {
    headers() {
      return [
        {
          text: '名称',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        {
          text: '设备名称',
          align: 'center',
          sortable: true,
          value: 'deviceName',
        },
        {
          text: '支持彩印',
          align: 'center',
          sortable: true,
          value: 'supportColor',
        },
        {
          text: '支持双面打印',
          align: 'center',
          sortable: true,
          value: 'supportDuplex'
        }, {
          text: '是否接单',
          align: 'center',
          sortable: true,
          value: 'isWork',
        },
        {
          text: '添加时间',
          align: 'center',
          sortable: true,
          value: 'createTime',
        },
        {
          text: '操作',
          align: 'center',
          value: 'id',
        }
      ]
    },
  },
  created() {
    this.getPrinters();
  },
  methods: {
    /**
     * 获取店铺打印机
     */
    getPrinters() {
      userRequest({
        url: "/api/Printer/Shop/" + this.$store.state.shopInfo.id,
        method: "GET"
      }).then(res => {
        if (res.statusCode === 200) {
          this.printers = res.data.printers
        }
      })
    },
    /**
     * 更新打印机信息到服务器
     * @param printer 更新的打印机信息
     */
    patchPrinter(printer) {
      userRequest({
        url: "/api/Printer",
        method: "PATCH",
        data: printer
      }).then(res => {
        this.getPrinters();
      }).catch(err => {
        console.log(err);
      });
    },
    /**
     * 修改打印机接单状态
     * @param printer 打印机
     */
    changePrinterWorkingState(printer) {
      this.patchPrinter({
        id: printer.id,
        isWork: printer.isWork
      });
    },
    /**
     * 打开打印机修改对话框
     * @param printer 打印机信息
     */
    editItem(printer) {
      this.editingPrinter = JSON.parse(JSON.stringify(printer));
      this.showEditDialog = true;
    },
    /**
     * 删除打印机
     * @param printer 打印机信息
     */
    deleteItem(printer) {
      this.$refs.confirmDialog
          .open("删除打印机", "确认要删除【"+printer.name+"】吗？删除后无法恢复，必须重新添加！")
          .catch(err => {
            throw new Error("取消删除");
          }).then(res => {
            return userRequest({
              url: "/api/Printer/" + printer.id,
              method: "DELETE"
            })
          }).then(res => {
            if (res.statusCode !== 200) {
              this.alert("warning", "删除打印机失败！");
              return;
            }
            this.alert("success", "删除成功！");
            this.getPrinters();
          }).catch(err=>{
            console.log(err);
          })
    },
    /**
     * 右上角信息提示
     * @param type 提示类型,可选值success,info,warning或error
     * @param message 提示内容
     */
    alert(type, message) {
      this.showAlert = false;
      this.alertType = type;
      this.message = message;
      this.showAlert = true;
    },
    /**
     * 提交打印机修改
     * @param printer 修改后的打印机信息
     */
    submitPrinter(printer) {
      this.patchPrinter(printer);
      this.showEditDialog = false;
    }
  }
}
</script>

<style scoped>

</style>