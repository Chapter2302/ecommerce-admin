import { get, isEmpty, isBuffer } from "lodash";
import axios from "axios";

//----------------Warehouse--------------------//

export async function getWarehouseList(
    { dispatch, commit },
    { warehouseId, limit, skip, data, onSuccess, onError }
) {
    return [
        {
            code: "warehouse_one",
            name: "Warehouse 1",
            address: "123 Street",
            district: "1",
            city: "Ho Chi Minh",
            country: "Vietnam"
        },
        {
            code: "warehouse_two",
            name: "Warehouse 2",
            address: "X Street",
            district: "Binh Thanh",
            city: "Ho Chi Minh",
            country: "Vietnam"
        }
    ]
}

export async function getWarehouse(
    { dispatch, commit },
    { warehouseId, onSuccess, onError }
) {
    return {
        
    }
}