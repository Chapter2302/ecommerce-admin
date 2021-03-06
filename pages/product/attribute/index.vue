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
            max-width="320" 
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
                                    :headers="[{ text: 'Value List', value: 'value', sortable: false }]"
                                    :items="attributeActionDialogInfo.creatorValues"
                                    hide-default-header
                                    hide-default-footer dense
                                ></v-data-table>
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
            max-width="320" 
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
                                    :headers="[{ text: 'Value List', value: 'value', sortable: false }]"
                                    :items="attributeActionDialogInfo.editorValues"
                                    hide-default-header
                                    hide-default-footer dense
                                >
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
            attributeActionDialogInfo: { 
                creatorType: "",
                editorType: "",
                creatorName: "",
                editorName: "",
                creatorKey: "",
                editorKey: "",
                newCreatorValue: "",
                newEditorValue: "",
                creatorValues: [],
                editorValues: []
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
        createAttribute() {
            console.log("create: ", {
            })
        },
        updateAttribute() {
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
            this.attributeActionDialogInfo.editorValues = item.value.map(item => {
                return { value: item }
            })
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
        onEditorValueChange(value, index) {
            this.attributeActionDialogInfo.editorValues[index] = value
        },
        openDeleteDialog(item) {
            this.deleteDialog = true
        }
    }   
}
</script>