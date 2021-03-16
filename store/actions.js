import { get, isEmpty, isBuffer } from "lodash";
import axios from "axios";

//----------------Warehouse--------------------//
export async function getWarehouseList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/inventory/warehouse`,
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

export async function createWarehouse(
    { dispatch, commit },
    { data, onSuccess, onError }
) {
    return await axios({
      url: `${process.env.baseAPI}/inventory/warehouse`,
      method: "POST",
      data,
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data);
        } else {
            onError(data);
        }
        return data;
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
            onError(e.response.data);
            }
        }
    });
}
//----------------Warehouse--------------------//

//----------------Inventory Item--------------------//
export async function getInventoryItemList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/inventory/item`,
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

export async function createInventoryItem(
    { dispatch, commit },
    { data, onSuccess, onError }
) {
    return await axios({
      url: `${process.env.baseAPI}/inventory/item`,
      method: "POST",
      data,
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data.data);
        } else {
            onError(data);
        }
        return data;
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}

export async function updateInventoryItem(
    { dispatch, commit },
    { itemId, data, onSuccess, onError }
) { 
    return await axios({
        url: `${process.env.baseAPI}/inventory/item/${itemId}`,
        method: "PUT",
        data
      })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data.data);
        } else {
            onError(data);
        }
        return res;
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
            onError(e.response.data);
            }
        }
    });
}

export async function deleteInventoryItem(
    { dispatch, commit },
    { itemId, onSuccess, onError }
) {
    return await axios({
      url: `${process.env.baseAPI}/inventory/item/${itemId}`,
      method: "DELETE",
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data.data);
        } else {
            onError(data);
        }
        return data;
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}
//----------------Inventory Item--------------------//

//----------------Inventory Item Stock--------------------//
export async function getInventoryItemStock(
    { dispatch, commit },
    { data, onSuccess, onError }
) {
    const obj = { ...data };

    Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
    const params = obj;

    return await axios({
        url: `${process.env.baseAPI}/inventory/stock`,
        method: "GET",
        params: params ? params : false,
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
//----------------Inventory Item Stock--------------------//

//---------------- Attributes --------------------//
export async function getAttributeList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/attribute`,
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

export async function createAttribute(
    { dispatch, commit },
    { data, onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/attribute/`,
        method: "POST",
        data,
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

export async function updateAttribute(
    { dispatch, commit },
    { attributeId, data, onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/attribute/${attributeId}`,
        method: "PUT",
        data,
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

export async function deleteAttribute(
    { dispatch, commit },
    { attributeId, onSuccess, onError }
) {
    return await axios({
      url: `${process.env.baseAPI}/product/attribute/${attributeId}`,
      method: "DELETE",
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            console.log(res)
            onSuccess(data.data);
        } else {
            onError(data);
        }
        return data;
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}
//---------------- Attributes --------------------//

//-------------------- Model -----------------------//
export async function getModelList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/model`,
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

export async function getModel(
    { dispatch, commit },
    { modelId, onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/model/${modelId}`,
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

export async function createModel(
    { dispatch, commit },
    { data, onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/model/`,
        method: "POST",
        data,
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

export async function updateModel(
    { dispatch, commit },
    { modelId, data, onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/model/${modelId}`,
        method: "PUT",
        data,
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

export async function deleteModel(
    { dispatch, commit },
    { modelId, onSuccess, onError }
) {
    return await axios({
      url: `${process.env.baseAPI}/product/model/${modelId}`,
      method: "DELETE",
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data.data);
        } else {
            onError(data);
        }
        return data;
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}
//-------------------- Model -----------------------//

//-------------------- Variant -----------------------//
export async function getVariantList(
    { dispatch, commit },
    { onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/variant`,
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

export async function createVariant(
    { dispatch, commit },
    { data, onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/variant/`,
        method: "POST",
        data,
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

export async function updateVariant(
    { dispatch, commit },
    { variantId, data, onSuccess, onError }
) {
    return await axios({
        url: `${process.env.baseAPI}/product/variant/${variantId}`,
        method: "PUT",
        data,
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

export async function deleteVariant(
    { dispatch, commit },
    { variantId, onSuccess, onError }
) {
    return await axios({
      url: `${process.env.baseAPI}/product/variant/${variantId}`,
      method: "DELETE",
    })
    .then(res => {
        const data = res.data;
        if (res.status >= 200 && res.status <= 299) {
            onSuccess(data.data);
        } else {
            onError(data);
        }
        return data;
    })
    .catch(e => {
        if (e.response) {
            if (e.response.status < 200 || e.response.status > 299) {
                onError(e.response.data);
            }
        }
    });
}
//-------------------- Variant -----------------------//