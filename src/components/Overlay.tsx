import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPerson, faScissors, faHand, faRing, faSocks, faCircleXmark, faSkull, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { item, CrumpData, SelectData} from '../types';
import { Tooltip } from "react-tooltip";
import { useUserQuery } from "../authentication";
const crumpHair: item[] = [
    { name: "default", id: "hair-1", type: "hair", icon: "" },
    { name: "emo", id: "hair-2", type: "hair", icon: "" },
    { name: "double buns", id: "hair-3", type: "hair", icon: "" },
    { name: "flip", id: "hair-4", type: "hair", icon: "" },
    { name: "middle bun", id: "hair-5", type: "hair", icon: "" },
    { name: "middle split", id: "hair-6", type: "hair", icon: "" },
    { name: "short middle split", id: "hair-7", type: "hair", icon: "" },
    { name: "almond", id: "hair-8", type: "hair", icon: "" },
    { name: "puppy girl", id: "hair-9", type: "hair", icon: "" },
    { name: "meat bun", id: "hair-10", type: "hair", icon: "" },
    { name: "miku", id: "hair-11", type: "hair", icon: "" },
    { name: "pink", id: "hair-12", type: "hair", icon: "" },
];
const crumpBody: item[] = [
    { name: "default", id: "body-1", type: "body", icon: "" },
    { name: "overall", id: "body-2", type: "body", icon: "" },
    { name: "angel wings", id: "body-3", type: "body", icon: "" },
    { name: "cat tail", id: "body-4", type: "body", icon: "" },
    { name: "crumpet wings", id: "body-5", type: "body", icon: "" },
    { name: "fluffy tail", id: "body-6", type: "body", icon: "" },
    { name: "fox tail", id: "body-7", type: "body", icon: "" },
    { name: "purple wings", id: "body-8", type: "body", icon: "" },
]
const crumpFace: item[] = [
    { name: "default", id: "face-1", type: "expression", icon: "" },
    { name: "smile", id: "face-2", type: "expression", icon: "" },
    { name: "angry", id: "face-3", type: "expression", icon: "" },
    { name: "chill", id: "face-4", type: "expression", icon: "" },
    { name: "cry", id: "face-5", type: "expression", icon: "" },
    { name: "eat", id: "face-6", type: "expression", icon: "" },
    { name: "happy", id: "face-7", type: "expression", icon: "" },
    { name: "meh", id: "face-8", type: "expression", icon: "" },
    { name: "wink", id: "face-9", type: "expression", icon: "" },
    { name: "xdd", id: "face-10", type: "expression", icon: "" },


];
const crumpArms: item[] = [
    { name: "default", id: "arms-1", type: "arms", icon: "" },
    { name: "cheese", id: "arms-2", type: "arms", icon: "" },
    { name: "clover", id: "arms-3", type: "arms", icon: "" },
    { name: "infront", id: "arms-4", type: "arms", icon: "" },
    { name: "dice", id: "arms-5", type: "arms", icon: "" },
    { name: "flower", id: "arms-6", type: "arms", icon: "" },
    { name: "mango", id: "arms-7", type: "arms", icon: "" },
    { name: "nut", id: "arms-8", type: "arms", icon: "" },
    { name: "rock", id: "arms-9", type: "arms", icon: "" },
    { name: "bob", id: "arms-10", type: "arms", icon: "" },
    { name: "worm", id: "arms-11", type: "arms", icon: "" },
    { name: "knife", id: "arms-12", type: "arms", icon: "" },
];
const crumpLegs: item[] = [
    { name: "default", id: "legs-1", type: "legs", icon: "" },
    { name: "toe", id: "legs-2", type: "legs", icon: "" },
]
const crumpHead: item[] = [
    { name: "default", id: "head-1", type: "head", icon: "" },
    { name: "fox", id: "head-2", type: "head", icon: "" },
    { name: "dog", id: "head-3", type: "head", icon: "" },
    { name: "crumpet wings", id: "head-4", type: "head", icon: "" },
    { name: "cat", id: "head-5", type: "head", icon: "" },

]
const crumpAccs: item[] = [
    { name: "default", id: "", type: "effect", icon: "" },
    { name: "beak", id: "accessory-1", type: "head", icon: "" },
    { name: "collar", id: "accessory-2", type: "head", icon: "" },
    { name: "glasses", id: "accessory-3", type: "head", icon: "" },
    { name: "leaf", id: "accessory-4", type: "head", icon: "" },
    { name: "moon", id: "accessory-5", type: "head", icon: "" },
    { name: "pig nose", id: "accessory-6", type: "head", icon: "" },
    { name: "sunglasses", id: "accessory-7", type: "head", icon: "" },
]
const crumpEffect: item[] = [
    { name: "default", id: "", type: "effect", icon: "" },
    { name: "bubbles", id: "effect-1", type: "effect", icon: "" },
    { name: "confetti", id: "effect-2", type: "effect", icon: "" },
    { name: "fire ring", id: "effect-3", type: "effect", icon: "" },
    { name: "hand drawn star", id: "effect-4", type: "effect", icon: "" },
    { name: "hearts", id: "effect-5", type: "effect", icon: "" },
    { name: "hydrangaieiaia", id: "effect-6", type: "effect", icon: "" },
    { name: "sakura", id: "effect-7", type: "effect", icon: "" },
    { name: "sparkle", id: "effect-8", type: "effect", icon: "" },
    { name: "stars", id: "effect-9", type: "effect", icon: "" },
    { name: "strawberry ring", id: "effect-10", type: "effect", icon: "" },
    { name: "sunflower", id: "effect-11", type: "effect", icon: "" },
    { name: "sweat", id: "effect-12", type: "effect", icon: "" },
    { name: "wistera", id: "effect-13", type: "effect", icon: "" },
]
type UpdateCrump = (data: SelectData) => void;
// {
//     accessory: string;
//     hair: string;
//     expression: string;
//     head: string;
//     accessory2: string;
//     arms: string;
//     body: string;
//     legs: string;
//     effect: string;
// }
export const Overlay: React.FC<{ updateCrump: UpdateCrump }> = ({ updateCrump }) => {
    const [saveLoaded, setSaveLoaded] = useState<boolean>(false);
    const {data: user, error: userError, isLoading: userLoading} = useUserQuery();
    const [selectMenu, setSelectMenu] = useState<CrumpData | null>(null);
    const [menutype, setMenuType] = useState<string>("");
    const [selectedHair, setSelectedHair] = useState<string>("");
    const [selectedBody, setSelectedBody] = useState<string>("");
    const [selectedExpression, setSelectedExpression] = useState<string>("");
    const [selectedArm, setSelectedArm] = useState<string>("");
    const [selectedHead, setSelectedHead] = useState<string>("");
    const [selectedLegs, setSelectedLegs] = useState<string>("");
    const [selectedAcc, setSelectedAcc] = useState<string>("");
    const [selectedAcc2, setSelectedAcc2] = useState<string>("");
    const [selectedEffect, setSelectedEffect] = useState<string>("");


    useEffect(() => {
        if(user && user.crump && saveLoaded === false) {
            updateCrump(JSON.parse(user.crump));
            setSaveLoaded(true);
        } else {
            updateCrump({
                accessory: selectedAcc  || "",
                hair: selectedHair || "hair-1",
                expression: selectedExpression || "face-1",
                head: selectedHead || "head-1",
                accessory2: selectedAcc2 || "",
                arms: selectedArm || "arms-1",
                body: selectedBody || "body-1",
                legs: selectedLegs || "legs-1",
                effect: selectedEffect  || "",
            });
        }

    }, [selectedHair, selectedBody, selectedExpression, selectedArm, selectedLegs, selectedHead, selectedAcc, selectedEffect, selectedAcc2, user]);
    const handleSelection = (type: string, itemId: string) => {
        console.log(itemId);
        
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
            case "accessory":
                setSelectedAcc(itemId);
                break;
            case "effect":
                setSelectedEffect(itemId);
                break;
            case "accessory2":
                setSelectedAcc2(itemId);
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
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Head" data-tooltip-place="right"
                        className="control bounce" onClick={() => toggleSelectionMenu("head", crumpHead)}>
                        <FontAwesomeIcon className="icon" icon={faSkull} />
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
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Accessory 2" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("accessory2", crumpAccs)}>
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
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Effects" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("effect", crumpEffect)}>
                        <FontAwesomeIcon className="icon" icon={faWandSparkles} />
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
