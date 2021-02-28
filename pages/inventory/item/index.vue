<template>
    <div class="wrapper">
        <!-- Stock Dialog -->
        <v-dialog
            v-model="stockDialog" max-width="600"
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Stock Of Item
                </v-card-title>

                <v-data-table
                    :headers="inventoryItemTableHeaders"
                    :single-select="false" class="mt-8" show-select
                ></v-data-table>
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
                            color="primary" @click="stockDialog = true"
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
                            class="mx-1" @click="openEditorDialog(item)"
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
            inventoryItemActionDialogInfo: {
                editorName: "",
                creatorName: ""
            },
            stockTableHeaders: [
                "Warehouse 1",
                "Warehouse 2",
                "Warehouse 3"
            ],
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
        }
    }   
}
</script>