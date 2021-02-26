<template>
    <div class="wrapper">
        <v-card>
            <v-card-title class="headline primary white--text">
                Item Information
            </v-card-title>
            <v-card-text class="pt-4">
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="Name" required
                            color="primary"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select
                            :items="['Warehouse 1', 'Warehouse 2', 'Warehouse 3']"
                            hide-details
                            label="Warehouse"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                </v-row>
                <v-row justify="end" class="py-4">
                    <v-btn
                        color="primary"
                        class="mx-4"
                    >
                        Submit
                    </v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    
}
</script>