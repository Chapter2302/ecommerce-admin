<template>
    <div class="wrapper">
        <v-dialog
            v-model="stockDialog" max-width="600"
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Stock Table
                </v-card-title>
                <v-simple-table class="mt-5">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left" v-for="(title, index) in stockTableHeaders" :key="title + '_' + index">{{ title }}</th>
                            </tr>
                        </thead>
                        <tbody v-if="isLoading">
                            <tr>
                                <td colspan="12">
                                    <v-skeleton-loader type="table-tbody, table-row-divider@12"></v-skeleton-loader>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="!isLoading">
                            <tr>
                                <td class="py-4">
                                    2
                                </td>
                                <td class="py-4">
                                    10
                                </td>
                                <td class="py-4">
                                    15
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-dialog>
        <div class="d-flex justify-space-between relative mt-3">
            <div>
                <v-btn color="primary">
                    Bộ lọc
                    <v-icon small right>mdi-filter</v-icon>
                </v-btn>
            </div>
            <div class="d-flex align-center">
                <v-text-field
                    class="mr-3 mt-0 pt-0"
                    style="width: 250px"
                    label="Tìm kiếm"
                    color="primary"
                    append-icon="mdi-magnify"
                >
                </v-text-field>
            </div>
        </div>
        <v-simple-table class="mt-5">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left" v-for="(title, index) in itemsTableHeaders" :key="title + '_' + index">{{ title }}</th>
                    </tr>
                </thead>
                <tbody v-if="isLoading">
                    <tr>
                        <td colspan="12">
                            <v-skeleton-loader type="table-tbody, table-row-divider@12"></v-skeleton-loader>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!isLoading">
                    <tr>
                        <td class="py-4">
                            test_item_2
                        </td>
                        <td class="py-4">
                            Item Test 2
                        </td>
                        <td class="py-4">
                            <v-btn
                                class="ml-2" elevation="2" 
                                color="primary" nuxt dark
                                @click="stockDialog = !stockDialog"
                            >Show</v-btn>
                        </td>
                        <td class="py-4">
                            <v-btn
                                class="ml-2" elevation="2" 
                                color="primary" nuxt dark
                            >Detail</v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            stockDialog: false,
            isLoading: false,
            stockTableHeaders: [
                "Warehouse 1",
                "Warehouse 2",
                "Warehouse 3"
            ],
            itemsTableHeaders: [
                "Code",
                "Name",
                "Stock",
                "Action"
            ],
        }
    }   
}
</script>