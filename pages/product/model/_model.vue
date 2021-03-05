<template>
    <div class="wrapper px-4">
        <!-- Delete Variant Dialog -->
        <v-dialog max-width="300" v-model="deleteDialog" >
            <v-card class="py-4">
                <v-card-title class="d-flex justify-center">Do you want to delete?</v-card-title>
                <v-card-actions class="d-flex justify-center ">
                    <v-btn color="primary" class="mr-2" @click="deleteDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" @click="confirmDeleteVariant()">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Delete Variant Dialog -->

        <v-row>
            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>
                        Variant List
                    </v-card-title>
                    <v-data-table
                        :headers="[{ text: '', value: 'code' }]"
                        :items="variantList"
                        item-key="code"
                        group-by="level" :single-select="true"
                        hide-default-header
                        hide-default-footer
                    >
                        <template v-slot:group.header="{items, isOpen, toggle}">
                            <th class="d-flex align-center">
                                <v-icon @click="toggle" class="mr-1"
                                >{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
                                </v-icon>
                                LEVEL {{ items[0].level }}
                            </th>
                        </template>
                        <template v-slot:item="{ item, isSelected, select }">
                            <tr :style="{'background-color': isSelected ? '#eeeeee' : '#ffffff'}">
                                <td class="d-flex align-center" style="cursor: pointer" @click="clickSelectVariant(select, item)">
                                    <!-- <v-simple-checkbox
                                        :value="isSelected" class="mr-2"
                                        @input="select"
                                    ></v-simple-checkbox> -->
                                    {{item.code}}
                                    <!-- <v-spacer></v-spacer>
                                    <v-icon small @click="toggleDeleteVariantBtn(item)">
                                        fas fa-trash
                                    </v-icon> -->
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>

            <v-col cols="12" md="9">
                <v-row>
                    <!-- Variant Editor Card  -->
                    <v-col cols="12" md="6">
                        <v-card :disabled="selectedVariant.isEmpty">
                            <v-card-title class="px-4">
                                Variant Editor  <v-icon small class="ml-2">fas fa-pen</v-icon>
                            </v-card-title>
                            <v-divider class="mb-6"></v-divider>
                            <v-row class="px-4">
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
                            <v-row class="px-4 mt-8">
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
                                                x-small @click="deleteAttribute(item, 'editor')"
                                            >fas fa-trash</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>
                            <v-row class="px-4 mt-2">
                                <v-col cols="12" sm="6" class="pb-0">
                                    <v-select
                                        :rules="[rules.select('Name')]"
                                        label="Name" v-model="selectedVariant.newAttribute.key"
                                        :items="attributeList" @input="selectAttributeName('editor')"
                                        item-value="key" dense
                                        item-text="name"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="pb-0">
                                    <v-text-field 
                                        v-if="selectedVariant.newAttribute.type == ''"
                                        disabled dense label="Value"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="selectedVariant.newAttribute.value"
                                        v-if="selectedVariant.newAttribute.type == 'input'"
                                        label="Value" dense
                                    ></v-text-field>
                                    <v-select
                                        v-model="selectedVariant.newAttribute.value"
                                        v-if="selectedVariant.newAttribute.type == 'select'"
                                        label="Value" dense :items="selectedVariant.newAttribute.valueList"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="px-4">
                                <v-col cols="12">
                                    <v-btn 
                                        block small color="primary"
                                        @click="addNewAttribute('editor')"
                                    >Add Attribute</v-btn>
                                </v-col>
                            </v-row>
                            <v-divider class="my-6"></v-divider>
                            <v-card-actions class="px-4 pb-4 pt-0">
                                <v-row>
                                    <v-col cols="6" class="pr-1">
                                        <v-btn 
                                            block color="primary" 
                                            small @click="toggleDeleteVariantBtn()"
                                        >Delete</v-btn>
                                    </v-col>
                                    <v-col cols="6" class="pl-1">
                                        <v-btn block color="primary" small>Update</v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!-- Variant Editor Card  -->

                    <!-- Variant Creator Card  -->
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title class="px-4">
                                Variant Creator  <v-icon small class="ml-2">fas fa-plus</v-icon>
                            </v-card-title>
                            <v-divider class="mb-6"></v-divider>
                            <v-row class="px-4">
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
                            <v-row class="px-4 mt-8">
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
                                                x-small @click="deleteAttribute(item, 'creator')"
                                            >fas fa-trash</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>
                            <v-row class="px-4 mt-2">
                                <v-col cols="12" sm="6" class="pb-0">
                                    <v-select
                                        :rules="[rules.select('Name')]" dense
                                        label="Name" v-model="creator.newAttribute.key"
                                        :items="attributeList" 
                                        item-value="key" item-text="name"
                                        @input="selectAttributeName('creator')"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="pb-0">
                                    <v-text-field 
                                        v-if="creator.newAttribute.type == ''"
                                        disabled dense label="Value"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="creator.newAttribute.value"
                                        v-if="creator.newAttribute.type == 'input'"
                                        label="Value" dense
                                    ></v-text-field>
                                    <v-select
                                        v-model="creator.newAttribute.value"
                                        v-if="creator.newAttribute.type == 'select'" 
                                        :items="creator.newAttribute.valueList"
                                        label="Value" dense 
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="px-4">
                                <v-col cols="12">
                                    <v-btn 
                                        block small color="primary"
                                        @click="addNewAttribute('creator')"
                                    >Add Attribute</v-btn>
                                </v-col>
                            </v-row>
                            <v-divider class="my-6"></v-divider>
                            <v-card-actions class="px-4 pb-4 pt-0">
                                <v-btn 
                                    block small 
                                    color="primary"
                                    @click="createNewVariant()"
                                >Create New Variant</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <!-- Variant Creator Card  -->
                </v-row>
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
            isEditable: false,
            variantList: [],
            attributeList: [],
            selectedVariant: {
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
            },
            deleteDialog: false,
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
        await this.fetchVariantList()
    },
    methods: {
        async fetchVariantList() {
            await this.$store.dispatch("getVariantList", {
                onSuccess: async variants => {
                    const modelId = this.modelId
                    variants.forEach(variant => {
                        if(modelId === variant.model_id) {
                            this.variantList.push(variant)
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
        clickSelectVariant(select, variant) {
            select()
            this.selectedVariant = {
                isEmpty: false,
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
        },
        toggleDeleteVariantBtn() {
            this.deleteDialog = true
        },
        selectAttributeName(cardPlace) {
            if(cardPlace === 'creator') {
                const newAttribute = this.attributeList.find(attribute => {
                    return attribute.key == this.creator.newAttribute.key
                })
                this.creator.newAttribute.type = newAttribute.type
                this.creator.newAttribute.name = newAttribute.name
                this.creator.newAttribute.valueList = newAttribute.value
            } else if(cardPlace === 'editor') {
                const newAttribute = this.attributeList.find(attribute => {
                    return attribute.key == this.selectedVariant.newAttribute.key
                })
                this.selectedVariant.newAttribute.type = newAttribute.type
                this.selectedVariant.newAttribute.name = newAttribute.name
                this.selectedVariant.newAttribute.valueList = newAttribute.value
            }
        },
        addNewAttribute(cardPlace) {
            if(cardPlace === 'creator') {
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
            } else if(cardPlace === 'editor') {
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
            }
        },
        createNewVariant() {
            const newVariant = {
                code: this.creator.code,
                model_id: this.modelId,
                attributes: this.creator.attributes,
                level: Number(this.creator.level)
            }
            this.variantList.push(newVariant)
            console.log(this.creator.level)
        },
        deleteAttribute(attribute, cardPlace) {
            if(cardPlace === 'creator') {
                const newAttributesArray = this.creator.attributesArray.filter(item => {
                    return item.key != attribute.key
                })
                this.creator.attributesArray = newAttributesArray
                delete this.creator.attributes[attribute.key]
                
            } else if(cardPlace === 'editor') {
                const newAttributesArray = this.selectedVariant.attributesArray.filter(item => {
                    console.log(item.key, attribute.key)
                    return item.key != attribute.key
                })
                this.selectedVariant.attributesArray = newAttributesArray
                delete this.selectedVariant.attributes[attribute.key]
            }
        },
        confirmDeleteVariant() {
            this.variantList = this.variantList.filter(item => {
                return item.code !== this.selectedVariant.code
            })
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
            this.deleteDialog = false
        }
    },   
}
</script>