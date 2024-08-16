import { PropsMenu } from "@/types";

let menuData = localStorage.getItem('menuTree');
let operateJson = localStorage.getItem('operateJson');
export default {
    namespace: 'login',
    state: {
        menu: menuData ? JSON.parse(menuData) : [],
        operateJson: operateJson ? JSON.parse(operateJson) : {},
    },
    reducers: {
        setMenu(state: PropsMenu, { payload }: { payload: PropsMenu }) {
            return { ...state, menu: payload };
        },
        setOperateJson(state: PropsMenu, { payload }: { payload: PropsMenu }) {
            return { ...state, operateJson: payload };
        },
    },
    updateMenu() {
        console.log("updateMenu");
    }
}