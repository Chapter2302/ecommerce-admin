import { get, isEmpty, isBuffer } from "lodash";
import axios from "axios";

//----------------Warehouse--------------------//
export async function getWarehouseList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `http://data.cams.vn/v1/api/inventory/warehouse`,
        method: "GET",
        headers: {}
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data.data);
        } else {
            onError(data);
        }
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}

export async function getInventoryItemList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `http://data.cams.vn/v1/api/inventory/item`,
        method: "GET",
        headers: {}
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data.data);
        } else {
            onError(data);
        }
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}

export async function getAttributeList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `http://data.cams.vn/v1/api/product/attribute`,
        method: "GET",
        headers: {}
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data);
        } else {
            onError(data);
        }
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}

export async function getModelList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `http://data.cams.vn/v1/api/product/model`,
        method: "GET",
        headers: {}
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data);
        } else {
            onError(data);
        }
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}

export async function getVariantList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `http://data.cams.vn/v1/api/product/variant`,
        method: "GET",
        headers: {}
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data);
        } else {
            onError(data);
        }
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}