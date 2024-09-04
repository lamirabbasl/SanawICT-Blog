import { GoPackage } from "react-icons/go";
import { AiFillProduct } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { LuFolderInput } from "react-icons/lu";
import { LuFolderOutput } from "react-icons/lu";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdManageAccounts } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

const iconMap: { [key: string]: React.ComponentType } = {
  profile: GoPackage,
  category: AiFillProduct,
  articles: MdLocationOn,
  notifications: MdOutlineShoppingCart,
  orders: FiShoppingBag,
  inputs: LuFolderInput,
  outputs: LuFolderOutput,
  move: LiaExchangeAltSolid,
  manage_users: MdManageAccounts,
};

export default iconMap;
