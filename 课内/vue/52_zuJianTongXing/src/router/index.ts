import { createRouter, createWebHashHistory } from "vue-router";

import PropsDemo from "@/components/1.PropsDemo.vue";
import EmitDemo from "@/components/2.EmitDemo.vue";
import MittDemo from "@/components/3.MittDemo.vue";
import VModelDemo from "@/components/4.VModelDemo.vue";
import AttrsDemo from "@/components/5.AttrsDemo.vue";
import RefDemo from "@/components/6.RefDemo.vue";
import ProvideDemo from "@/components/7.ProvideDemo.vue";
import PiniaDemo from "@/components/8.PiniaDemo.vue"; // ← 新增
import SlotDemo1 from "@/components/9.1-SlotDemo_默认、具名插槽.vue";
import SlotDemo2 from "@/components/9.2-SlotDemo_作用域插槽.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/props" },
    { path: "/props", component: PropsDemo },
    { path: "/emit", component: EmitDemo },
    { path: "/mitt", component: MittDemo },
    { path: "/v-model", component: VModelDemo },
    { path: "/attrs", component: AttrsDemo },
    { path: "/ref", component: RefDemo },
    { path: "/provide", component: ProvideDemo },
    { path: "/pinia", component: PiniaDemo }, // ← 新增
    { path: "/slot1", component: SlotDemo1 },
    { path: "/slot2", component: SlotDemo2 },
  ],
});

export default router;
