<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="edit_title">文章内容 (Markdown编辑器)</div>
    <div class="markdown">
      <mavon-editor v-model="content" />
    </div>
    <div class="save_btn">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save() {
      if (this.$route.params.id) {
        this.$axios
          .post('/api/article/update', {
            title: this.title,
            content: this.content,
            article_id: this.$route.params.id,
          })
          .then((res) => {
            if (res.data.code === 0) {
              this.$message({
                message: '更新成功',
                type: 'success',
              });
              setTimeout(() => {
                this.$router.push({ name: 'article' });
              }, 1500);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.$axios
          .post('/api/article/add', {
            title: this.title,
            content: this.content,
          })
          .then((res) => {
            if (res.data.code === 0) {
              this.$message({
                message: '新增成功',
                type: 'success',
              });
              setTimeout(() => {
                this.$router.push({ name: 'article' });
              }, 1500);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getDetail() {
      this.$axios
        .get('/api/article/detail', {
          params: {
            article_id: this.$route.params.id,
          },
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.title = res.data.data.title;
            this.content = res.data.data.content;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getDetail();
    }
  },
};
</script>

<style lang="scss" scoped>
.edit_wrap {
  margin: 30px auto;
  background: #fff;
  padding: 40px;
  font-size: 16px;
  .backBtn {
    text-align: right;
    margin-bottom: 40px;
  }
  .edit_title {
    margin: 20px 0;
    font-weight: 700;
  }
  .save_btn {
    margin: 40px 0;
  }
}
</style>
