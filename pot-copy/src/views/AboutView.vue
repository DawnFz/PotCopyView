<template>
  <div class="about-container">
    <div class="about-title">PotCopy 使用须知</div>
    <div style="border: #5cbe92 1px solid"></div>
    <div class="about-body">
      <div class="about-body-one">关于此站</div>
      <div class="about-body-two">PotCopy 为开源项目，用于提供原神尘歌壶爱好者的摹本分享及查找，
        本网站所提供的摹本数据均为玩家自行上传，如有侵权请联系邮箱 <span style="color: #79bbff;font-weight: bold">
          [admin@dawnfz.com]</span> ，我们会及时核实并处理</div>
      <div style="border: #5cbe92 1px solid"></div>
      <div class="about-body-one">开源地址</div>
      <div class="about-body-two">PotCopy.Api: <a href="https://github.com/DawnFz/PotCopyApi/">https://github.com/DawnFz/PotCopyApi/</a></div>
      <div class="about-body-two">PotCopy.Vite: <a href="https://github.com/DawnFz/PotCopyView/">https://github.com/DawnFz/PotCopyView/</a></div>
      <div class="about-body-two">喜欢或者觉得不错的话给个小小的 Star 吧！你的支持是我们最大的动力</div>
    </div>
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss">
.about-container{
  padding: 25px;
  border-radius: 25px;
  box-shadow: 1px 2px 6px 4px rgba(0,0,0,.2);
  transition: 0.5s;
  .about-title{
    text-align: center;
    color: #42b983;
    margin-bottom: 25px;
    font-size: 32px;
    font-weight: bold;
  }
  .about-body{
    margin-top: 15px;
    color: #42b983;
    .about-body-one{
      margin-top: 15px;
      font-size: 22px;
    }
    .about-body-two{
      margin: 20px auto;
      a{
        color: #2b815a;
      }
    }
  }
}

/* pc */
@media screen and (min-width: 992px) {
  .about-container {
    margin: 130px auto;
    width: 50%;
    transition: 0.5s;
  }
}

/* pad */
@media screen and (min-width: 768px) and (max-width: 991px) {
  .about-container {
    margin: 60px auto;
    width: 75%;
    transition: 0.5s;
  }
}

/* mobile */
@media screen and (max-width: 767px) {
  .about-container {
    margin: 60px auto;
    width: 75%;
    transition: 0.5s;
  }
}
</style>
