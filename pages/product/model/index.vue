<template>
    <div class="wrapper px-4">
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
            max-width="500" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Model Creator
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row class="mt-1">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Code" dense
                                :rules="[rules.textField('Code')]"
                                color="primary"
                                v-model="modelActionDialogInfo.creatorCode"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Name"
                                :rules="[rules.textField('Name')]"
                                color="primary" dense
                                v-model="modelActionDialogInfo.creatorName"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Style" dense :rules="[rules.select('Style')]"
                                color="primary" :items="styleList"
                                v-model="modelActionDialogInfo.creatorStyle"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Category" dense :rules="[rules.select('Category')]"
                                color="primary" :items="categoryList"
                                v-model="modelActionDialogInfo.creatorCategory"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-alert
                                dense type="success"
                                v-model="modelActionDialogInfo.creatorSuccessAlert"
                            >Crreate success</v-alert>
                            <v-alert
                                dense type="error"
                                v-model="modelActionDialogInfo.creatorErrorAlert"
                            >Something wrong! Please try later</v-alert>
                        </v-col>
                    </v-row>
                    <v-row cols="12" sm="4" class="mb-1 d-flex justify-center justify-md-end align-center">
                        <v-btn color="primary" class="mr-2" small @click="creatorDialog = false">
                            Close
                        </v-btn>
                        <v-btn color="primary" small @click="createModel()">
                            Create
                        </v-btn>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- CreateDialog -->

        <!-- Delete Dialog -->
        <v-dialog max-width="340" v-model="deleteDialog" >
            <v-card class="py-4">
                <v-card-title class="d-flex justify-center">Do you want to delete?</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-alert
                                dense type="success"
                                v-model="deleteSuccessAlert"
                            >Delete success</v-alert>
                            <v-alert
                                dense type="error"
                                v-model="deleteErrorAlert"
                            >Something wrong! Please try later</v-alert>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="d-flex justify-center ">
                    <v-btn color="primary" class="mr-2" @click="deleteDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" @click="deleteModel()">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Delete Dialog -->

        <!-- Model Table -->
        <v-data-table
            :headers="modelTableHeaders"
            :items="modelTableItems"
            :single-select="false" class="mt-8"
            item-key="code" show-select
        >

            <!-- 3 Actions Buttons -->
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon :to="`/product/model/${item.id}`"
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
                            small icon :to="`/product/model/${item.id}`"
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
                            small icon @click="openDeleteDialog(item)"
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
        <!-- Model Table -->
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
            deleteDialog: false,
            deleteSuccessAlert: false,
            deleteErrorAlert: false,
            modelActionDialogInfo: {
                creatorId: "",
                creatorCode: "",
                creatorName: "",
                creatorStyle: "",
                creatorCategory: "",
                creatorSuccessAlert: false,
                creatorErrorAlert: false
            },
            styleList: [],
            categoryList: [],
            sizeList: [],
            colorList: [],
            modelTableHeaders: [
                { text: "Code", sortable: false, value: 'code' },
                { text: 'Name', value: 'name' },
                { text: 'Style', value: 'attributes.style' },
                { text: 'Category', value: 'attributes.category' },
                { text: 'Variant Level', value: 'variant_levels' },
                { text: 'Active', value: 'is_active' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            modelTableItems: []
        }
    },
    async created() {
        this.fetchModelList()
        this.fetchAttributesLists()
    },
    methods: {
        async fetchModelList() {
            this.isLoading = true

            await this.$store.dispatch("getModelList", {
                onSuccess: async models => {
                    this.modelTableItems = models
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
                            case "style": 
                                this.styleList = item.value
                                break
                            case "category":
                                this.categoryList = item.value
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
        openCreatorDialog() {
            this.modelActionDialogInfo.createtorSuccessAlert = false
            this.modelActionDialogInfo.createtorErrorAlert = false
            this.creatorDialog = true
        },
        openDeleteDialog(item) {
            this.deleteSuccessAlert = false
            this.deleteErrorAlert = false
            this.modelActionDialogInfo.creatorId = item.id
            this.deleteDialog = true
        },
        createModel() {
            const data = {
                code: this.modelActionDialogInfo.creatorCode,
                name: this.modelActionDialogInfo.creatorName,
                attributes: {
                    style: this.modelActionDialogInfo.creatorStyle,
                    category: this.modelActionDialogInfo.creatorCategory
                }
            }
            console.log("create: ", data)

            this.$store.dispatch("createModel", {
                data,
                onSuccess: async data => {
                    this.modelActionDialogInfo.creatorSuccessAlert = true
                    this.fetchModelList()
                },
                onError: async data => {
                    console.log('model create error: ', data)
                    this.modelActionDialogInfo.creatorErrorAlert = true
                }
            })
        },
        deleteModel() {
            const modelId = this.modelActionDialogInfo.creatorId
            this.$store.dispatch("deleteModel", {
                modelId,
                onSuccess: async data => {
                    console.log(data)
                    this.deleteSuccessAlert = true
                    this.fetchModelList()
                },
                onError: async data => {
                    console.log('model create error: ', data)
                    this.deleteErrorAlert = true
                }
            })
        },
    }   
}
</script>