import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WarningModel({setModelShow, modelShow, header, content, saveBtnName, saveBtnClasses, requiredFn }) {

  const handleClose = () => setModelShow(false);
  const handleSave = () => {
    requiredFn();
  };

  return (
    <>
      <Modal show={modelShow} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title><h5 className='mt-2'>{header}</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body><p className='my-2'>{content}</p></Modal.Body>
        <Modal.Footer>
          <Button className='px-3 fs-14' variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className={`${saveBtnClasses}`} onClick={handleSave}>
            {saveBtnName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WarningModel;