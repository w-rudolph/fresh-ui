<template>
    <div class="d-table__body-wrapper">
        <table class="d-table__body" cellspacing="0" cellpadding="0" border="0">
            <colgroup>
                <col v-for="column in tableColumns" :key="column._uid" :width="column.autoWidth" :name="'d-table__column' + column._uid">
            </colgroup>
            <tr v-for="(row, index) in data" :key="index">
                <td v-for="column in tableColumns" :key="column._uid" :class="['d-table__column' + column._uid]">
                    <div class="d-table__cell">{{row[column.prop]}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'DTableBody',
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        tableColumns: {
            type: Array,
            default() {
                return [];
            }
        },
        tableWidth: {
            type: Number | String,
            default: ''
        }
    },
    data() {
        return {

        }
    }
}
</script>
