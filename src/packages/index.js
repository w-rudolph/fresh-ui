import DButton from './button/button';
import DInput from './input/input';
import DIcon from './icon/icon';
import DTag from './tag/tag';
import DRate from './rate/rate';
import DPopper from './popper/popper';

const components = [
    DButton,
    DInput,
    DIcon,
    DTag,
    DRate,
    DPopper,
];

const install = function (Vue, opts = {}) {
    if (install.installed) {
        return;
    }
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

//浏览器环境
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    install,       //导出所有组件
    ...components, //提供单独导出组件
}