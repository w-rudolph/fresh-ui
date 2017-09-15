import DButton from './button/button';
import DInput from './input/input';
import DIcon from './icon/icon';
import DTag from './tag/tag';
import DRate from './rate/rate';
import DPopper from './popper/popper';
import DCollapse from './collapse/collapse';
import DCollapseItem from './collapse/collapse-item';
import DCheckbox from './checkbox/checkbox';
import DCheckboxGroup from './checkbox/checkbox-group';
import DRadio from './radio/radio';
import DTooltip from './tooltip/tooltip';
import DDropdown from './dropdown/dropdown';
import DDropdownMenu from './dropdown/dropdown-menu';
import DDropdownItem from './dropdown/dropdown-item';
import DTab from './tab/tab';
import DTabItem from './tab/tab-item';

const components = [
    DButton,
    DInput,
    DIcon,
    DTag,
    DRate,
    DPopper,
    DCollapse,
    DCollapseItem,
    DCheckbox,
    DCheckboxGroup,
    DRadio,
    DTooltip,
    DDropdown,
    DDropdownMenu,
    DDropdownItem,
    DTab,
    DTabItem,
];

const install = function (Vue, opts = {}) {
    if (install.installed) {
        return;
    }
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ...components,
}