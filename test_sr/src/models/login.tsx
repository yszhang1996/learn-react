import { PropsMenu } from "@/types";

let menuData = localStorage.getItem('menuTree');
export default {
    namespace: 'login',
    state: {
        menu: menuData ? JSON.parse(menuData) : [],
    },
    reducers: {
        setMenu(state: PropsMenu, { payload }: { payload: PropsMenu }) {
            console.log("触发reducers");

            console.log(payload);


            return { ...state, menu: payload };
        },
    },
    updateMenu() {
        console.log("updateMenu");
    }
}