import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'

const InformationModal = ({ isOpen, onClose, colorScheme }) => {
  return (
    <>
      <FiInfo size={40} floodColor="currentColor"/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About The Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              Thank you Hugo at apexlegendsapi, without you none of this would have been possible. 
              You are truly doing the lord's work. This website was made with the Chakra library. 
              If you haven't used it yet, go check it out, it's amazing.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={colorScheme} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InformationModal