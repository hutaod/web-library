<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <sidebar class="sidebar-container" />
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <span>
            <i class="el-icon-setting" style="margin-right: 15px"></i>王小虎
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Sidebar from "@/components/sidebar";
import { mapActions } from "vuex";

export default {
  components: {
    Sidebar
  },
  methods: {
    ...mapActions(["user/resetToken"]),
    handleCommand(command) {
      if (command === "logout") {
        this["user/resetToken"]().then(() => {
          this.$router.replace(`/login?redirect=${this.$route.fullPath}`);
        });
      }
    }
  }
};
</script>
