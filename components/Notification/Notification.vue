<template>
  <div class="text-center">
    <v-menu
      :close-on-content-click="false"
      :nudge-width="250"
      offset-y
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-badge v-if="newNoti" color="pink" overlap dot>
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
                <v-icon v-else>mdi-bell</v-icon>
            </v-btn>
        </template>

        <v-card class="mx-auto" max-width="300" tile>
            <v-toolbar
                color="primary"
                dark
            >
                <v-toolbar-title>Notification</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item class="hoverNotification">
                            <v-list-item-title>Mark as read all</v-list-item-title>
                        </v-list-item>
                        <v-dialog
                            v-model="createNotiDialog"
                            persistent
                            max-width="600px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item 
                                    class="hoverNotification"  
                                    v-bind="attrs"
                                    v-on="on" @click="handleCreateNotification"
                                >
                                    <v-list-item-title>Create new notification</v-list-item-title>
                                </v-list-item>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Thông báo mới</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-select 
                                                    attach
                                                    chips
                                                    multiple
                                                    label="Người nhận"
                                                    item-text="name"
                                                    item-value="value"
                                                >
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-textarea label="Chi tiết thông báo" v-model="detailNoti">
                                                </v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-text>
                                    <v-col cols="12">
                                        <!-- <v-alert type="success" v-if="successCreate">Tạo thành công</v-alert> -->
                                        <!-- <v-alert type="error" v-if="failCreate">{{ failCreate }}</v-alert> -->
                                    </v-col>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        @click="createNotiDialog = false"
                                    >
                                        Hủy
                                    </v-btn>
                                    <v-btn
                                        color="primary"
                                    >
                                        Tạo
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-list>
                </v-menu>
            </v-toolbar>
            <v-list dense>
                <template>
                    <template>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    Không có thông báo
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </template>
            </v-list>
        </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
    created() {
        this.fetchList()
        this.getListUser()
    },
    methods: {
        async fetchList() { 
           
        },
        async getListUser() {
            
        },
        handleRouteToArticle(noti) {
            
        },
        async createNewNotification() {
            
        },
        showDotsDialog(e) {
            this.dotsDialog = !this.dotsDialog;
        },
        handleCreateNotification() {
            this.createNotiDialog = !this.createNotiDialog;
        }
    },
    data: () => ({
        createNotiDialog: false,
        dotsDialog: false,
        menuPosition: {
            x: 0,
            y: 0
        },
        changes: '',
        limit: 1000,
        skip: 0,
        isLoading: true
    }),
}
</script>

<style scoped>
.hoverNotification {
    cursor: pointer;
}
.hoverNotification:hover {
    background-color: #F6F6F6
}
</style>