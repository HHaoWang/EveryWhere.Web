<template>
  <v-card>
    <v-card-title>打印机信息修改</v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="editingPrinter.name" label="打印机名称" :rules="nameRules"></v-text-field>
        <v-data-table :items="sizes" :headers="sizeHeaders"
                      hide-default-footer>
          <template v-slot:item.singleBlack="{ item }">
            <v-text-field v-model.number="item.singleBlack" type="number" dense :rules="priceRule"></v-text-field>
          </template>
          <template v-slot:item.duplexBlack="{ item }">
            <v-text-field v-model.number="item.duplexBlack" type="number" dense :rules="priceRule"></v-text-field>
          </template>
          <template v-slot:item.singleColor="{ item }">
            <v-text-field v-model.number="item.singleColor" type="number" dense :rules="priceRule"></v-text-field>
          </template>
          <template v-slot:item.duplexColor="{ item }">
            <v-text-field v-model.number="item.duplexColor" type="number" dense :rules="priceRule"></v-text-field>
          </template>
          <template v-slot:item.id="{ item }">
            <v-icon color="red" @click="deleteSize(item)">
              {{icons.del}}
            </v-icon>
          </template>
        </v-data-table>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="cancelEdit">取消</v-btn>
      <v-btn color="primary" text @click="submitEdit">确认</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mdiDelete} from "@mdi/js";

export default {
  name: "ModifyPrinter",
  props:{
    printer:{
      default:''
    }
  },
  data(){
    return {
      icons:{
        del:mdiDelete
      },
      editingPrinter:'',
      sizes:[],
      priceRule:[
        v => !isNaN(Number.parseFloat(v)) || "不是有效的数字！"
      ],
      nameRules:[
          v => !!v || "打印机名称不能为空！"
      ]
    }
  },
  computed:{
    sizeHeaders(){
      let headers = [
        {
          text: '纸张',
          sortable: true,
          value: 'name',
        },{
          text: '黑白单面(元/张)',
          sortable: true,
          value: 'singleBlack',
        }
      ];

      if (this.editingPrinter.supportDuplex){
        headers.push({
          text: '黑白双面(元/张)',
          sortable: true,
          value: 'duplexBlack',
        })
      }

      if (this.editingPrinter.supportColor){
        headers.push({
          text: '彩色单面(元/张)',
          sortable: true,
          value: 'singleColor',
        })
      }

      if (this.editingPrinter.supportColor && this.editingPrinter.supportDuplex){
        headers.push({
          text: '彩色双面(元/张)',
          sortable: true,
          value: 'duplexColor',
        })
      }

      headers.push({
        text: '操作',
        value: 'id',
      });

      return headers;
    }
  },
  watch:{
    printer(newVal){
      this.editingPrinter = newVal;
      let sizeNames = Object.keys(newVal.supportSizes);
      this.editingPrinter.sizes = [];
      for (let sizeName of sizeNames) {
        this.editingPrinter.sizes.push({
          name:sizeName,
          ...newVal.supportSizes[sizeName]
        });
      }
      this.sizes = this.editingPrinter.sizes;
    }
  },
  created() {
    this.editingPrinter = this.printer;
    let sizeNames = Object.keys(this.printer.supportSizes);
    this.editingPrinter.sizes = [];
    for (let sizeName of sizeNames) {
      this.editingPrinter.sizes.push({
        name:sizeName,
        ...this.printer.supportSizes[sizeName]
      });
    }
    this.sizes = this.editingPrinter.sizes;
  },
  methods:{
    submitEdit(){
      if (this.$refs.form.validate()){
        let sizePrice = {};
        for (let size of this.sizes) {
          sizePrice[size["name"]] = {
            ...size
          };
          delete sizePrice[size["name"]]["name"];
        }
        this.$emit("submitEdit",{
          id:this.editingPrinter.id,
          name:this.editingPrinter.name,
          supportSizes:sizePrice
        });
      }
    },
    cancelEdit(){
      this.$emit('cancelEdit');
    },
    deleteSize(size){
      this.sizes = this.sizes.filter(value => {
        return value.name !== size.name;
      })
    }
  }
}
</script>

<style scoped>

</style>