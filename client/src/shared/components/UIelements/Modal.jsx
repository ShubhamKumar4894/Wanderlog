import React from 'react'
import './Modal.css'
import ReactDOM from 'react-dom'
import { BackDrop } from './BackDrop';

const ModalOverlay=(props)=>{
    const content=(
        <div className={`modal ${props.classname}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={
                props.onSubmit?props.onSubmit:event=>event.preventDefault()
            } >
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>

            </form>
        </div>
    );
    return ReactDOM.createPortal(content,document.getElementById('modal-hook'))
}
export const Modal = (props) => {
  return (
    <>
       <BackDrop isOpen={props.show} onClick={props.onCancel}/>
       {props.show&& <ModalOverlay {...props}/>}
    </>
  )
}
