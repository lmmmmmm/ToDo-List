<template>
  <div>
    <el-row style="margin-top:10px">
      <el-col :span="5" :offset="4">
        <el-input v-model="data" placeholder="请输入代办事项" maxlength="12"></el-input>
      </el-col>

      <el-col :span="1" :offset="1">
        <el-time-select
          placeholder="开始时间"
          v-model="startTime"
          :picker-options="{
            start: '07:00',
            step: '00:15',
            end: '24:00',
           }"
        ></el-time-select>
      </el-col>

      <el-col :span="1" :offset="3">
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '07:00',
            step: '00:15',
            end: '24:00',
            minTime: startTime
          }"
        ></el-time-select>
      </el-col>

      <el-col :span="1" :offset="3">
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
                <span
                  :class="[item.endTime < new Date().getHours() + '-' +  new Date().getMinutes()?express:'']"
                >{{item.title}}&nbsp;&nbsp;({{item.startTime}} ~ {{item.endTime}})</span>
                <span class="incoInfo">
                  <i class="el-icon-check" @click="completed(item,index)"></i>
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
                <s>{{item.title}}&nbsp;&nbsp;({{item.startTime}} ~ {{item.endTime}})</s>
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
      list: [],
      startTime: "",
      endTime: "",
      express: "express"
    };
  },
  methods: {
    addData() {
      if (this.data == "") {
        this.$message.error("请输入代码事项");
        return false;
      }

      if (this.startTime == "") {
        this.$message.error("请选择开始时间");
        return false;
      }

      if (this.endTime == "") {
        this.$message.error("请选择结束时间");
        return false;
      }
      this.list.push({
        title: this.data,
        checked: false,
        startTime: this.startTime,
        endTime: this.endTime
      });
      storage.set("list", this.list);
      this.$message({ message: "添加成功", type: "success" });
      this.data = "";
      this.startTime = "";
      this.endTime = "";
    },
    completed(item, key) {
      item.checked = true;
      storage.set("list", this.list);
    },
    removeData(item, key) {
      this.list.splice(key, 1);
      storage.remove("list", key);
    }
    // calc(item) {
    //   if (item.endTime > new Date()) {
    //     return;
    //   }
    // }
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
  cursor: pointer;
}

.express {
  color: red;
}
</style>
