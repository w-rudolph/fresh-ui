<template>
    <table class="d-table__footer" v-show="false">
        <tr>
            <td>
                Todo
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    name: 'DTableFooter',
    props: {
        store: {
            type: Object,
            default() {
                return []
            }
        },
    },
    data() {
        return {

        }
    }
}
</script>
