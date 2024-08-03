import { Overlay } from './Overlay';
import { CrumpScene } from './CrumpScene';
import "../assets/_builder.scss";
import { useState, useCallback, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faDownload, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
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
};

export const Builder = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState<{ title: string, message: string } | false>(false);
    const [crumpBody, setCrumpBody] = useState<SelectData>(defaultCrump);
    const [showNameplate, setShowNameplate] = useState(true);
    const { data: user, error: userError, isLoading: userLoading } = useUserQuery();

    const exportToImage = useCallback(async () => {
        setIsLoading({ title: 'Generating Image', message: 'Please wait while we generate your image.' });

        if (ref.current) {
            try {
                const canvas = await html2canvas(ref.current, { useCORS: true, backgroundColor: null });
                const dataUrl = canvas.toDataURL('image/png');

                const link = document.createElement('a');
                link.download = 'my-crump.png';
                link.href = dataUrl;
                link.click();

            } catch (error) {
                console.error('Error generating image:', error);
            }
        }

        setIsLoading(false);
    }, [ref]);

    const handleSetCrumpUpdate = (data: SelectData) => {
        setCrumpBody(data);
    };

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
    };

    useEffect(() => {
        if (user && user.crump) {
            setCrumpBody(JSON.parse(user.crump));
        } else {
            setCrumpBody(defaultCrump);
        }
    }, [user]);

    return (
        <section id="build">
            <div className="build-wrap">
                <Overlay updateCrump={handleSetCrumpUpdate} setShowNameplate={setShowNameplate} />
                <div className="center-build">
                    <CrumpScene ref={ref} data={crumpBody} showNameplate={showNameplate} />
                    <div className="button-wrap">
                        <button data-tooltip-id="build-tooltip" data-tooltip-content={`${user ? "Save your Crump!" : "Log in to save"}`} className={`btn bounce ${user ? "" : "disabled"}`} onClick={handleSaveCrump} title='Save'><FontAwesomeIcon icon={faFloppyDisk} /></button>
                        <button data-tooltip-id="build-tooltip" data-tooltip-content={showNameplate ? "Hide Name" : "Show Name"} className='btn bounce' onClick={toggleShowNameplate} title='Name Toggle'><FontAwesomeIcon icon={showNameplate ? faEyeSlash : faEye} /></button>
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
    );
};
