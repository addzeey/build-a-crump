import { LegacyRef, useEffect, useState, useRef, forwardRef } from "react";

type CrumpData = {
    body: string;
    hair: string;
    expression: string;
    legs: string;
    arms: string;
    head: string;
};

type Props = {
    data: CrumpData;
};

export const CrumpScene = forwardRef(function CrumpScene(props: Props, ref : LegacyRef<HTMLDivElement>) {
    const [crumpBuild, setCrumpBuild] = useState<CrumpData>({
        body: "body-1",
        hair: "hair-1",
        expression: "face-1",
        legs: "legs-1",
        arms: "arms-1",
        head: "head-1",
    });
    useEffect(() => {
        const { data } = props;
        console.table(data);
        
        setCrumpBuild(data);
    }, [props]);
    return (
        <div className="crump">
            <div ref={ref} className="crump-export">
            <img src={`/assets/images/crumps/hair/${crumpBuild.hair}.png`} alt="" className="crump-part hair-crump" />
            <img src={`/assets/images/crumps/face/${crumpBuild.expression}.png`} alt="" className="crump-part face-crump" />
            <img src={`/assets/images/crumps/head/${crumpBuild.head}.png`} alt="" className="crump-part head-crump" />
            <img src={`/assets/images/crumps/arms/${crumpBuild.arms}.png`} alt="" className="crump-part arms-crump" />
            <img src={`/assets/images/crumps/legs/${crumpBuild.legs}.png`} alt="" className="crump-part legs-crump" />
            <img src={`/assets/images/crumps/body/${crumpBuild.body}.png`} alt="" className="crump-part base-crump" />
            </div>
        </div>
    );
});