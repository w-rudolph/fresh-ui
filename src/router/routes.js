import Home from '@/containers/Home';
import Button from '@/containers/Button';
import Input from '@/containers/Input';
import InputNumber from '@/containers/InputNumber';
import Select from '@/containers/Select';
import Radio from '@/containers/Radio';
import Checkbox from '@/containers/Checkbox';
import Switch from '@/containers/Switch';
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
import Pagination from '@/containers/Pagination';
import Badge from '@/containers/Badge';
import Slider from '@/containers/Slider';
import Form from '@/containers/Form';
import Colorpicker from '@/containers/Colorpicker';
import Progress from '@/containers/Progress';
import Timeline from '@/containers/Timeline';
import Breadcrumb from '@/containers/Breadcrumb';
import Card from '@/containers/Card';
import Tree from '@/containers/Tree';
import Carousel from '@/containers/Carousel';
import Upload from '@/containers/Upload';
import Alert from '@/containers/Alert';
import Steps from '@/containers/Steps';
import Row from '@/containers/Row';

export default [
    { path: "/", name: "home", component: Home },
    { path: "/button", name: "button", component: Button },
    { path: "/input", name: "input", component: Input },
    { path: "/input-number", name: "input-number", component: InputNumber },
    { path: "/select", name: "select", component: Select },
    { path: "/radio", name: "radio", component: Radio },
    { path: "/checkbox", name: "checkbox", component: Checkbox },
    { path: "/switch", name: "switch", component: Switch },
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
    { path: "/pagination", name: "pagination", component: Pagination },
    { path: "/badge", name: "badge", component: Badge },
    { path: "/slider", name: "slider", component: Slider },
    { path: "/form", name: "form", component: Form },
    { path: "/colorpicker", name: "colorpicker", component: Colorpicker },
    { path: "/progress", name: "progress", component: Progress },
    { path: "/timeline", name: "timeline", component: Timeline },
    { path: "/breadcrumb", name: "breadcrumb", component: Breadcrumb },
    { path: "/card", name: "card", component: Card },
    { path: "/tree", name: "tree", component: Tree },
    { path: "/carousel", name: "carousel", component: Carousel },
    { path: "/upload", name: "upload", component: Upload },
    { path: "/alert", name: "alert", component: Alert },
    { path: "/steps", name: "steps", component: Steps },
    { path: "/row", name: "row", component: Row },
];