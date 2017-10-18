<template>
    <div style="padding: 0 20px;">
        <h2>Slider 组件</h2>
        <hr>
        <h4>Basic</h4>
        <d-slider></d-slider>
        <h4>Format tip</h4>
        <d-slider :value="50" style="width:150px" :tip-format="(value) => '' + value + '%'"></d-slider>
        <h4>vertical</h4>
        <d-slider vertical :value="30" style="height: 200px;" disabled></d-slider>
        <h4>Range</h4>
        <d-slider range :value="[11, 21]" style="width:250px"></d-slider>
        <h4>Range vertical</h4>
        <d-slider vertical range :value="[22, 80]" style="height: 200px"></d-slider>
    </div>
</template>
<script>
export default {

}
</script>

