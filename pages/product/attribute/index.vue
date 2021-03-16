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
            max-width="400" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Attribute Creator
                </v-card-title>
                <v-card-text class="pt-4">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Type" v-model="attributeActionDialogInfo.creatorType"
                                :rules="[rules.select('Type')]" :items="typeList"
                                color="primary" dense
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="attributeActionDialogInfo.creatorKey"
                                label="Key" dense
                                color="primary"
                                :rules="[rules.textField('Key')]"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="attributeActionDialogInfo.creatorName"
                                label="Name" dense
                                color="primary"
                                :rules="[rules.textField('Name')]"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-card>
                                <v-card-title>
                                    Value List
                                </v-card-title>
                                <v-data-table 
                                    height="90px" class="elevation-1"
                                    :headers="[
                                        { text: 'Value List', value: 'value', sortable: false },
                                        { text: '', value: 'action', sortable: false },
                                    ]"
                                    :items="attributeActionDialogInfo.creatorValues"
                                    hide-default-header
                                    hide-default-footer dense
                                >
                                    <template v-slot:item.action="{ item }">
                                        <v-btn 
                                            small icon @click="deleteCreatorAttributeItem(item.value)"
                                            class="mx-1" color="primary"
                                        >
                                            <v-icon small>
                                                fas fa-trash
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <template v-slot:item.value="{ item, index }">
                                        <v-text-field 
                                            v-model="item.value" dense @change="onCreatorValueChange(item.value, index)"
                                        ></v-text-field>
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-row class="mt-1">
                                <v-col cols="8">
                                    <v-text-field label="New Value"
                                    v-model="attributeActionDialogInfo.newCreatorValue"></v-text-field>
                                </v-col>
                                <v-col class="d-flex justify-center align-center px-0" cols="4">
                                    <v-btn 
                                        block small 
                                        color="primary"
                                        @click="addNewCreatorValue()"
                                    >Add</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-alert
                                        dense type="success"
                                        v-model="attributeActionDialogInfo.creatorSuccessAlert"
                                    >Crreate success</v-alert>
                                    <v-alert
                                        dense type="error"
                                        v-model="attributeActionDialogInfo.creatorErrorAlert"
                                    >Something wrong! Please try later</v-alert>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-col cols="4" class="px-0">
                                    <v-btn color="primary" block small @click="creatorDialog = false">
                                        Close
                                    </v-btn>
                                </v-col>
                                <v-col cols="4" class="px-0 ml-2">
                                    <v-btn color="primary" block small @click="createAttribute()">
                                        Create
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- CreateDialog -->

        <!-- EditorDialog -->
        <v-dialog 
            v-model="editorDialog"
            max-width="400" 
        >
            <v-card>
                <v-card-title class="headline primary white--text">
                    Attribute Editor
                </v-card-title>
                <v-card-text>
                    <v-row class="mt-4">
                        <v-col cols="12" sm="6">
                            <v-select
                                label="Type" v-model="attributeActionDialogInfo.editorType"
                                :rules="[rules.select('Type')]" :items="typeList"
                                color="primary" dense
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Key" dense
                                color="primary" v-model="attributeActionDialogInfo.editorKey"
                                :rules="[rules.textField('Key')]"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Name" dense
                                color="primary" v-model="attributeActionDialogInfo.editorName"
                                :rules="[rules.textField('Name')]"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-card>
                                <v-card-title>
                                    Value List
                                </v-card-title>
                                <v-data-table 
                                    height="90px" class="elevation-1"
                                    :headers="[
                                        { text: 'Value List', value: 'value', sortable: false },
                                        { text: '', value: 'action', sortable: false }
                                    ]"
                                    :items="attributeActionDialogInfo.editorValues"
                                    hide-default-header
                                    hide-default-footer dense
                                >
                                    <template v-slot:item.action="{ item }">
                                        <v-btn 
                                            small icon @click="deleteEditorAttributeItem(item.value)"
                                            class="mx-1" color="primary"
                                        >
                                            <v-icon small>
                                                fas fa-trash
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <template v-slot:item.value="{ item, index }">
                                        <v-text-field 
                                            v-model="item.value" dense @change="onEditorValueChange(item.value, index)"
                                        ></v-text-field>
                                    </template>
                                </v-data-table>
                            </v-card>
                            <v-row class="mt-1">
                                <v-col cols="8">
                                    <v-text-field label="New Value" dense
                                    v-model="attributeActionDialogInfo.newEditorValue"></v-text-field>
                                </v-col>
                                <v-col class="d-flex justify-center align-center px-0" cols="4">
                                    <v-btn 
                                        block small 
                                        color="primary"
                                        @click="addNewEditorValue()"
                                    >Add</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-alert
                                        dense type="success"
                                        v-model="attributeActionDialogInfo.editorSuccessAlert"
                                    >Update success</v-alert>
                                    <v-alert
                                        dense type="error"
                                        v-model="attributeActionDialogInfo.editorErrorAlert"
                                    >Something wrong! Please try later</v-alert>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-col cols="4" class="px-0">
                                    <v-btn color="primary" block small @click="editorDialog = false">
                                        Close
                                    </v-btn>
                                </v-col>
                                <v-col cols="4" class="px-0 ml-2">
                                    <v-btn color="primary" block small @click="updateAttribute()">
                                        Update
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- EditorDialog -->

        <!-- Delete Dialog -->
        <v-dialog max-width="300" v-model="deleteDialog" >
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
                    <v-btn color="primary" @click="deleteAttribute()">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Delete Dialog -->

        <!-- Attribute Table -->
        <v-data-table
            :headers="attributeTableHeaders"
            :items="attributeTableItems"
            :single-select="false" class="mt-8"
            item-key="code" show-select
        >
            <!-- Custom value  -->
            <template v-slot:item.value="{ item }">
                <v-tooltip color="primary" top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon 
                            class="mx-1" 
                            color="primary"
                            v-on="on" v-bind="attrs"
                        >
                            Show 
                        </v-btn>
                    </template>
                    <span 
                        class="px-1"
                        v-for="value in item.value" 
                        :key="'value_' + value"
                    >
                        {{value}}
                    </span>
                </v-tooltip>
            </template>
            <!-- Custom value  -->

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
            deleteDialog: false,
            deleteSuccessAlert: false,
            deleteErrorAlert: false,
            attributeActionDialogInfo: { 
                editorId: "",
                creatorType: "",
                editorType: "",
                creatorName: "",
                editorName: "",
                creatorKey: "",
                editorKey: "",
                newCreatorValue: "",
                newEditorValue: "",
                creatorValues: [],
                editorValues: [],
                creatorSuccessAlert: false,
                creatorErrorAlert: false,
                editorSuccessAlert: false,
                editorErrorAlert: false,
            },
            typeList: ['select', 'input', 'multi'],
            attributeTableHeaders: [
                { text: "Type", value: 'type' },
                { text: 'Name', value: 'name' },
                { text: 'Key', value: 'key' },
                { text: 'Value', value: 'value', sortable: false },
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
        openCreatorDialog() {
            this.attributeActionDialogInfo.createtorSuccessAlert = false
            this.attributeActionDialogInfo.createtorErrorAlert = false
            this.creatorDialog = true
        },
        openEditorDialog(item) {
            this.editorDialog = true
            this.attributeActionDialogInfo.editorId = item.id
            this.attributeActionDialogInfo.editorName = item.name
            this.attributeActionDialogInfo.editorType = item.type
            this.attributeActionDialogInfo.editorKey = item.key
            this.attributeActionDialogInfo.editorValues = item.value.map(item => {
                return { value: item }
            })
            this.attributeActionDialogInfo.editorSuccessAlert = false
            this.attributeActionDialogInfo.editorErrorAlert = false
        },
        addNewCreatorValue() {
            if(this.attributeActionDialogInfo.newCreatorValue != "") {
                const newValue = { value: this.attributeActionDialogInfo.newCreatorValue }
                this.attributeActionDialogInfo.creatorValues.push(newValue)
                this.attributeActionDialogInfo.newCreatorValue = ""
            }
        },
        addNewEditorValue() {
            if(this.attributeActionDialogInfo.newEditorValue != "") {
                const newValue = { value: this.attributeActionDialogInfo.newEditorValue }
                this.attributeActionDialogInfo.editorValues.push(newValue)
                this.attributeActionDialogInfo.newEditorValue = ""
            }
        },
        onCreatorValueChange(value, index) {
            this.attributeActionDialogInfo.creatorValues[index].value = value
        },
        onEditorValueChange(value, index) {
            this.attributeActionDialogInfo.editorValues[index].value = value
        },
        deleteCreatorAttributeItem(value) {
            this.attributeActionDialogInfo.creatorValues = this.attributeActionDialogInfo.creatorValues.filter(item => (item.value != value))
        },
        deleteEditorAttributeItem(value) {
            this.attributeActionDialogInfo.editorValues = this.attributeActionDialogInfo.editorValues.filter(item => (item.value != value))
        },
        openDeleteDialog(item) {
            this.attributeActionDialogInfo.editorId = item.id
            this.deleteDialog = true
        },
        createAttribute() {
            const data = {
                type: this.attributeActionDialogInfo.creatorType, 
                name: this.attributeActionDialogInfo.creatorName, 
                key: this.attributeActionDialogInfo.creatorKey, 
                value: this.attributeActionDialogInfo.creatorValues.map(item => (item.value))
            }
            console.log("create: ", data)

            this.$store.dispatch("createAttribute", {
                data,
                onSuccess: async data => {
                    this.attributeActionDialogInfo.creatorSuccessAlert = true
                    this.fetchAttributeList()
                },
                onError: async data => {
                    console.log('attribute create error: ', data)
                    this.attributeActionDialogInfo.creatorErrorAlert = true
                }
            })
        },
        updateAttribute() {
            const data = {
                type: this.attributeActionDialogInfo.editorType, 
                name: this.attributeActionDialogInfo.editorName, 
                key: this.attributeActionDialogInfo.editorKey, 
                value: this.attributeActionDialogInfo.editorValues.map(item => (item.value))
            }
            const attributeId = this.attributeActionDialogInfo.editorId

            this.$store.dispatch("updateAttribute", {
                attributeId,
                data,
                onSuccess: async data => {
                    this.attributeActionDialogInfo.editorSuccessAlert = true
                    this.fetchAttributeList()
                },
                onError: async data => {
                    console.log('attribute update error: ', data)
                    this.attributeActionDialogInfo.editorErrorAlert = true
                }
            })

            console.log("update: ", this.attributeActionDialogInfo)
        },
        deleteAttribute() {
            const attributeId = this.attributeActionDialogInfo.editorId
            
            this.$store.dispatch("deleteAttribute", {
                attributeId,
                onSuccess: async data => {
                    
                    this.deleteSuccessAlert = true
                    this.fetchAttributeList()
                },
                onError: async data => {
                    console.log('attribute delete error: ', data)
                    this.deleteErrorAlert = true
                }
            })
        }
    }   
}
</script>