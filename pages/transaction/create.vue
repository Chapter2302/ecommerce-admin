<template>
    <div class="wrapper">
        <v-dialog 
            v-model="searchResultDialog"
            max-width="600px"
        >
            <v-card>
                <v-toolbar
                    color="primary"
                    dark
                >
                    <v-toolbar-title>Search Result</v-toolbar-title>
                </v-toolbar>
                <v-list dense>
                    <v-list-item v-for="index in 3" :key="index">
                        <div class="row py-2">
                            <div class="col-12 col-sm-4">
                                <v-img
                                    class="mx-auto"
                                    max-height="180"
                                    max-width="250"
                                    :src="defaultImg"
                                ></v-img>
                            </div>
                            <div class="d-flex justify-space-around justify-md-space-between col-12 col-sm-8">
                                <div>
                                    <div><small><b>Name:</b> Test Name (Example)</small></div>
                                    <div><small><b>SKU:</b> 12329741892130</small></div>
                                    <div><small><b>Warehouse:</b> Warehouse 1</small></div>
                                    <div>
                                        <div class="quantity-input-container d-flex mt-2">
                                            <div class="d-flex align-center quantity-btn quantity-minus-btn col-3 py-0">
                                                <i class="fas fa-minus"></i>
                                            </div>
                                            <div class="quantity-inp-wrapper col-6 py-0 px-0">
                                                <input type="number" value="0"/>
                                            </div>
                                            <div class="d-flex align-center quantity-btn quantity-plus-btn col-3 py-0">
                                                <i class="fas fa-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <v-checkbox></v-checkbox>
                                </div>
                            </div>
                        </div>
                    </v-list-item>
                </v-list>
                <div class="d-flex py-4 px-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        class="mr-2" color="primary" @click="clickSearchResultAddBtn"
                    >
                        Add
                    </v-btn>
                    <v-btn
                        color="primary" @click="toggleSearchResultDialog"
                    >
                        Cancel
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
        <v-card>
            <v-card-title class="headline primary white--text">
                Transaction Information
            </v-card-title>
            <v-card-text class="pt-4">
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="Customer Name" required
                            color="primary"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-text-field
                            label="Address"
                            color="primary"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="col-12 col-md-4">
                        <v-text-field
                            label="Find Product" placeholder="Text or SKU"
                            color="primary" type="text"
                        >
                            <template v-slot:append>
                                <v-btn color="primary" small @click="toggleSearchResultDialog">
                                    Search
                                </v-btn>
                            </template>
                        </v-text-field>
                    </v-col> 
                    <v-col class="col-12 col-md-4">
                        <v-text-field
                            label="Phone Number" required
                            color="primary" type="number"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col class="col-12 col-md-4">
                        <v-select
                            :items="['Giao Hàng Tiết Kiệm']"
                            label="Delivery"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-data-table
                            :headers="productsTableHeaders"
                            :items="productsTableItems"
                            :single-select="singleSelect"
                            item-key="name" dense
                            show-select
                        >
                            <template v-slot:item.image="{ item }">
                                <img
                                    class="py-2"
                                    style="max-width: 80px"
                                    :src="item.image"
                                />
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
                <v-row justify="end" class="py-4">
                    <v-btn
                        color="primary"
                        class="mx-4"
                    >
                        Submit
                    </v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return { 
            singleSelect: false,
            selectedProduct: [],
            addedProducts: [],
            searchResultDialog: false,
            defaultImg: "https://otoday.vn/wp-content/themes/ws247/assets/images/default-thumbnail.jpg",
            productsTableHeaders: [
                {
                    text: 'SKU',
                    sortable: false,
                    value: 'sku',
                },
                { text: 'Image', value: 'image', sortable: false },
                { text: 'Name', value: 'name' },
                { text: 'Quantity', value: 'quantity' }
            ],
            productsTableItems: [
                {
                    sku: "0123987654321",
                    image: "https://otoday.vn/wp-content/themes/ws247/assets/images/default-thumbnail.jpg",
                    name: "Test Name 1 (Example)",
                    quantity: 10
                },
                {
                    sku: "0123987654321",
                    image: "https://otoday.vn/wp-content/themes/ws247/assets/images/default-thumbnail.jpg",
                    name: "Test Name 2 (Example)",
                    quantity: 10
                },
                {
                    sku: "0123987654321",
                    image: "https://otoday.vn/wp-content/themes/ws247/assets/images/default-thumbnail.jpg",
                    name: "Test Name 3 (Example)",
                    quantity: 10
                }
            ]
        } 
    },
    methods: {
        clickSearchResultSelectBtn() {

        },
        clickSearchResultAddBtn() {
            this.searchResultDialog = !this.searchResultDialog
        },
        toggleSearchResultDialog() {
            this.searchResultDialog = !this.searchResultDialog
        }
    }
}
</script>

<style>
input[type="number"] {
  -webkit-appearance: textfield;
     -moz-appearance: textfield;
          appearance: textfield;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
}

.quantity-btn {
    background-color: var(--v-primary-base);
    color: white;
    font-size: smaller;
    cursor: pointer;
}

.quantity-btn:hover {
    background-color: var(--v-primary-lighten2);
}

.quantity-minus-btn {
    border-radius: 5px 0px 0px 5px;
}

.quantity-plus-btn {
    border-radius: 0px 5px 5px 0px;
}

.quantity-inp-wrapper {
    max-width: 50px;
    border-top: 1px solid var(--v-primary-base);
    border-bottom: 1px solid var(--v-primary-base);
}

.quantity-inp-wrapper input {
    outline: none;
    width: 100%;
    text-align: center;
}
</style>