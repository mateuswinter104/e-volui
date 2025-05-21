"use client";

import {
  RiMapLine,
  RiCustomerService2Line,
  RiFileChartLine,
  RiDatabase2Line,
  RiToolsFill,
  RiSettings3Line,
  RiUserAddLine,
  RiSearchLine,
  RiFilter2Line,
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiArrowDropDownLine,
  RiDeleteBin7Line,
  RiArrowDropUpLine,
  RiBuildingLine,
  RiUserLine,
  RiGroupLine,
  RiArrowRightDoubleFill,
  RiArrowRightLine,
  RiArrowLeftDoubleFill,
  RiCpuLine,
  RiExternalLinkLine,
  RiSimCard2Line,
  RiCloseFill,
  RiAddFill,
  RiCarLine,
  RiSteering2Line,
  RiInfoI,
  RiCheckFill,
  RiInformationLine,
  RiHardDrive3Line,
  RiSignalTowerFill,
  RiBaseStationLine,
  RiRoadMapLine,
  RiHeadphoneLine,
  RiSave2Line,
  RiPencilLine,
  RiNotification2Line,
  RiRefreshLine,
  RiLoginCircleLine,
  RiUpload2Line,
  RiArrowLeftLine,
  RiAddLine,
  RiSave3Line,
  RiArrowLeftSLine,
  RiMenuLine,
  RiImageLine,
  RiArticleLine,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiShareFill,
  RiMenLine,
  RiWomenLine,
} from "react-icons/ri";
import { BsImageAlt } from "react-icons/bs";
import { TbFileExport } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import {
  FaEllipsis,
  FaChevronLeft,
  FaArrowRightArrowLeft,
  FaArrowsRotate,
} from "react-icons/fa6";
import { FiRadio } from "react-icons/fi";
import { LuGroup } from "react-icons/lu";
import { PiUserCircleFill } from "react-icons/pi";

interface IconProps {
  name: keyof typeof iconComponents;
  size?: number;
  onClick?: () => void;
  className?: string;
  fill?: string;
}

const iconComponents: Record<string, React.ElementType> = {
  RiMapLine,
  RiCustomerService2Line,
  RiFileChartLine,
  RiDatabase2Line,
  RiBuildingLine,
  RiToolsFill,
  RiSettings3Line,
  RiUserAddLine,
  RiSearchLine,
  RiFilter2Line,
  FaChevronLeft,
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  FaEllipsis,
  RiDeleteBin7Line,
  FaChevronDown,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiUserLine,
  RiGroupLine,
  FaArrowRightArrowLeft,
  RiArrowRightDoubleFill,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiArrowLeftDoubleFill,
  RiCpuLine,
  FaArrowsRotate,
  RiExternalLinkLine,
  RiSimCard2Line,
  RiCloseFill,
  RiAddFill,
  FiRadio,
  RiCarLine,
  RiSteering2Line,
  RiInfoI,
  RiCheckFill,
  LuGroup,
  RiInformationLine,
  RiHardDrive3Line,
  RiSignalTowerFill,
  RiBaseStationLine,
  RiRoadMapLine,
  RiHeadphoneLine,
  RiSave2Line,
  RiPencilLine,
  TbFileExport,
  RiNotification2Line,
  RiRefreshLine,
  PiUserCircleFill,
  RiLoginCircleLine,
  RiUpload2Line,
  RiAddLine,
  RiSave3Line,
  RiArrowLeftSLine,
  RiMenuLine,
  RiImageLine,
  RiArticleLine,
  BsImageAlt,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiShareFill,
  RiWomenLine,
  RiMenLine,
};

const Icon: React.FC<IconProps> = ({
  name,
  size,
  onClick,
  className,
  fill,
}: IconProps) => {
  const SelectedIcon = iconComponents[name];

  if (!SelectedIcon) {
    return null;
  }

  return (
    <SelectedIcon
      className={`${className} ${onClick ? "clickable" : ""}`}
      size={size || "24px"}
      onClick={onClick}
      fill={fill || "gray"}
    />
  );
};

export default Icon;
