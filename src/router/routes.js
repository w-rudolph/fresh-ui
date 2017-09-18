import Home from '@/containers/Home';
import Button from '@/containers/Button';
import Input from '@/containers/Input';
import Radio from '@/containers/Radio';
import Checkbox from '@/containers/Checkbox';
import Tag from '@/containers/Tag';
import Rate from '@/containers/Rate';
import Collapse from '@/containers/Collapse';
import ICon from '@/containers/ICon';
import Popper from '@/containers/Popper';
import Tooltip from '@/containers/Tooltip';
import Dropdown from '@/containers/Dropdown';
import Tab from '@/containers/Tab';
import Aside from '@/containers/Aside';
import Dialog from '@/containers/Dialog';
import Message from '@/containers/Message';

export default [
    { path: "/", name: "home", component: Home },
    { path: "/button", name: "button", component: Button },
    { path: "/input", name: "input", component: Input },
    { path: "/radio", name: "radio", component: Radio },
    { path: "/checkbox", name: "checkbox", component: Checkbox },
    { path: "/tag", name: "tag", component: Tag },
    { path: "/rate", name: "rate", component: Rate },
    { path: "/collapse", name: "collapse", component: Collapse },
    { path: "/popper", name: "popper", component: Popper },
    { path: "/tooltip", name: "tooltip", component: Tooltip },
    { path: "/dropdown", name: "dropdown", component: Dropdown },
    { path: "/tab", name: "tab", component: Tab },
    { path: "/aside", name: "aside", component: Aside },
    { path: "/dialog", name: "dialog", component: Dialog },
    { path: "/message", name: "message", component: Message },
];