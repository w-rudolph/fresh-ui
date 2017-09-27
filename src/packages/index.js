import DButton from './button/button';
import DInput from './input/input';
import DSelect from './select/select';
import DSelectOption from './select/select-option';
import DSelectGroup from './select/select-group';
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
import DAside from './aside/aside';
import DDialog from './dialog/dialog';
import Message from './message/message.js';
import MessageBox from './message-box/message-box.js';
import Notification from './notification/notification.js';

const components = [
    DButton,
    DInput,
    DSelect,
    DSelectOption,
    DSelectGroup,
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
    DAside,
    DDialog,
];

const install = function (Vue, opts = {}) {
    if (install.installed) {
        return;
    }
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Message.$mount(Vue.prototype);
    MessageBox.$mount(Vue.prototype);
    Notification.$mount(Vue.prototype);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,

    // components
    DButton,
    DInput,
    DSelect,
    DSelectOption,
    DSelectGroup,
    DIcon,
    DTag,
    DRate,
    DPopper,
    DTooltip,
    DCollapse,
    DCollapseItem,
    DCheckbox,
    DCheckboxGroup,
    DRadio,
    DDropdown,
    DDropdownMenu,
    DDropdownItem,
    DTab,
    DTabItem,
    DAside,
    DDialog,
    Message,
    MessageBox,
    Notification
}