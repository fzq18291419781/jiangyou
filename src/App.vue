<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
img[lazy="loading"]{
  display:block;
  width:8rem;
  height:8rem;
  margin:auto;
  -webkit-animation: loading 1s linear infinite;
          animation: loading 1s linear infinite;
}
@-webkit-keyframes loading{
  0%{
    -webkit-transform: rotate(0);
            transform: rotate(0); 
  }
  100%{
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); 
  }
}
@keyframes loading{
  0%{
    -webkit-transform: rotate(0);
            transform: rotate(0); 
  }
  100%{
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); 
  }
}
</style>