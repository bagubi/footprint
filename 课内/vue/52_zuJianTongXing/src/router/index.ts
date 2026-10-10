import { createRouter, createWebHashHistory } from "vue-router";

import PropsDemo from "@/components/1.PropsDemo.vue";
import EmitDemo from "@/components/2.EmitDemo.vue";
import MittDemo from "@/components/3.MittDemo.vue";
import VModelDemo from "@/components/4.VModelDemo.vue";
import AttrsDemo from "@/components/5.AttrsDemo.vue";
import RefDemo from "@/components/6.RefDemo.vue";
import ProvideDemo from "@/components/7.ProvideDemo.vue";
import PiniaDemo from "@/components/8.PiniaDemo.vue"; // ← 新增
import SlotDemo from "@/components/9.SlotDemo.vue";

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
    { path: "/slot", component: SlotDemo },
  ],
});

export default router;
