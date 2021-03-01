<template>
    <div class="wrapper">
        <!-- Stock Dialog -->
        <v-dialog
            v-model="stockDialog" max-width="600" persistent
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    <span>Stock Of Item</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="closeStockDialog()">
                        <v-icon class="white--text">fas fa-times</v-icon>
                    </v-btn>
                </v-card-title>

                <v-data-table
                    :headers="stockTableHeaders"
                    :single-select="false" class="mt-8"
                    :items="stockTableItem" hide-default-footer
                ></v-data-table>
                <div class="d-flex px-4 py-2 text-xl-h4">
                    <v-spacer></v-spacer>
                    <b>TOTAL:</b> <span class="ml-2">{{inventoryItemActionDialogInfo.detailTotalStock}}</span>
                </div>
            </v-card>
        </v-dialog>
        <!-- Stock Dialog -->

        <!-- Creator Dialog -->
        <v-dialog
            v-model="creatorDialog" max-width="600"
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Item Editor
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Name" v-model="inventoryItemActionDialogInfo.creatorName"
                                color="primary" :rules="[rules.textField('Name')]"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="d-flex justify-center align-center">
                            <v-btn color="primary" class="mr-2" small @click="creatorDialog = false">
                                Close
                            </v-btn>
                            <v-btn color="primary" small @click="createInventoryItem()">
                                Create
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Creator Dialog -->

        <!-- Editor Dialog -->
        <v-dialog
            v-model="editorDialog" max-width="600"
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Item Editor
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Name" v-model="inventoryItemActionDialogInfo.editorName"
                                color="primary" :rules="[rules.textField('Name')]"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="d-flex justify-center align-center">
                            <v-btn color="primary" class="mr-2" small @click="editorDialog = false">
                                Close
                            </v-btn>
                            <v-btn color="primary" small @click="updateInventoryItem()">
                                Update
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Editor Dialog -->
        <div class="d-flex justify-space-between relative mt-3">
            <v-btn color="primary">
                Bộ lọc
                <v-icon small right>mdi-filter</v-icon>
            </v-btn>
            <div class="d-flex">
                <v-btn color="primary" @click="openCreatorDialog()">
                    Create
                    <v-icon small right>fas fa-plus</v-icon>
                </v-btn>
            </div>
        </div>

        <!-- Inventory Item Table -->
        <v-data-table
            :headers="inventoryItemTableHeaders"
            :items="inventoryItemTableItems"
            :single-select="false" class="mt-8"
            item-key="code" show-select
        >
            <!-- 4 Actions Buttons -->
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon 
                            class="mx-1" 
                            color="primary" @click="openItemStockDialog(item.id)"
                            v-on="on" v-bind="attrs"
                        >
                            <v-icon small>
                                fas fa-archive
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Stock Detail</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon
                            class="mx-1" @click="openEditorDialog(item.id)"
                            color="primary"
                            v-on="on" v-bind="attrs"
                        >
                            <v-icon small>
                                fas fa-pen
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Edit</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon 
                            class="mx-1" 
                            color="primary"
                            v-on="on" v-bind="attrs"
                        >
                            <v-icon small>
                                fas fa-trash
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Delete</span>
                </v-tooltip>
            </template>
            <!-- 3 Actions Buttons -->
        </v-data-table>
        <!-- Inventory Items Table -->
    </div> 
</template>

<script>
import rules from "@/mixins/validationRules";
export default {
    mixins: [rules],
    data() {
        return {
            stockDialog: false,
            editorDialog: false,
            creatorDialog: false,
            isLoading: false,
            warehouseList: [],
            stockTableItem: [],
            inventoryItemActionDialogInfo: {
                editorName: "",
                creatorName: "",
                detailTotalStock: 0,
            },
            stockTableHeaders: [],
            inventoryItemTableHeaders: [
                { text: "Code", sortable: false, value: "code" },
                { text: "Name", value: "name" },
                { text: "Last Update", value: "last_updated" },
                { text: "Actions", sortable: false, value: "actions" },
            ],
            inventoryItemTableItems: []
        }
    },
    async created() {
        this.fetchInventoryItemList()
        this.$store.dispatch("getWarehouseList", {
            onSuccess: async data => {
                this.warehouseList = data
                this.stockTableHeaders = data.map(item => {
                    return { text: item.name, value: String(item.code), sortable: false }
                })
                console.log(this.stockTableHeaders)
            },
            onError: async data => {
                console.log('warehouse items fetch error: ', data)
            }
        })
    },
    methods: {
        async fetchInventoryItemList() {
            this.isLoading = true;
            await this.$store.dispatch("getInventoryItemList", {
                onSuccess: async data => {
                    this.inventoryItemTableItems = data.map(item => {
                        const time = new Date(item.last_updated)
                        item.last_updated = `${time.toDateString()} - ${time.toLocaleTimeString()}`
                        return item
                    })
                },
                onError: async data => {
                    console.log('inventory items fetch error: ', data)
                }
            })
        },
        updateInventoryItem() {
            console.log("update: ", {
                editorName: this.inventoryItemActionDialogInfo.editorName,
            })
        },
        createInventoryItem() {
            console.log("create: ", {
                editorName: this.inventoryItemActionDialogInfo.creatorName,
            })
        },
        openEditorDialog(item) {
            this.editorDialog = true
            this.inventoryItemActionDialogInfo.editorName = item.name
        },
        openCreatorDialog() {
            this.creatorDialog = true
        },
        openItemStockDialog(itemId) {
            const stockPromises = this.warehouseList.map(warehouse => {
                return new Promise((resolve) => {
                    const result = {}
                    const data = {
                        beautify: true,
                        warehouse_id: warehouse.id,
                        item_id: itemId
                    }
                    this.$store.dispatch("getInventoryItemStock", {
                        data,
                        onSuccess: async data => {
                            result.warehouseCode = warehouse.code 
                            result.stock = data ? data.stock : 0
                            resolve(result)
                        },
                        onError: async data => {
                            console.log('stock item fetch error: ', data)
                        }
                    })
                })
            })
            Promise.all(stockPromises).then(values => {
                const stockItem = {}
                let totalStock = 0
                values.forEach(value => { 
                    stockItem[value.warehouseCode] = value.stock
                    totalStock += value.stock
                })
                this.stockTableItem.push(stockItem) 
                this.inventoryItemActionDialogInfo.detailTotalStock = totalStock
                this.stockDialog = true
            })
        },
        closeStockDialog() {
            this.stockDialog = false
            this.stockTableItem = []
            this.inventoryItemActionDialogInfo.detailTotalStock = 0
        }
    }   
}
</script>