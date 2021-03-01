<template>
    <div class="wrapper">
        <div class="d-flex justify-space-between mt-3">
            <v-btn color="primary">
                Filter
                <v-icon small right>mdi-filter</v-icon>
            </v-btn>
            <v-btn color="primary" @click="openCreatorDialog()">
                Create
                <v-icon small right>fas fa-plus</v-icon>
            </v-btn>
        </div>

        <!-- CreatorDialog -->
        <v-dialog 
            v-model="creatorDialog"
            max-width="600" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Attribute Creator
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="warehouseActionDialogInfo.creatorName"
                                label="Name"
                                :rules="[rules.textField('Name')]"
                                color="primary"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8">
                            <v-text-field
                                v-model="warehouseActionDialogInfo.creatorAddress"
                                label="Address"
                                color="primary"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-select
                                :items="['1', '2', 'Binh Thanh', 'Phu Nhuan']"
                                hide-details v-model="warehouseActionDialogInfo.creatorDistrict"
                                label="District" 
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-select
                                :items="citiesList" v-model="warehouseActionDialogInfo.creatorCity"
                                item-text="cityName"  item-value="cityCode"
                                hide-details 
                                label="City"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" class="d-flex justify-center justify-md-end align-center">
                            <v-btn color="primary" class="mr-2" small @click="creatorDialog = false">
                                Close
                            </v-btn>
                            <v-btn color="primary" small @click="createWarehouse()">
                                Create
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- CreateDialog -->

        <!-- EditorDialog -->
        <v-dialog 
            v-model="editorDialog"
            max-width="600" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Warehouse Editor
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="warehouseActionDialogInfo.editorName"
                                label="Name"
                                :rules="[rules.textField('Name')]"
                                color="primary"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8">
                            <v-text-field
                                v-model="warehouseActionDialogInfo.editorAddress"
                                label="Address"
                                color="primary"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-select
                                :items="['1', '2', 'Binh Thanh', 'Phu Nhuan']"
                                hide-details v-model="warehouseActionDialogInfo.editorDistrict"
                                label="District"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-select
                                :items="citiesList" v-model="warehouseActionDialogInfo.editorCity"
                                item-text="cityName"  item-value="cityCode"
                                hide-details
                                label="City"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" class="d-flex justify-center justify-md-end align-center">
                            <v-btn color="primary" class="mr-2" small @click="editorDialog = false">
                                Close
                            </v-btn>
                            <v-btn color="primary" small @click="updateWarehouse()">
                                Update
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- EditorDialog -->

        <!--Advance filter-->
        <div class="d-none">
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
        <!--Advance filter-->

        <!-- Attribute Table -->
        <v-data-table
            :headers="attributeTableHeaders"
            :items="attributeTableItems"
            :single-select="false" class="mt-8"
            item-key="code" show-select
        >
            <!-- 3 Actions Buttons -->
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon 
                            class="mx-1" 
                            color="primary"
                            v-on="on" v-bind="attrs"
                        >
                            <v-icon small>
                                fas fa-info
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Detail</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon @click="openEditorDialog(item)"
                            class="mx-1" 
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
        <!-- Attribute Table -->
    </div> 
</template>

<script>
import rules from "@/mixins/validationRules";
export default {
    mixins: [rules],
    data() {
        return {
            isLoading: false,
            creatorDialog: false,
            editorDialog: false,
            attributeActionDialogInfo: { 
                creatorType: "",
                editorType: "",
                creatorName: "",
                editorName: "",
                creatorKey: "",
                editorKey: "",
                creatorValue: [],
                editorValue: []
            },
            attributeTableHeaders: [
                { text: "Type", value: 'type' },
                { text: 'Name', value: 'name' },
                { text: 'Key', value: 'key' },
                { text: 'Value', value: 'value' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            attributeTableItems: []
        }
    },
    async created() {
        this.fetchAttributeList()
    },
    methods: {
        async fetchAttributeList() {
            this.isLoading = true;
            await this.$store.dispatch("getAttributeList", {
                onSuccess: async data => {
                    this.attributeTableItems = data
                },
                onError: async data => {
                    console.log('attribute fetch error: ', data)
                }
            })
        },
        createWarehouse() {
            console.log("create: ", {
            })
        },
        updateWarehouse() {
            console.log("update: ", {
            })
        },
        openCreatorDialog() {
            this.creatorDialog = true
        },
        openEditorDialog(item) {
            this.editorDialog = true
            this.attributeActionDialogInfo.editorName = item.name
            this.attributeActionDialogInfo.editorType = item.type
            this.attributeActionDialogInfo.editorKey = item.key
            this.attributeActionDialogInfo.editorValue = item.value
        }
    }   
}
</script>