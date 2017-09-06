<template>
    <div class="container">
        <h3>Popper 组件</h3>
        <br>
        <span>
            @placement: 
            <pre>top, right, bottom, left</pre>
            <pre>(top|right|bottom|left)-start</pre>
            <pre>(top|right|bottom|left)-end</pre>

            @trigger:
            <pre>click/hover</pre>

            @hideWhenClickOutside:
            <pre>true/false</pre>
        </span>
        <d-popper :hideWhenClickOutside="true">
            <template slot="content">
                <div>Hello World</div>
            </template>
            <d-button>click</d-button>
        </d-popper><br><br>
        <d-popper trigger="hover" placement="top-start">
            <template slot="content">
                <div>Hello World</div>
            </template>
            <d-button>hover</d-button>
        </d-popper>
        <br><br>
        <d-popper trigger="hover" transition="slide" :show-arrow="true" placement="bottom-end" title="title" content="content here" :appendToBody="true">
            <a>hover me</a>
        </d-popper>
    </div>
</template>
<script>
export default {

}
</script>
