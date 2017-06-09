<template>
    <!--
    <div id="header">
        <h1><a href="http://localhost:3000/home"><i class="icon-home"></i>主页</a></h1>
        <h1><a v-link="'#/index'"><i class="icon-pencil"></i>&nbsp;课堂测试</a></h1>
    </div>
    -->
</template>
<script>
</script>
<style lang="less">
    @import '../color.less';

    body {
            padding: 15px;
        }

    #header{
        width: 100%;
        height: 0.4rem;
        background-color: black;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
        h1{
            font-size: 0.22rem;
            font-weight: bold;
            margin-left: 0.22rem;
            a{
                color: #fff;
            }
        }
        
        
        h2{
            font-size: 0.18rem;
            font-weight: normal;
            margin-left: 0.25rem;
        }
    }
</style>