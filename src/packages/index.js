import DButton from './button/button';
import DButtonGroup from './button/button-group';
import DInput from './input/input';
import DInputNumber from './input-number/input-number';
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
import DTable from './table/table';
import DRender from './base/render';
import DTableColumn from './table/table-column';
import DAside from './aside/aside';
import DDialog from './dialog/dialog';
import Message from './message/message.js';
import MessageBox from './message-box/message-box.js';
import Notification from './notification/notification.js';
import DDatepickerPanel from './datepicker/datepicker-panel';
import DDatepicker from './datepicker/datepicker';
import DTimepickerPanel from './timepicker/timepicker-panel';
import DTimepicker from './timepicker/timepicker';
import DPagination from './pagination/pagination';
import DBadge from './badge/badge';
import DSlider from './slider/slider';
import DForm from './form/form';
import DFormItem from './form/form-item';
import DColorpicker from './colorpicker/colorpicker';
import DColorpickerPanel from './colorpicker/colorpicker-panel';
import DProgress from './progress/progress';
import DSwitch from './switch/switch';
import DTimeline from './timeline/timeline';
import DTimelineItem from './timeline/timeline-item';
import DBreadcrumb from './breadcrumb/breadcrumb';
import DBreadcrumbItem from './breadcrumb/breadcrumb-item';
import DCard from './card/card';
import DTree from './tree/tree';
import DCarousel from './carousel/carousel';
import DCarouselItem from './carousel/carousel-item';
import DUpload from './upload/upload';
import DAlert from './alert/alert';
import DSteps from './steps/steps';
import DStep from './steps/step';
import DRow from './row/row';
import DCol from './row/col';

const components = [
    DButton,
    DButtonGroup,
    DInput,
    DInputNumber,
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
    DTable,
    DRender,
    DTableColumn,
    DAside,
    DDialog,
    DDatepickerPanel,
    DDatepicker,
    DTimepickerPanel,
    DTimepicker,
    DPagination,
    DBadge,
    DSlider,
    DForm,
    DFormItem,
    DColorpicker,
    DColorpickerPanel,
    DProgress,
    DSwitch,
    DTimeline,
    DTimelineItem,
    DBreadcrumb,
    DBreadcrumbItem,
    DCard,
    DTree,
    DCarousel,
    DCarouselItem,
    DUpload,
    DAlert,
    DSteps,
    DStep,
    DRow,
    DCol,
];

const install = function(Vue, opts = {}) {
    if (install.installed) {
        return;
    }
    components.forEach(component => {
        Vue.component(component.name, component, opts);
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
    DButtonGroup,
    DInput,
    DInputNumber,
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
    DTable,
    DRender,
    DTableColumn,
    DAside,
    DDialog,
    Message,
    MessageBox,
    Notification,
    DDatepickerPanel,
    DDatepicker,
    DTimepickerPanel,
    DTimepicker,
    DPagination,
    DBadge,
    DSlider,
    DForm,
    DFormItem,
    DColorpicker,
    DColorpickerPanel,
    DProgress,
    DSwitch,
    DTimeline,
    DTimelineItem,
    DBreadcrumb,
    DBreadcrumbItem,
    DCard,
    DTree,
    DCarousel,
    DCarouselItem,
    DUpload,
    DAlert,
    DSteps,
    DStep,
    DRow,
    DCol,
}