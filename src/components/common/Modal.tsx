import './modal.css'

interface IProps {
  onModalClose: () => void
  windowSize?: {width: string; height: string}
  children: React.ReactNode
}

export function Modal({onModalClose, windowSize, children}: IProps) {
  return (
    <div className='modal' onClick={onModalClose}>
      <div style={windowSize} className='modalContent' onClick={(e) => e.stopPropagation()}>
        <span className='modalCloseButton' onClick={onModalClose}>
          x
        </span>
        {children}
      </div>
    </div>
  )
}
