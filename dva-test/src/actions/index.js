import { createAction } from "redux-actions";

export const productUpdatelist = createAction("products/updateList");
export const productUpdatelistAsync = createAction("products/updateListAsync");
export const productUpdatelistHttp = createAction("products/updateListHttp");