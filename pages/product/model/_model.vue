<template>
    <div class="wrapper px-4">
        <!-- Update Model Dialog -->
        <v-dialog max-width="300" v-model="updateConfirmDialog" >
            <v-card class="py-4">
                <v-card-title class="d-flex justify-center">Do you want to update?</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-alert
                                dense type="success"
                                v-model="updateConfirmSuccessAlert"
                            >Update success</v-alert>
                            <v-alert
                                dense type="error"
                                v-model="updateConfirmErrorAlert"
                            >Something wrong! Please try later</v-alert>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="d-flex justify-center ">
                    <v-btn color="primary" class="mr-2" @click="updateConfirmDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" @click="updateModel()">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Update Model Dialog -->

        <!-- Delete Variant Dialog -->
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
                    <v-btn color="primary" class="mr-2" @click="cancelDeleteDialogBtn()">
                        Close
                    </v-btn>
                    <v-btn color="primary" @click="deleteVariant()">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Delete Variant Dialog -->

        <!-- Editor Dialog -->
        <v-dialog 
            v-model="editorDialog"
            max-width="550"
        >
            <v-card>
                <v-card-title class="px-4">
                    Variant Editor 
                </v-card-title>
                <v-divider class="mb-6"></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6"> 
                            <v-text-field
                                label="Code" dense v-model="selectedVariant.code"
                                :rules="[rules.textField('Code')]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6"> 
                            <v-text-field
                                v-model="selectedVariant.level"
                                label="Level" type="number" dense
                                :rules="[rules.textField('Level')]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mt-8">
                        <v-col cols="12" sm="4" class="pb-0">
                            <v-select
                                :rules="[rules.select('Name')]"
                                label="Attribute Name" v-model="selectedVariant.newAttribute.key"
                                :items="attributeList" @input="selectAttributeName('variantEditor')"
                                item-value="key" dense
                                item-text="name"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" class="pb-0">
                            <v-text-field 
                                v-if="selectedVariant.newAttribute.type == ''"
                                disabled dense label="Attribute Value"
                            ></v-text-field>
                            <v-text-field
                                v-model="selectedVariant.newAttribute.value"
                                v-if="selectedVariant.newAttribute.type == 'input'"
                                label="Attribute Value" dense
                            ></v-text-field>
                            <v-select
                                v-model="selectedVariant.newAttribute.value"
                                v-if="selectedVariant.newAttribute.type == 'select'"
                                label="Attribute Value" dense :items="selectedVariant.newAttribute.valueList"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-btn 
                                block small color="primary"
                                @click="addNewAttribute('variantEditor')"
                            >Add Or Edit</v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="mt-2">
                        <v-col cols="12" class="pt-0">
                            <v-data-table
                                hide-default-footer
                                disable-sort dense
                                :headers="[
                                    { text: 'Name', value: 'name' },
                                    { text: 'Value', value: 'value' },
                                    { text: '', value: 'action', sortable: false }
                                ]" height="160"
                                :items="selectedVariant.attributesArray"
                                class="elevation-1 px-2"
                            >
                                <template v-slot:item.name="{ item }">
                                    <span class="text-caption">{{item.name}}</span>
                                </template>
                                <template v-slot:item.value="{ item }">
                                    <span class="text-caption">{{item.value}}</span>
                                </template>
                                <template v-slot:item.action="{ item }">
                                    <v-icon 
                                        x-small @click="deleteAttribute(item, 'variantEditor')"
                                    >fas fa-trash</v-icon>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-alert
                                dense type="success"
                                v-model="editorSuccessAlert"
                            >Update success</v-alert>
                            <v-alert
                                dense type="error"
                                v-model="editorErrorAlert"
                            >Something wrong! Please try later</v-alert>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="my-6"></v-divider>
                <v-card-actions class="pb-4 pt-0">
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="primary" class="col-4"
                        small @click="editorDialog = false"
                    >Cancel</v-btn>
                    <v-btn 
                        class="col-4" color="primary" 
                        small @click="updateVariant()"
                    >Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Editor Dialog -->

        <!-- Creator Dialog -->
        <v-dialog 
            v-model="creatorDialog"
            max-width="550"
        >
            <v-card>
                <v-card-title class="px-4">
                    Variant Creator  <v-icon small class="ml-2">fas fa-plus</v-icon>
                </v-card-title>
                <v-divider class="mb-6"></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6"> 
                        <v-text-field
                            v-model="creator.code"
                            label="Code" dense
                            :rules="[rules.textField('Code')]"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6"> 
                        <v-text-field
                            v-model="creator.level"
                            label="Level" type="number" dense
                            :rules="[rules.textField('Level')]"
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mt-8">
                        <v-col cols="12" sm="4" class="pb-0">
                            <v-select
                                :rules="[rules.select('Name')]" dense
                                label="Attribute Name" v-model="creator.newAttribute.key"
                                :items="attributeList" 
                                item-value="key" item-text="name"
                                @input="selectAttributeName('variantCreator')"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" class="pb-0">
                            <v-text-field 
                                v-if="creator.newAttribute.type == ''"
                                disabled dense label="Attribute Value"
                            ></v-text-field>
                            <v-text-field
                                v-model="creator.newAttribute.value"
                                v-if="creator.newAttribute.type == 'input'"
                                label="Attribute Value" dense
                            ></v-text-field>
                            <v-select
                                v-model="creator.newAttribute.value"
                                v-if="creator.newAttribute.type == 'select'" 
                                :items="creator.newAttribute.valueList"
                                label="Attribute Value" dense 
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-btn 
                                block small color="primary"
                                @click="addNewAttribute('variantCreator')"
                            >Add Or Edit</v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="mt-2">
                        <v-col cols="12" class="pt-0">
                            <v-data-table
                                hide-default-footer
                                disable-sort dense
                                :headers="[
                                    { text: 'Name', value: 'name' },
                                    { text: 'Value', value: 'value' },
                                    { text: '', value: 'action', sortable: false }
                                ]" height="160"
                                :items="creator.attributesArray"
                                class="elevation-1 px-2"
                            >
                                <template v-slot:item.action="{ item }">
                                    <v-icon 
                                        x-small @click="deleteAttribute(item, 'variantCreator')"
                                    >fas fa-trash</v-icon>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-alert
                                dense type="success"
                                v-model="creatorSuccessAlert"
                            >Crreate success</v-alert>
                            <v-alert
                                dense type="error"
                                v-model="creatorErrorAlert"
                            >Something wrong! Please try later</v-alert>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="my-6"></v-divider>
                <v-card-actions class="d-flex pb-4 pt-0">
                    <v-spacer></v-spacer>
                    <v-btn
                        small class="col-4"
                        color="primary" @click="creatorDialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn 
                        small class="col-4"
                        color="primary"
                        @click="createVariant()"
                    >Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Creator Dialog -->
        
        <v-row class="mt-8">
            <v-col cols="12" md="6">
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="Code" dense
                            v-model="thisModel.code"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="Name" dense
                            v-model="thisModel.name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select
                            label="Active" dense 
                            :items="[  
                                { name: 'True', key: true },
                                { name: 'False', key: false }
                            ]" 
                            item-text="name" item-value="key"
                            v-model="thisModel.isActive"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row class="mt-4">
                        <v-col cols="12" sm="4" class="pb-0">
                            <v-select
                                :rules="[rules.select('Name')]"
                                label="Attribute Name" v-model="thisModel.newAttribute.key"
                                :items="attributeList" @input="selectAttributeName('modelEditor')"
                                item-value="key" dense
                                item-text="name"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" class="pb-0">
                            <v-text-field 
                                v-if="thisModel.newAttribute.type == ''"
                                disabled dense label="Attribute Value"
                            ></v-text-field>
                            <v-text-field
                                v-model="thisModel.newAttribute.value"
                                v-if="thisModel.newAttribute.type == 'input'"
                                label="Attribute Value" dense
                            ></v-text-field>
                            <v-select
                                v-model="thisModel.newAttribute.value"
                                v-if="thisModel.newAttribute.type == 'select'"
                                label="Attribute Value" dense :items="thisModel.newAttribute.valueList"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-btn 
                                block small color="primary"
                                @click="addNewAttribute('modelEditor')"
                            >Add Or Edit</v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="my-6">
                        <v-col cols="12" class="pt-0">
                            <v-data-table
                                hide-default-footer
                                disable-sort dense
                                :headers="[
                                    { text: 'Name', value: 'name' },
                                    { text: 'Value', value: 'value' },
                                    { text: '', value: 'action', sortable: false }
                                ]" height="160"
                                :items="thisModel.attributesArray"
                                class="elevation-1 px-2"
                            >
                                <template v-slot:item.action="{ item }">
                                    <v-icon 
                                        x-small @click="deleteAttribute(item, 'modelEditor')"
                                    >fas fa-trash</v-icon>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                <v-row class="d-flex">
                    <v-col cols="12" sm="6"></v-col>
                    <v-col cols="12" sm="6">
                        <v-btn 
                            block color="primary"
                            @click="openUpdateConfirmDialog()"
                        >Update Model</v-btn>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="d-flex">
                        Variant List
                        <v-spacer></v-spacer>
                        <v-btn 
                            v-if="!isMultipleChoice"
                            small color="primary" class="mr-1" 
                            @click="isMultipleChoice = true"
                        >
                            Choose <v-icon small class="ml-2">fas fa-check-double</v-icon>
                        </v-btn>
                        <v-btn 
                            small color="primary" v-if="!isMultipleChoice"
                            @click="openVariantCreatorDialog(1, null)"
                        >
                            Create <v-icon small class="ml-2">fas fa-plus</v-icon>
                        </v-btn>
                        <v-btn 
                            small color="primary" outlined
                            v-if="isMultipleChoice" @click="isMultipleChoice = false"
                        > 
                            Cancel
                        </v-btn>
                        <v-btn 
                            small color="primary" class="ml-2"
                            v-if="isMultipleChoice"
                        > 
                            Delete
                        </v-btn>
                    </v-card-title>
                    
                    <!-- Varaint tables -->
                    <v-data-table
                        v-for="(table, index) in variantTablesList"
                        :key="'table_' + index"
                        :headers="[{ text: '', value: 'code' }]"
                        :items="table.tableItems"
                        item-key="code" dense single-select
                        hide-default-header
                        hide-default-footer
                    >
                        <template v-slot:item="{ item, select, isSelected }">
                            <tr 
                                :style="{'background-color': item.isOpen ? '#eeeeee' : '#ffffff'}"
                            >
                                <td 
                                    class="d-flex align-center" 
                                    style="cursor: pointer"
                                    :class="`pl-${(item.level - 1) * 4}`"
                                >
                                    <v-btn 
                                        small icon 
                                        @click="clickAngleButton(index, item)"
                                    >
                                        <v-icon small
                                        >{{  item.isOpen ? 'fas fa-angle-down' : 'fas fa-angle-right' }}
                                        </v-icon>
                                    </v-btn>
                                    {{item.code}}
                                    <v-spacer></v-spacer>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                small icon color="primary" 
                                                v-on="on" v-bind="attrs"
                                                @click="openVariantCreatorDialog(index, item)"
                                            >
                                                <v-icon small>
                                                    fas fa-plus
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Add next-level variant </span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                small icon color="primary"
                                                v-on="on" v-bind="attrs"
                                                @click="openVariantEditorDialog(index, item)"
                                            >
                                                <v-icon small>
                                                    fas fa-pen
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Edit </span>
                                    </v-tooltip>
                                    <v-btn 
                                        small icon color="primary"
                                        @click="openVariantDeleteDialog(item)"
                                    >
                                        <v-icon small>
                                            fas fa-trash
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                    <!-- Varaint tables -->
                </v-card>
            </v-col>
        </v-row>
    </div> 
</template>

<script>
import rules from "@/mixins/validationRules";
import { set, get, remove } from 'lodash'
export default {
    mixins: [rules],
    async asyncData({ params }) {
        const modelId = params.model
        return { modelId }
    },
    data() {
        return {
            isMultipleChoice: false,
            editorDialog: false,
            creatorDialog: false,
            deleteDialog: false,
            updateConfirmDialog: false,
            updateConfirmSuccessAlert: false,
            updateConfirmErrorAlert: false,
            creatorSuccessAlert: false,
            creatorErrorAlert: false,
            editorSuccessAlert: false,
            editorErrorAlert: false,
            deleteSuccessAlert: false,
            deleteErrorAlert: false,
            thisModel: {
                code: "",
                name: "",
                variantLevels: "",
                isActive: "",
                attribute: {},
                attributesArray: [],
                newAttribute: { 
                    type: '', 
                    name: '', 
                    key: '', 
                    value: '', 
                    valueList: [] 
                },
            },
            variantFetchList: [],
            variantTablesList: [],
            attributeList: [],
            selectedVariant: {
                id: "",
                isEmpty: true,
                tableIndex: "",
                code: "",
                level: "",
                attributes: {},
                attributesArray: [],
                newAttribute: { 
                    type: '', 
                    name: '', 
                    key: '', 
                    value: '', 
                    valueList: [] 
                },
            },
            creator: {
                code: "",
                level: "",
                attributes: {},
                attributesArray: [],
                newAttribute: { 
                    type: '', 
                    name: '', 
                    key: '', 
                    value: '', 
                    valueList: [] 
                },
            },
        }
    },
    async created() {
        await this.fetchAttributesLists()
        await this.fetchModelById()
        await this.fetchVariantList()
    },
    methods: {
        // Fetch API
        async fetchModelById() {
            const modelId = this.modelId
            await this.$store.dispatch("getModel", {
                modelId,
                onSuccess: async model => {
                    this.thisModel = {
                        code: model.code,
                        name: model.name,
                        variantLevels: model.variant_levels,
                        isActive: model.is_active,
                        attributes: model.attributes,
                        attributesArray: Object.keys(model.attributes).map(key => {
                            const attribute = this.attributeList.find(attribute => (attribute.key === key))
                            return {
                                name: attribute.name, 
                                value: get(model.attributes, key, null),
                                key: attribute.key
                            }
                        }),
                        newAttribute: { 
                            type: '', 
                            name: '', 
                            key: '', 
                            value: '', 
                            valueList: [] 
                        },
                    }
                },
                onError: async data => {
                    console.log('model fetch error: ', data)
                }
            })
        },
        async fetchVariantList() {
            await this.$store.dispatch("getVariantList", {
                onSuccess: async variants => {
                    const modelId = this.modelId
                    variants.forEach(variant => {
                        if(modelId === variant.model_id) {
                            variant.isChecked = false
                            variant.isOpen = false
                            this.variantFetchList.push(variant)
                        }
                    })

                    variants.forEach(variant => {
                        if(modelId === variant.model_id && variant.level === 1) {
                            const newTable = {
                                parentVariant: variant,
                                tableItems: [variant]
                            }
                            this.variantTablesList.push(newTable)
                        }
                    })
                },
                onError: async data => {
                    console.log('variants fetch error: ', data)
                }
            })
        },
        async fetchAttributesLists() {
            this.isLoading = true;
            await this.$store.dispatch("getAttributeList", {
                onSuccess: async attributes => {
                    this.attributeList = attributes
                },
                onError: async data => {
                    console.log('attributes error: ', data)
                }
            })
        },
        // Fetch API

        // Functions
        sortTableItems(tableItems) {
            const newTableItems = tableItems.sort(function(a, b){
                if(a.code < b.code) { return -1; }
                if(a.code > b.code) { return 1; }
                return 0;
            })
            return newTableItems
        },
        clickAngleButton(index, variant) {
            variant.isOpen = !variant.isOpen;
            if(variant.isOpen) {
                this.variantFetchList.forEach(item => {
                    if(item.code.includes(variant.code) && item.level === variant.level + 1)
                        this.variantTablesList[index].tableItems.push(item)
                })
            } else {
                
                this.variantTablesList[index].tableItems = []
                this.variantFetchList.forEach(item => {
                    if(item.level <= variant.level && item.code.includes(this.variantTablesList[index].parentVariant.code))
                        this.variantTablesList[index].tableItems.push(item)
                })
            }
            this.variantTablesList[index].tableItems = this.sortTableItems(this.variantTablesList[index].tableItems)
        },
        // Functions

        // Attribute handle
        selectAttributeName(cardPlace) {
            if(cardPlace === 'variantCreator') {
                const newAttribute = this.attributeList.find(attribute => {
                    return attribute.key == this.creator.newAttribute.key
                })
                this.creator.newAttribute.type = newAttribute.type
                this.creator.newAttribute.name = newAttribute.name
                this.creator.newAttribute.valueList = newAttribute.value
            } else if(cardPlace === 'variantEditor') {
                const newAttribute = this.attributeList.find(attribute => {
                    return attribute.key == this.selectedVariant.newAttribute.key
                })
                this.selectedVariant.newAttribute.type = newAttribute.type
                this.selectedVariant.newAttribute.name = newAttribute.name
                this.selectedVariant.newAttribute.valueList = newAttribute.value
            } else if(cardPlace === 'modelEditor') { 
                const newAttribute = this.attributeList.find(attribute => {
                    return attribute.key == this.thisModel.newAttribute.key
                })
                this.thisModel.newAttribute.type = newAttribute.type
                this.thisModel.newAttribute.name = newAttribute.name
                this.thisModel.newAttribute.valueList = newAttribute.value
            }
        },
        addNewAttribute(cardPlace) {
            if(cardPlace === 'variantCreator') {
                set(this.creator.attributes, this.creator.newAttribute.key, this.creator.newAttribute.value)
                const isExist = this.creator.attributesArray.find(attribute => {
                    if(attribute.name == this.creator.newAttribute.name) {
                        attribute.value = this.creator.newAttribute.value
                        return true
                    }
                })
                if(!isExist) {
                    this.creator.attributesArray.push({ 
                        name: this.creator.newAttribute.name, 
                        value: this.creator.newAttribute.value,
                        key: this.creator.newAttribute.key
                    })
                }
            } else if(cardPlace === 'variantEditor') {
                set(this.selectedVariant.attributes, this.selectedVariant.newAttribute.key, this.selectedVariant.newAttribute.value)
                const isExist = this.selectedVariant.attributesArray.find(attribute => {
                    if(attribute.name == this.selectedVariant.newAttribute.name) {
                        attribute.value = this.selectedVariant.newAttribute.value
                        return true
                    }
                })
                if(!isExist) {
                    this.selectedVariant.attributesArray.push({ 
                        name: this.selectedVariant.newAttribute.name, 
                        value: this.selectedVariant.newAttribute.value,
                        key: this.selectedVariant.newAttribute.key 
                    })
                }
            } else if(cardPlace === 'modelEditor') {
                set(this.thisModel.attributes, this.thisModel.newAttribute.key, this.thisModel.newAttribute.value)
                const isExist = this.thisModel.attributesArray.find(attribute => {
                    if(attribute.name == this.thisModel.newAttribute.name) {
                        attribute.value = this.thisModel.newAttribute.value
                        return true
                    }
                })
                if(!isExist) {
                    this.thisModel.attributesArray.push({ 
                        name: this.thisModel.newAttribute.name, 
                        value: this.thisModel.newAttribute.value,
                        key: this.thisModel.newAttribute.key 
                    })
                }
            }
        },
        deleteAttribute(attribute, cardPlace) {
            if(cardPlace === 'variantCreator') {
                const newAttributesArray = this.creator.attributesArray.filter(item => {
                    return item.key != attribute.key
                })
                this.creator.attributesArray = newAttributesArray
                delete this.creator.attributes[attribute.key]
                
            } else if(cardPlace === 'variantEditor') {
                const newAttributesArray = this.selectedVariant.attributesArray.filter(item => {
                    return item.key != attribute.key
                })
                this.selectedVariant.attributesArray = newAttributesArray
                delete this.selectedVariant.attributes[attribute.key]
            } else if(cardPlace === 'modelEditor') {
                const newAttributesArray = this.thisModel.attributesArray.filter(item => {
                    return item.key != attribute.key
                })
                this.thisModel.attributesArray = newAttributesArray
                delete this.thisModel.attributes[attribute.key]
            }
        },
        // Attribute handle

        // Variant Dialog Handle
        openVariantCreatorDialog(index, variant) {
            this.creatorSuccessAlert = false
            this.createtorErrorAlert = false
            if(index != 1) {
                this.creator.level = variant.level + 1
                this.selectedVariant = {
                    isEmpty: false,
                    tableIndex: index,
                    code: variant.code,
                    level: variant.level,
                    attributes: variant.attributes,
                    attributesArray: Object.keys(variant.attributes).map(key => {
                        const attribute = this.attributeList.find(attribute => (attribute.key === key))
                        return {
                            name: attribute.name, 
                            value: get(variant.attributes, key, null),
                            key: attribute.key
                        } 
                    }),
                    newAttribute: { 
                        type: '', 
                        name: '', 
                        key: '', 
                        value: '', 
                        valueList: [] 
                    },
                } 
            } else {
                this.creator.level = 1
            }
            this.creatorDialog = true
        },
        openVariantEditorDialog(index, variant) {
            this.editorSuccessAlert = false
            this.editorErrorAlert = false
            this.selectedVariant = {
                id: variant.id,
                isEmpty: false,
                tableIndex: index,
                code: variant.code,
                level: variant.level,
                attributes: variant.attributes,
                attributesArray: Object.keys(variant.attributes).map(key => {
                    const attribute = this.attributeList.find(attribute => (attribute.key === key))
                    return {
                        name: attribute.name, 
                        value: get(variant.attributes, key, null),
                        key: attribute.key
                    } 
                }),
                newAttribute: { 
                    type: '', 
                    name: '', 
                    key: '', 
                    value: '', 
                    valueList: [] 
                },
            } 
            this.editorDialog = true
        },
        openVariantDeleteDialog(variant) {
            this.deleteSuccessAlert = false
            this.deleteErrorAlert = false
            this.selectedVariant.id = variant.id
            this.deleteDialog = true
        },
        cancelDeleteDialogBtn() {
            this.selectedVariant = {
                isEmpty: true,
                code: "",
                level: "",
                attributes: {},
                attributesArray: [],
                newAttribute: { 
                    type: '', 
                    name: '', 
                    key: '', 
                    value: '', 
                    valueList: [] 
                },
            }
            this.deleteDialog = false
        },
        // Variant Dialog Handle

        // Variant handle
        async createVariant() {
            const data = {
                code: this.creator.code,
                model_id: this.modelId,
                attributes: this.creator.attributes,
                level: Number(this.creator.level)
            }

            console.log("create: ", data)

            this.variantFetchList = []
            this.variantTablesList = []
            await this.$store.dispatch("createVariant", {
                data,
                onSuccess: async data => {
                    console.log(data)
                    await this.fetchVariantList()
                    this.creatorSuccessAlert = true
                },
                onError: async data => {
                    console.log('variant create error: ', data)
                    this.createtorErrorAlert = true
                }
            })
        },
        async updateVariant() {
            const data = {
                code: this.selectedVariant.code,
                model_id: this.modelId,
                attributes: this.selectedVariant.attributes,
                level: Number(this.selectedVariant.level)
            }

            const variantId = this.selectedVariant.id

            this.variantFetchList = []
            this.variantTablesList = []
            await this.$store.dispatch("updateVariant", {
                variantId,
                data,
                onSuccess: async data => {
                    await this.fetchVariantList()
                    this.editorSuccessAlert = true
                },
                onError: async data => {
                    console.log('variant update error: ', data)
                    this.editorErrorAlert = true
                }
            })
        },
        async deleteVariant() {
            const variantId = this.selectedVariant.id

            this.variantFetchList = []
            this.variantTablesList = []
            await this.$store.dispatch("deleteVariant", {
                variantId,
                onSuccess: async data => {
                    await this.fetchVariantList()
                    this.deleteSuccessAlert = true
                },
                onError: async data => {
                    console.log('variant delete error: ', data)
                    this.deleteErrorAlert = true
                }
            })

            // this.variantTableItems = this.variantTableItems.filter(item => {
            //     return !item.code.includes(this.selectedVariant.code) 
            // })
            this.selectedVariant = {
                isEmpty: true,
                code: '',
                level: '',
                attributes: {},
                attributesArray: [],
                newAttribute: { 
                    type: '', 
                    name: '', 
                    key: '', 
                    value: '', 
                    valueList: [] 
                },
            }
        },
        // Variant handle

        // This Model handle
        openUpdateConfirmDialog() {
            this.updateConfirmErrorAlert = false
            this.updateConfirmSuccessAlert = false
            this.updateConfirmDialog = true
        },
        updateModel() {
            const data = { 
                code: this.thisModel.code, 
                name: this.thisModel.name, 
                variant_levels: this.thisModel.variantLevels, 
                is_active: this.thisModel.isActive, 
                attributes: this.thisModel.attributes
            }
            const modelId = this.modelId
            console.log('update model: ', data)

            this.$store.dispatch("updateModel", {
                modelId,
                data,
                onSuccess: async data => {
                    this.updateConfirmSuccessAlert = true
                    this.fetchModelById()
                },
                onError: async data => {
                    console.log('model create error: ', data)
                    this.updateConfirmErrorAlert = true
                }
            })
        }
        // This Model handle
    },   
}
</script>