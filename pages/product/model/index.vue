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

        <!-- EditorDialog -->
        <v-dialog 
            v-model="editorDialog"
            max-width="500" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Model Editor
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row class="mt-1">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Code" dense
                                :rules="[rules.textField('Code')]"
                                color="primary"
                                v-model="modelActionDialogInfo.editorCode"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Name"
                                :rules="[rules.textField('Name')]"
                                color="primary" dense
                                v-model="modelActionDialogInfo.editorName"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Style" dense
                                color="primary" :items="styleList"
                                v-model="modelActionDialogInfo.editorStyle"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Category" dense
                                color="primary" :items="categoryList"
                                v-model="modelActionDialogInfo.editorCategory"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row cols="12" sm="4" class="mb-1 d-flex justify-center justify-md-end align-center">
                        <v-btn color="primary" class="mr-2" small @click="editorDialog = false">
                            Close
                        </v-btn>
                        <v-btn color="primary" small @click="updateModel()">
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
            editorDialog: false,
            deleteDialog: false,
            modelActionDialogInfo: {
                creatorCode: "",
                editorCode: "",
                creatorName: "",
                editorName: "",
                creatorStyle: "",
                editorStyle: "",
                creatorCategory: "",
                editorCategory: ""
            },
            styleList: [],
            categoryList: [],
            modelTableHeaders: [
                { text: "Code", sortable: false, value: 'code' },
                { text: 'Name', value: 'name' },
                { text: 'Style', value: 'attributes.style' },
                { text: 'Category', value: 'attributes.category' },
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
            this.isLoading = true;
            await this.$store.dispatch("getModelList", {
                onSuccess: async data => {
                    this.modelTableItems = data
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
        createModel() {
            console.log("create: ", {
                code: "", 
                name: this.modelActionDialogInfo.creatorName,
            })
        },
        updateModel() {
            console.log("update: ", {
                code: "", 
                name: this.modelActionDialogInfo.editorName, 
            })
        },
        openCreatorDialog() {
            this.creatorDialog = true
        },
        openEditorDialog(item) {
            this.editorDialog = true
            this.modelActionDialogInfo.editorCode = item.code
            this.modelActionDialogInfo.editorName = item.name
            this.modelActionDialogInfo.editorStyle = item.attributes.style
            this.modelActionDialogInfo.editorCategory = item.attributes.category
        },
        openDeleteDialog(item) {
            this.deleteDialog = true
        }
    }   
}
</script>