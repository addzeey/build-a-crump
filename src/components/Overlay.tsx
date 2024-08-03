import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPerson, faScissors, faHand, faRing, faSocks, faCircleXmark, faSkull, faWandSparkles, faImage } from '@fortawesome/free-solid-svg-icons';
import { item, CrumpData, SelectData} from '../types';
import { Tooltip } from "react-tooltip";
import { useUserQuery } from "../authentication";
import { Modal } from "./Modal";
import { crumpHair, crumpBody, crumpFace, crumpArms, crumpLegs, crumpHead, crumpAccs, crumpEffect, crumpBackground } from "../data";

type UpdateCrump = (data: SelectData) => void;
type setShowNameplate = (value: boolean) => void;
export const Overlay: React.FC<{ updateCrump: UpdateCrump, setShowNameplate: setShowNameplate }> = ({ updateCrump, setShowNameplate }) => {
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
    const [selectedBackground, setSelectedBackground] = useState<string>("");


    useEffect(() => {
        if(user && user.crump && saveLoaded === false) {
            // map over crump data and set the state for each part
            const { accessory, hair, expression, head, accessory2, arms, body, legs, effect, background } = JSON.parse(user.crump);
            setSelectedHair(hair);
            setSelectedBody(body);
            setSelectedExpression(expression);
            setSelectedArm(arms);
            setSelectedHead(head);
            setSelectedAcc(accessory);
            setSelectedAcc2(accessory2);
            setSelectedLegs(legs);
            setSelectedEffect(effect);
            setSaveLoaded(true);
            setSelectedBackground(background);
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
                background: selectedBackground || "default"
            });
        }

    }, [selectedHair, selectedBody, selectedExpression, selectedArm, selectedLegs, selectedHead, selectedAcc, selectedEffect, selectedAcc2, selectedBackground, user]);
    const handleSelection = (type: string, itemId: string) => {
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
            case "background":
                setSelectedBackground(itemId);
                break;
            default:
                break;
        }
        setSelectMenu(null);
    };


    const toggleSelectionMenu = (type: string, data: any) => {
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
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Arms" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("arms", crumpArms)}>
                        <FontAwesomeIcon className="icon" icon={faHand} />
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
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Legs" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("legs", crumpLegs)}>
                        <FontAwesomeIcon className="icon" icon={faSocks} />
                    </li>
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Effects" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("effect", crumpEffect)}>
                        <FontAwesomeIcon className="icon" icon={faWandSparkles} />
                    </li>
                    <li data-tooltip-id="build-tooltip" data-tooltip-content="Background" data-tooltip-place="left" 
                        className="control bounce" onClick={() => toggleSelectionMenu("background", crumpBackground)}>
                        <FontAwesomeIcon className="icon" icon={faImage} />
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
                        selectMenu.map((item: any, index: number) => {
                            if (item.block !== menutype) {
                                return (
                                    <li
                                        className="item bounce"
                                        key={item.id || index} // Use item.id if available, otherwise fallback to index
                                        data-tooltip-id="item-tooltip"
                                        data-tooltip-content={item.name}
                                        data-tooltip-place="top"
                                        onClick={() => handleSelection(menutype, item.id)}
                                        title={item.name} // Assuming item.name is a string
                                    >
                                        <img
                                            src={`/assets/images/crumps/${menutype === "accessory2" ? "accessory" : menutype}/icons/${item.id}.png`}
                                            alt={item.name} // Added alt text
                                            className="crump-part"
                                        />
                                    </li>
                                );
                            }
                            return null;
                        }) as (JSX.Element | null)[]
}
                        </ul>
                        <Tooltip id="item-tooltip" />
                    </div>
                </div>
            )}
            {
                userLoading ? (
                    <Modal title="Loading" message="Loading your Crump!" />
                ) : null
            }
        </div>
    );
};
