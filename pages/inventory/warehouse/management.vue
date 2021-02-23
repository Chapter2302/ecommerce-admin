<template>
    <div class="wrapper">
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

        <!--Advance filter-->
        <div class="d-flex justify-space-around">
            <v-select
                style="max-width: 250px"
                :items="['a', 'b']"
                item-text="name"
                item-value="value"
                hide-details
                label="District"
            ></v-select>
            <v-select
                style="max-width: 250px"
                :items="['a', 'b']"
                item-text="name"
                item-value="value"
                hide-details
                label="City"
            ></v-select>
            <v-select
                style="max-width: 250px"
                :items="['a', 'b']"
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
            isLoading: false,
            headers: [
                "Name",
                "Address",
                "District",
                "City",
                "Country",
                "Action"
            ],
        }
    }   
}
</script>