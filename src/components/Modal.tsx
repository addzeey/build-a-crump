import crumpies from '../assets/images/cumpies.gif';
export const Modal = ({ title, message } : {title: string, message: string}) => {
    return (
        <div className="modal-overlay">
        <div className="load-modal">
            <img src={crumpies} alt="" />
            <h2>{title}</h2>
            <p className="message">{message}</p>
        </div>
        </div>
    );
}