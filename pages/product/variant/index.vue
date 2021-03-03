<template>
    <div class="wrapper px-4">
        <v-row class="mt-3">
            <v-col cols="12" sm="6">
                <v-btn color="primary">
                    Filter
                    <v-icon small right>mdi-filter</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-end">
                <v-btn color="primary" class="mr-2" @click="openCreatorLevelOneDialog()">
                    Create Level 1
                    <v-icon small right>fas fa-plus</v-icon>
                </v-btn>
                <v-btn color="primary" @click="openCreatorLevelTwoDialog()">
                    Create Level 2
                    <v-icon small right>fas fa-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <!-- Creator Level 1 Dialog -->
        <v-dialog 
            v-model="creatorLevelOneDialog"
            max-width="400" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                   Level 1 Variant Creator
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row class="mt-1">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Model ID" dense
                                :rules="[rules.textField('Model ID')]"
                                color="primary"
                                v-model="variantActionDialogInfo.creatorLv1ModelId"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Code" dense
                                :rules="[rules.textField('Code')]"
                                color="primary"
                                v-model="variantActionDialogInfo.creatorLv1Code"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Color" dense :rules="[rules.select('Color')]"
                                color="primary" :items="colorList"
                                v-model="variantActionDialogInfo.creatorColor"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Price" dense :rules="[rules.textField('Price')]"
                                color="primary" type="number"
                                v-model="variantActionDialogInfo.creatorPrice"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row cols="12" sm="4" class="mb-1 d-flex justify-center justify-md-end align-center">
                        <v-btn color="primary" class="mr-2" small @click="creatorLevelOneDialog = false">
                            Close
                        </v-btn>
                        <v-btn color="primary" small @click="createVariant()">
                            Create
                        </v-btn>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Create Level 1 Dialog -->

        <!-- Creator Level 2 Dialog -->
        <v-dialog 
            v-model="creatorLevelTwoDialog"
            max-width="400" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                   Level 2 Variant Creator
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row class="mt-1">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Model ID" dense
                                :rules="[rules.textField('Model ID')]"
                                color="primary"
                                v-model="variantActionDialogInfo.creatorLv2ModelId"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Code" dense
                                :rules="[rules.textField('Code')]"
                                color="primary"
                                v-model="variantActionDialogInfo.creatorLv2Code"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Size" dense :rules="[rules.select('Size')]"
                                color="primary" :items="sizeList"
                                v-model="variantActionDialogInfo.creatorSize"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="SKU" dense
                                color="primary" :rules="[rules.textField('SKU')]"
                                v-model="variantActionDialogInfo.creatorSku"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row cols="12" sm="4" class="mb-1 d-flex justify-center justify-md-end align-center">
                        <v-btn color="primary" class="mr-2" small @click="creatorLevelTwoDialog = false">
                            Close
                        </v-btn>
                        <v-btn color="primary" small @click="createVariant()">
                            Create
                        </v-btn>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Create Level 2 Dialog -->

        <!-- EditorDialog -->
        <v-dialog 
            max-width="500" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Variant Editor
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row class="mt-1">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Code" dense
                                :rules="[rules.textField('Code')]"
                                color="primary"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Name"
                                :rules="[rules.textField('Name')]"
                                color="primary" dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Style" dense
                                color="primary"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Category" dense
                                color="primary"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row cols="12" sm="4" class="mb-1 d-flex justify-center justify-md-end align-center">
                        <v-btn color="primary" class="mr-2" small>
                            Close
                        </v-btn>
                        <v-btn color="primary" small @click="updateVariant()">
                            Update
                        </v-btn>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- EditorDialog -->

        <!-- Delete Dialog -->
        <v-dialog max-width="300" v-model="deleteDialog" >
            <v-card class="py-4">
                <v-card-title class="d-flex justify-center">Do you want to delete?</v-card-title>
                <v-card-actions class="d-flex justify-center ">
                    <v-btn color="primary" class="mr-2" @click="deleteDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="primary">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Delete Dialog -->

        <!-- Lv1 Variant Table -->
        <v-card class="mt-8">
            <v-card-title>
                Variant - Level 1
            </v-card-title>
            <v-data-table
                :headers="levelOnevariantTableHeaders"
                :items="levelOneVariantTableItems"
                :single-select="false"
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
                                small icon @click="openDeleteDialog(item, 1)"
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
        </v-card>
        <!-- Lv1 Variant Table -->

        <!-- Lv2 Variant Table -->
        <v-card class="mt-8">
            <v-card-title>
                Variant - Level 2
            </v-card-title>
            <v-data-table
                :headers="levelTwoVariantTableHeaders"
                :items="levelTwoVariantTableItems"
                :single-select="false"
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
                                small icon @click="openDeleteDialog(item, 2)"
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
        </v-card>
        <!-- Lv2 Variant Table -->
    </div> 
</template>

<script>
import rules from "@/mixins/validationRules";
export default {
    mixins: [rules],
    data() {
        return {
            isLoading: false,
            creatorLevelOneDialog: false,
            creatorLevelTwoDialog: false,
            editorLevelOneDialog: false,
            editorLevelTwoDialog: false,
            deleteDialog: false,
            variantActionDialogInfo: {
                creatorLv1ModelId: "",
                editorLv1ModelId: "",
                creatorLv1Code: "",
                editorLv1Code: "",
                creatorColor: "",
                editorColor: "",
                creatorPrice: 0,
                editorPrice: 0,
                creatorLv2ModelId: "",
                editorLv2ModelId: "",
                creatorLv2Code: "",
                editorLv2Code: "",
                creatorSize: "",
                editorSize: "",
                creatorSku: "",
                editorSku: "",
            },
            sizeList: [],
            colorList: [],
            levelOnevariantTableHeaders: [
                { text: "Model ID", sortable: false, value: "model_id" },
                { text: "Code", sortable: false, value: "code" },
                { text: 'Color', value: 'attributes.color' },
                { text: 'Price', value: 'attributes.price' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            levelTwoVariantTableHeaders: [
                { text: "Model ID", sortable: false, value: "model_id" },
                { text: "Code", sortable: false, value: "code" },
                { text: 'Size', value: 'attributes.size' },
                { text: 'SKU', value: 'attributes.sku' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            levelOneVariantTableItems: [],
            levelTwoVariantTableItems: []
        }
    },
    async created() {
        this.fetchVariantLists()
        this.fetchAttributesLists()
    },
    methods: {
        async fetchVariantLists() {
            this.isLoading = true;
            await this.$store.dispatch("getVariantList", {
                onSuccess: async data => {
                    data.map(variant => {
                        if(variant.level === 1)
                            this.levelOneVariantTableItems.push(variant)
                        else if(variant.level === 2) 
                            this.levelTwoVariantTableItems.push(variant)
                    })
                },
                onError: async data => {
                    console.log('model fetch error: ', data)
                }
            })
        },
        async fetchAttributesLists() {
            this.isLoading = true;
            await this.$store.dispatch("getAttributeList", {
                onSuccess: async data => {
                    data.forEach(item => {
                        switch(item.key) {
                            case "size": 
                                this.sizeList = item.value
                                break
                            case "color":
                                this.colorList = item.value
                                break
                            default:
                                break
                        }
                    })
                },
                onError: async data => {
                    console.log('model attributes error: ', data)
                }
            })
        },
        createVariant() {
            console.log("create: ", {
                code: "", 
            })
        },
        updateVariant() {
            console.log("update: ", {
                code: "", 
            })
        },
        openCreatorLevelOneDialog() {
            this.creatorLevelOneDialog = true
        },
        openCreatorLevelTwoDialog() {
            this.creatorLevelTwoDialog = true
        },
        openEditorDialog(item) {
            // this.editorDialog = true
            // this.variantActionDialogInfo.editorCode = item.code
            // this.variantActionDialogInfo.editorName = item.name
            // this.variantActionDialogInfo.editorStyle = item.attributes.style
            // this.variantActionDialogInfo.editorCategory = item.attributes.category
        },
        openDeleteDialog(item, level) {
            this.deleteDialog = true
        }
    }   
}
</script>