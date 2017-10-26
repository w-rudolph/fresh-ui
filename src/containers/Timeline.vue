<template>
    <div class="container">
        <h3>Timeline 组件</h3>
        <hr>
        <d-timeline>
            <d-timeline-item 
            :line-style="{borderStyle:'dashed', borderColor:'#f00'}" 
            :point-style="{borderColor: '#f00'}">
                <strong>Tt</strong>
                <div>历史timeline</div>
                <div>历史timeline</div>
                <div>历史timeline</div>
            </d-timeline-item>
            <d-timeline-item>
                <d-icon name="home" slot="point" style="font-size: 25px;top: -9px;left: -2.5px;position: relative;background: #fff;"></d-icon>
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

