import InforIcon from "../components/utils/InfoIcon/InforIcon";
import SuccessIcon from "../components/utils/SuccessIcon/SuccessIcon";
import WarningIcon from "../components/utils/WarningIcon/WarningIcon";

const { ButtonTypes } = require("./app.enum");

export const getButtonClass = (type) => {
    switch (type) {
        case ButtonTypes.SUCCESS:
            return "text-white bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800";
        case ButtonTypes.INFO:
            return "text-white bg-blue-600 hover:bg-blue-800 focus:ring-blue-300 dark:focus:ring-blue-800";
        case ButtonTypes.WARNING:
        default:
            return "text-white bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800";
    }
};

export const getStatusIcon = (type) => {
    switch (type) {
        case ButtonTypes.INFO:
            return <InforIcon />;
        case ButtonTypes.SUCCESS:
            return <SuccessIcon />;
        case ButtonTypes.WARNING:
        default:
            return <WarningIcon />;
    }
}