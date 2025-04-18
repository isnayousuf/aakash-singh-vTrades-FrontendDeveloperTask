import {ReactNode} from "react"
import PrimaryButton from "./PrimaryButton"

interface CustomModalProps  {
  showModal:boolean,
  closeModal: () =>void,
  modalIcon: ReactNode,
  modalHeading: string,
  modalSubHeading?: string,
  ctaLabel?: string,
  }

const CustomModal = ({showModal, closeModal, modalIcon, modalHeading, modalSubHeading, ctaLabel="Okay"}: CustomModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // If the user clicks directly on the overlay (not on modal content) close it
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  
  return (
    <div>
       {showModal && (
        <div className="modal-backdrop" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-icon-container">{modalIcon}</div>
            <p className="modal-heading">{modalHeading}</p>
            {modalSubHeading && <p className="modal-text">{modalSubHeading}</p>}
            <div className="cta-container">
             <PrimaryButton label={ctaLabel} onClick={closeModal} isFullWidth={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomModal
