import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPerson, faScissors, faHand, faRing, faSocks, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { item, CrumpData, SelectData} from '../types';
import { Tooltip } from "react-tooltip";
// {
//     body: [{ name: "default", id: "body-1", type: "body", icon: "" }],
//     hair: [{ name: "default", id: "hair-1", type: "hair", icon: "" }],
//     expression: [{ name: "default", id: "face-1", type: "expression", icon: "" }],
//     arms: [{ name: "default", id: "arms-1", type: "arms", icon: "" }],
//     legs: [{ name: "default", id: "legs-1", type: "legs", icon: "" }],
//     head: [{ name: "default", id: "head-1", type: "head", icon: "" }],
//     accessory: [{ name: "default", id: "accessory-1", type: "head", icon: "" }],
// }
const crumpHair: item[] = [
    { name: "default", id: "hair-1", type: "hair", icon: "" },
    { name: "emote", id: "hair-2", type: "hair", icon: "" },
    { name: "buns", id: "hair-3", type: "hair", icon: "" },
];

const crumpBody: item[] = [
    { name: "default", id: "body-1", type: "body", icon: "" }
]
const crumpFace: item[] = [
    { name: "default", id: "face-1", type: "expression", icon: "" },
    { name: "happy", id: "face-2", type: "expression", icon: "" },
    { name: "shocked", id: "face-3", type: "expression", icon: "" },
];
const crumpArms: item[] = [
    { name: "default", id: "arms-1", type: "arms", icon: "" }
];
const crumpLegs: item[] = [
    { name: "default", id: "legs-1", type: "legs", icon: "" }
]
const crumpHead: item[] = [
    { name: "default", id: "head-1", type: "head", icon: "" }
]
const crumpAccs: item[] = [
    { name: "default", id: "accessory-1", type: "head", icon: "" }
]
type UpdateCrump = (data: SelectData) => void;

export const Overlay: React.FC<{ updateCrump: UpdateCrump }> = ({ updateCrump }) => {
    const [selectMenu, setSelectMenu] = useState<CrumpData | null>(null);
    const [menutype, setMenuType] = useState<string>("");
    const [selectedHair, setSelectedHair] = useState<string>("");
    const [selectedBody, setSelectedBody] = useState<string>("");
    const [selectedExpression, setSelectedExpression] = useState<string>("");
    const [selectedArm, setSelectedArm] = useState<string>("");
    const [selectedHead, setSelectedHead] = useState<string>("");
    const [selectedLegs, setSelectedLegs] = useState<string>("");
    const [selectedAcc, setSelectedAcc] = useState<string>("");

    useEffect(() => {
        updateCrump({
            body: selectedBody || "body-1",
            hair: selectedHair || "hair-1",
            expression: selectedExpression || "face-1",
            arms: selectedArm || "arms-1",
            legs: selectedLegs || "legs-1",
            head: selectedHead || "head-1",
            accessory: selectedAcc  || "accessory-1",
        });
    }, [selectedHair, selectedBody, selectedExpression, selectedArm, selectedLegs, selectedHead, selectedAcc]);

    const handleSelection = (type: string, itemId: string) => {
        console.log(type, itemId);
        
        switch (type) {
            case "hair":
                setSelectedHair(itemId);
                break;
            case "body":
                setSelectedBody(itemId);
                break;
            case "face":
                setSelectedExpression(itemId);
                break;
            case "arms":
                setSelectedArm(itemId);
                break;
            case "legs":
                setSelectedLegs(itemId);
                break;
            case "head":
                setSelectedHead(itemId);
                break;
            default:
                break;
        }
        setSelectMenu(null);
    };


    const toggleSelectionMenu = (type: string, data: any) => {
        console.log(data);

        if (selectMenu === null) {
            setMenuType(type);
            setSelectMenu(data);
        } else {
            setMenuType("");
            setSelectMenu(null);
        }
    };

    return (
        <div className="panel-overlay">
            <div className="left-panel">
                <ul className="controls">
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Hair" data-tooltip-place="right"
                        className="control bounce" onClick={() => toggleSelectionMenu("hair", crumpHair)}>
                        <FontAwesomeIcon className="icon" icon={faScissors} />
                    </li>
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Face / Expression" data-tooltip-place="right" 
                        className="control bounce" onClick={() => toggleSelectionMenu("face", crumpFace)}>
                        <FontAwesomeIcon className="icon" icon={faSmile} />
                    </li>
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Body" data-tooltip-place="right" 
                        className="control bounce" onClick={() => toggleSelectionMenu("body", crumpBody)}>
                        <FontAwesomeIcon className="icon" icon={faPerson} />
                    </li>
                </ul>
            </div>
            <div className="right-panel">
                <ul className="controls">
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Accessory" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("accessory", crumpAccs)}>
                        <FontAwesomeIcon className="icon" icon={faRing} />
                    </li>
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Arms" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("arms", crumpArms)}>
                        <FontAwesomeIcon className="icon" icon={faHand} />
                    </li>
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Legs" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("legs", crumpLegs)}>
                        <FontAwesomeIcon className="icon" icon={faSocks} />
                    </li>
                </ul>
            </div>
            {selectMenu && (
                <div className="menu-overlay">
                    <div className="select-menu">
                        <FontAwesomeIcon className="close-menu" onClick={() => setSelectMenu(null)} icon={faCircleXmark} />
                        <h4 className="title">Select your {menutype}</h4>
                        <ul>
                            {
                                selectMenu.map((item: any, index: number) => (
                                    <li className="item bounce" key={index}
                                        data-tooltip-id="item-tooltip"
                                        data-tooltip-content={item.name}
                                        data-tooltip-place="top"
                                        onClick={() => handleSelection(menutype, item.id)}
                                        title={item}
                                    >
                                        <img src={`/assets/images/crumps/${menutype}/icons/${item.id}.png`} alt="" className="crump-part" />
                                    </li>
                                ))
                            }
                        </ul>
                        <Tooltip id="item-tooltip" />
                    </div>
                </div>
            )}
        </div>
    );
};
