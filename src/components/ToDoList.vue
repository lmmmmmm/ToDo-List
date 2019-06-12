<template>
  <div>
    <el-row style="margin-top:10px">
      <el-col :span="6" :offset="8">
        <el-input v-model="data" placeholder="请输入代办事项"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="addData()" icon="el-icon-plus">添加</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="10" :offset="2" class="left">
        <h2>正在进行</h2>
        <ul>
          <li v-for="(item,key) in list" v-if="!item.checked">
            <el-card class="box-card">
              <div class="text item">
                {{item.title}}
                <span class="incoInfo">
                  <i class="el-icon-check" @click="completed(item,index)"></i>
                  &nbsp;
                  <i class="el-icon-edit"></i>
                  &nbsp;
                  <i class="el-icon-delete" @click="removeData(item,key)"></i>
                </span>
              </div>
            </el-card>
          </li>
        </ul>
      </el-col>
      <el-col :span="12" class="right">
        <h2>已完成</h2>
        <ul>
          <li v-for="(item,key) in list" v-if="item.checked">
            <el-card class="box-card">
              <div class="text item">
                {{item.title}}
                <span class="incoInfo">
                  <i class="el-icon-delete" @click="removeData(item,key)"></i>
                </span>
              </div>
            </el-card>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import storage from "../storage/storage.js";
export default {
  data() {
    return {
      data: "",
      list: []
    };
  },
  methods: {
    addData() {
      if (this.data == "") {
        this.$message.error("请输入代码事项");
        return false;
      }
      this.list.push({
        title: this.data,
        checked: false
      });
      storage.set("list", this.list);
      this.$message({ message: "添加成功", type: "success" });
      this.data = "";
    },
    completed(item, key) {
      item.checked = true;
      storage.set("list", this.list);
    },
    removeData(item, key) {
      if (item.checked == false) {
        // this.$confirm("该事项正在进行, 是否删除?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        //     this.list.splice(item.key, 1);
        //     storage.remove("list",key);
        //     this.$message({
        //       type: "success",
        //       message: "删除成功!"
        //     });
        //   })
        //   .catch(() => {});
        this.list.splice(key, 1);
        storage.remove("list", key);
      } else {
        this.list.splice(key, 1);
        storage.remove("list", key);
      }
    }
  },
  mounted() {
    var data = storage.get("list");
    if (data) {
      this.list = data;
    }
  }
};
</script>

<style>
#app {
  margin-top: 0px !important;
}

.info {
  font-size: 18px;
  line-height: 80px;
}

a {
  text-decoration: none;
  color: white;
}

li {
  list-style: none;
}

.left {
  min-height: 400px;
  border-right: solid 1px #eee;
}
.right {
  min-height: 400px;
}

.box-card {
  text-align: center;
  width: 80%;
  height: 30%;
  margin-top: 5px;
}
.incoInfo {
  float: right;
  font-size: 18px;
  cursor:pointer;
}
</style>
