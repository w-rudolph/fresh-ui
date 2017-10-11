import Home from '@/containers/Home';
import Button from '@/containers/Button';
import Input from '@/containers/Input';
import InputNumber from '@/containers/InputNumber';
import Select from '@/containers/Select';
import Radio from '@/containers/Radio';
import Checkbox from '@/containers/Checkbox';
import Tag from '@/containers/Tag';
import Icon from '@/containers/icon';
import Rate from '@/containers/Rate';
import Collapse from '@/containers/Collapse';
import Popper from '@/containers/Popper';
import Tooltip from '@/containers/Tooltip';
import Dropdown from '@/containers/Dropdown';
import Tab from '@/containers/Tab';
import Table from '@/containers/Table';
import Aside from '@/containers/Aside';
import Dialog from '@/containers/Dialog';
import Message from '@/containers/Message';
import MessageBox from '@/containers/MessageBox';
import Notification from '@/containers/Notification';
import Datepicker from '@/containers/Datepicker';
import Timepicker from '@/containers/Timepicker';

export default [
    { path: "/", name: "home", component: Home },
    { path: "/button", name: "button", component: Button },
    { path: "/input", name: "input", component: Input },
    { path: "/input-number", name: "input-number", component: InputNumber },
    { path: "/select", name: "select", component: Select },
    { path: "/radio", name: "radio", component: Radio },
    { path: "/checkbox", name: "checkbox", component: Checkbox },
    { path: "/tag", name: "tag", component: Tag },
    { path: "/icon", name: "icon", component: Icon },
    { path: "/rate", name: "rate", component: Rate },
    { path: "/collapse", name: "collapse", component: Collapse },
    { path: "/popper", name: "popper", component: Popper },
    { path: "/tooltip", name: "tooltip", component: Tooltip },
    { path: "/dropdown", name: "dropdown", component: Dropdown },
    { path: "/tab", name: "tab", component: Tab },
    { path: "/table", name: "table", component: Table },
    { path: "/aside", name: "aside", component: Aside },
    { path: "/dialog", name: "dialog", component: Dialog },
    { path: "/message", name: "message", component: Message },
    { path: "/message-box", name: "message-box", component: MessageBox },
    { path: "/notification", name: "notification", component: Notification },
    { path: "/datepicker", name: "datepicker", component: Datepicker },
    { path: "/timepicker", name: "timepicker", component: Timepicker },
];