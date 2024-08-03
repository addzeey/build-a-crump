    import { Overlay } from './Overlay';
    import { CrumpScene } from './CrumpScene';
    import "../assets/_builder.scss";
    import { useState, useCallback, useRef, useEffect } from 'react';
    import { toPng } from 'html-to-image';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faFloppyDisk, faDownload, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
    import { Tooltip } from 'react-tooltip'
    import { SelectData } from '../types';
    import { Modal } from './Modal';
    import { getSavedCrump, useUserQuery } from '../authentication';
    const defaultCrump: SelectData = {
        body: "body-1",
        hair: "hair-1",
        expression: "face-1",
        arms: "arms-1",
        legs: "legs-1",
        head: "head-1",
        accessory: "default",
        accessory2: "default",
        effect: "default",
        background: "default"
    }
    export const Builder = () => {
        const ref = useRef<HTMLDivElement>(null)
        const [isLoading, setIsLoading] = useState<{ title: string, message: string } | false>(false);
        const [crumpBody, setCrumpBody] = useState<SelectData>(defaultCrump);
        const [showNameplate, setShowNameplate] = useState(true);
        const {data: user, error: userError, isLoading: userLoading} = useUserQuery();
        const exportToImage = useCallback(async () => {
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            let dataUrl = '';
            let i = 0;
            let maxAttempts;
            if (isSafari) {
                maxAttempts = 5;
            } else {
                maxAttempts = 1;
            }
            const cycle = [];
            let repeat = true;
        
            while (repeat && i < maxAttempts) {
                dataUrl = await toPng(ref.current as HTMLDivElement, {
                    fetchRequestInit: {
                        cache: 'no-cache',
                    },
                    pixelRatio: isSafari ? 1 : 3,
                    quality: 1,
                });
                i += 1;
                cycle[i] = dataUrl.length;
        
                if (dataUrl.length > cycle[i - 1]) repeat = false;
            }
            const link = document.createElement('a');
            link.download = 'my-crump.png';
            link.href = dataUrl;
            link.click();
            setIsLoading(false);
            return dataUrl;
        }, [ref]);
        const handleSetCrumpUpdate = (data: SelectData) => {
            setCrumpBody(data);
        }
        const toggleShowNameplate = () => {
            setShowNameplate(prevShowNameplate => !prevShowNameplate);
        };
        const handleSaveCrump = () => {
            if (user && crumpBody) {
                console.log("Saving Crump");
                setIsLoading({
                    title: "Saving",
                    message: "Saving your Crump!"
                });
                getSavedCrump(crumpBody); // Call the function returned by the hook
            } else {
                console.error("User not logged in, or another error");
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
        
        useEffect(() => {
            if(user && user.crump) {
                setCrumpBody(JSON.parse(user.crump));
            } else {
                setCrumpBody(defaultCrump);
            }
        }, [user])

        return (
            <section id="build">
                <div className="build-wrap">
                    <Overlay updateCrump={handleSetCrumpUpdate} setShowNameplate={setShowNameplate} />
                    <div className="center-build">
                        <CrumpScene ref={ref} data={crumpBody} showNameplate={showNameplate} />
                        <div className="button-wrap">
                            <button data-tooltip-id="build-tooltip" data-tooltip-content={`${user ? "Save your Crump!" : "Log in to save"}`} className={`btn bounce ${user ? "" : "disabled"}`} onClick={handleSaveCrump} title='Save'><FontAwesomeIcon icon={faFloppyDisk} /></button>
                            <button data-tooltip-id="build-tooltip" data-tooltip-content={showNameplate ? "Hide Name" : "Show Name"} className='btn bounce' onClick={toggleShowNameplate} title='Name Toggle'><FontAwesomeIcon icon={showNameplate ? faEyeSlash :faEye } /></button>
                            <button data-tooltip-id="build-tooltip" data-tooltip-content="Download Your Crump!" className='btn bounce' onClick={exportToImage} title='Download'><FontAwesomeIcon icon={faDownload} /></button>
                        </div>
                    </div>
                    <Tooltip id="build-tooltip" />
                </div>
                {
                    isLoading != false ? (
                        <Modal title={isLoading.title} message={isLoading.message} />
                    ) : userLoading ? (
                        <Modal title={"Loading"} message={"Loading your save"} />
                    ) : null
                }
            </section>
        )
    }