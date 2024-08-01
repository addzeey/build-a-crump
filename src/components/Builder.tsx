    import { Overlay } from './Overlay';
    import { CrumpScene } from './CrumpScene';
    import "../assets/_builder.scss";
    import { useState, useCallback, useRef, useEffect } from 'react';
    import { toPng } from 'html-to-image';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faFloppyDisk, faDownload } from '@fortawesome/free-solid-svg-icons';
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
        const {data: user, error: userError, isLoading: userLoading} = useUserQuery();
        const exportToImage = useCallback(() => {
            if (ref.current === null) {
                return;
            }
            setIsLoading({
                title: "Exporting",
                message: "Building your Crump!"
            });
            toPng(ref.current, { cacheBust: true })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'my-crump.png';
                    link.href = dataUrl;
                    link.click();
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        }, [ref]);
        const handleSetCrumpUpdate = (data: SelectData) => {
            setCrumpBody(data);
        }

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
                    <Overlay updateCrump={handleSetCrumpUpdate} />
                    <div className="center-build">
                        <CrumpScene ref={ref} data={crumpBody} />
                        <div className="button-wrap">
                            <button data-tooltip-id="build-tooltip" data-tooltip-content={`${user ? "Save your Crump!" : "Log in to save"}`} className={`btn bounce ${user ? "" : "disabled"}`} onClick={handleSaveCrump} title='Save'><FontAwesomeIcon icon={faFloppyDisk} /></button>
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