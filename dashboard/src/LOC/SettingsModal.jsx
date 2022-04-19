import { FiSettings } from 'react-icons/fi';
import { Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, HStack, useRadio, useRadioGroup, Box } from '@chakra-ui/react'

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
    
    const input = getInputProps()
    const checkbox = getCheckboxProps()

    const hoverColor = props.children.color + '.' + props.children.code
    const selectedColor = props.children.color + '.' + (parseInt(props.children.code) + 100)
    
    return (
        <Box as='label'>
        <input {...input} />
        <Box
            {...checkbox}
            cursor='pointer'
            borderWidth='1px'
            borderRadius='md'
            boxShadow='md'
            _hover={{
                bg: hoverColor,
                color: 'white'
            }}
            _checked={{
                bg: selectedColor,
                color: 'white',
            }}
           
            px={5}
            py={3}
        >
            {props.children.color}
        </Box>
        </Box>
    )
}

const SettingsModal = ({ isOpen, onClose, changeThemeColor, colorScheme}) => {

    const options = [
        {
            color: 'red',
            code: '400'
        }, 
        {
            color: 'orange',
            code: '400'
        },
        {
            color: 'green',
            code: '400'
        },
        {
            color: 'blue',
            code: '400'
        },
        {
            color: 'purple',
            code: '400'
        }]

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'purple',
        onChange: changeThemeColor,
    })

    const group = getRootProps()

  return (
    <>
    <FiSettings size={40} floodColor="currentColor"/>
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Change Theme:</Text>
            <HStack {...group}>
            {options.map((value) => {
                const radio = getRadioProps({ value: value.color })
                return (
                <RadioCard key={value.color} {...radio}>
                    {value}
                </RadioCard>
                )
            })}
            </HStack>
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

export default SettingsModal