import '../Styles/Components/PlayerSearchInfoForm.css';
import { useState } from 'react';
import { Button, Input, HStack, useRadio, useRadioGroup, Box, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    ButtonGroup} from '@chakra-ui/react';
import { FaPlaystation, FaXbox } from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi'

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps() 
    const color = props.children.color

    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _hover={{ color: color }}
          _checked={{
            bg: color,
            color: 'white',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children.icon}
        </Box>
      </Box>
    )
}

const PlayerSearchInfoForm = ({onFormSubmit, colorScheme, loading, isOpen, onClose,}) => {

    const size = 30;

    const platforms = [
        { 
            name: "PS4",
            icon: <FaPlaystation fill='currentColor' size={size}/>,
            color: '#003791',
        },
        { 
            name: "X1",
            icon: <FaXbox fill='currentColor' size={size}/>,
            color: "#379100"
        },
        { 
            name: "PC",
            icon: <MdComputer fill='currentColor' size={size}/>,
            color: "#910037"
        }
    ]

    const [username, setUsername] = useState('')
    const [platform, setPlatform] = useState('PS4')

    const handleFormSubmit = () => {
        onFormSubmit({username, platform})
        onClose()
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'PS4',
        onChange: setPlatform
    })

    const group = getRootProps()

  return (
      <>
        <FiSearch size={40} floodColor="currentColor"/>

        <Modal isOpen={isOpen} onClose={onClose} colorScheme={colorScheme} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Player Search</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <HStack spacing='15px'>
                <Input
                    height='60px'
                    id='username' 
                    type='text' 
                    placeholder='Username:'
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                <HStack spacing='15px' {...group}>
                    <ButtonGroup isAttached >
                        {platforms.map(value => {
                            const radio = getRadioProps({ value: value.name })
                            return (
                                <RadioCard key={value.name} {...radio}>
                                    {value}
                                </RadioCard>
                            )
                        })}
                    </ButtonGroup>
                </HStack>
            </HStack>
            </ModalBody>

            <ModalFooter>
            <Button 
                colorScheme={colorScheme}
                variant='outline'
                onClick={handleFormSubmit}
                isLoading={loading}
                loadingText='Fetching'
                mr={3}
            >
                Fetch Data
            </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
      </>
    
  )
}

export default PlayerSearchInfoForm




