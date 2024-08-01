import { LegacyRef, useEffect, useState, useRef, forwardRef } from "react";
import { useUserQuery } from "../authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SelectData } from "../types";

type Props = {
    data: SelectData;
};
export const CrumpScene = forwardRef(function CrumpScene(props: Props, ref : LegacyRef<HTMLDivElement>) {
    const { data: user, error, isLoading } = useUserQuery();
    const [customName, setCustomName] = useState<string>("");
    const [crumpBuild, setCrumpBuild] = useState<SelectData>({
        accessory: "accessory-1",
        hair: "hair-1",
        expression: "face-1",
        head: "head-1",
        accessory2: "accessory-1",
        arms: "arms-1",
        body: "body-1",
        legs: "legs-1",
        effect: "effect-1",
        background: "background-1",
    });
    useEffect(() => {
        const { data } = props;
        setCrumpBuild(data);
    }, [props, user]);
    const changeName = () => {
        const name = prompt("Enter a name for your crump");
        if(name) {
            setCustomName(name);
        }
    }
    return (
        <div className="crump">
            <div ref={ref} className={`crump-export crump-bg`} style={{backgroundImage: `url(/assets/images/crumps/background/${crumpBuild.background}.png)`}}>
            <img src={`/assets/images/crumps/nameplates/shelve_nplate.png`} alt="" className="nameplate-image" />
            <img src={`/assets/images/crumps/effect/${crumpBuild.effect}.png`} alt="" className="crump-part effect-crump" />
            <img src={`/assets/images/crumps/accessory/${crumpBuild.accessory}.png`} alt="" className="crump-part acc-crump" />
            <img src={`/assets/images/crumps/hair/${crumpBuild.hair}.png`} alt="" className="crump-part hair-crump" />
            <img src={`/assets/images/crumps/face/${crumpBuild.expression}.png`} alt="" className="crump-part face-crump" />
            <img src={`/assets/images/crumps/head/${crumpBuild.head}.png`} alt="" className="crump-part head-crump" />
            <img src={`/assets/images/crumps/accessory/${crumpBuild.accessory2}.png`} alt="" className="crump-part acc2-crump" />
            <img src={`/assets/images/crumps/arms/${crumpBuild.arms}.png`} alt="" className="crump-part arms-crump" />
            <img src={`/assets/images/crumps/body/${crumpBuild.body}.png`} alt="" className="crump-part base-crump" />
            <img src={`/assets/images/crumps/legs/${crumpBuild.legs}.png`} alt="" className="crump-part legs-crump" />
            {
                    <div className="nameplate">
                        {
                            customName ? (
                                <span>{customName}</span>
                            ) : user && user.nickname ? (
                                <span>{user.nickname}</span>
                            ) : (
                                <span>Click to change</span>
                            )
                        }
                        <FontAwesomeIcon className="name-change" onClick={changeName} icon={faPenToSquare} />
                    </div>
            }
            </div>
        </div>
    );
});