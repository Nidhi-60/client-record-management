import Datas from "../components/Datas";
import UploadJSON from "../components/UploadJson";

export const NAVBAR = [
  { name: "JSON Data", link: "/datas" },
  { name: "Upload File", link: "/upload-json" },
];

export const THEAD = ["Email", "Name"];

export const ROUTES = [
  { link: "datas", component: <Datas /> },
  { link: "upload-json", component: <UploadJSON /> },
];
