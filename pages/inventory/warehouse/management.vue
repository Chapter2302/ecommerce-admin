<template>
    <div class="wrapper">
        <div class="d-flex justify-space-between relative mt-3">
            <div>
                <v-btn color="primary">
                    Bộ lọc
                    <v-icon small right>mdi-filter</v-icon>
                </v-btn>
            </div>
        </div>

        <!--Advance filter-->
        <div class="d-flex">
            <v-text-field
                class="col-md-3"
                label="Tìm kiếm"
                color="primary"
                append-icon="mdi-magnify"
            >
            </v-text-field>
            <v-select
                class="col-md-3"
                :items="['District 1', 'Binh Thanh', 'Phu Nhuan', 'Thu Duc']"
                item-text="name"
                item-value="value"
                hide-details
                label="District"
            ></v-select>
            <v-select
                class="col-md-3"
                :items="['Ho Chi Minh']"
                item-text="name"
                item-value="value"
                hide-details
                label="City"
            ></v-select>
            <v-select
                class="col-md-3"
                :items="['Vietnam']"
                item-text="name"
                item-value="value"
                hide-details
                label="Country"
                clearable
            ></v-select>
        </div>
        <!-- end filter -->

        <v-simple-table class="mt-5">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left" v-for="(title, index) in headers" :key="title + '_' + index">{{ title }}</th>
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
                            Warehouse_One
                        </td>
                        <td class="py-4">
                            Test Warehouse
                        </td>
                        <td class="py-4">
                            123 Street
                        </td>
                        <td class="py-4">
                            1
                        </td>
                        <td class="py-4">
                            Ho Chi Minh
                        </td>
                        <td class="py-4">
                            Vietnam
                        </td>
                        <td class="py-4">
                            <v-btn
                                class="ml-2" 
                                color="primary" dark :to="`/inventory/warehouse/warehouse_1`"
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
            isLoading: false,
            headers: [
                "Code",
                "Name",
                "Address",
                "District",
                "City",
                "Country",
                "Action"
            ]
        }
    }   
}
</script>