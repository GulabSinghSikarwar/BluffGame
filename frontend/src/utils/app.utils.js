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
 export function sortCardsByRank(cards) {
    // Define the rank order
    const rankOrder = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, '10': 10, // '10' is a special case
        'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };

    // Function to extract the rank from a card
    const getRank = (card) => {
        if (card.startsWith('10')) {
            return rankOrder['10']; // Handle '10' specifically
        }
        return rankOrder[card[0]]; // For cards '2' to '9', J, Q, K, A
    };
    console.log(" cards : ", cards);
    

    // Sort the cards based on rank
    return cards.sort((a, b) => {
        return getRank(a) - getRank(b);
    });
}
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