<script>
import Popper from '../popper/popper.vue';

export default {
    name: 'DTooltip',
    mixins: [Popper],
    props: {
        trigger: {
            type: String,
            default: 'hover'
        },
        transition: {
            type: String,
            default: 'tooltip-fade',
        }
    },
    data() {
        return {
            ns: 'tooltip',
        }
    },
}
</script>
