<template>
    <div class="container">
        <h3>Timeline 组件</h3>
        <hr>
        <d-timeline>
            <d-timeline-item>
                <d-icon slot="point" name="person" class="custom-point"></d-icon>
                <strong>Tt</strong>
                <div>历史timeline</div>
                <div>历史timeline</div>
                <div>历史timeline</div>
            </d-timeline-item>
            <d-timeline-item>
                <strong>Tt</strong>
                <div>历史timeline</div>
                <div>历史timeline</div>
                <div>历史timeline</div>
            </d-timeline-item>
            <d-timeline-item>
                <strong>Tt</strong>
                <div>历史timeline</div>
                <div>历史timeline</div>
                <div>历史timeline</div>
            </d-timeline-item>
            <d-timeline-item>
                <strong>Tt</strong>
                <div>历史timeline</div>
                <div>历史timeline</div>
                <div>历史timeline</div>
            </d-timeline-item>
        </d-timeline>
    </div>
</template>

<script>
export default {

}
</script>
<style scoped>
.custom-point{
    position:absolute; 
    transform: translateX(-50%);
    font-size: 26px;
    top: -14px;
}
</style>

