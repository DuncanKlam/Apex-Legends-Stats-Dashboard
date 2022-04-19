import '../Styles/Components/LegendList.css'
import { Flex, Skeleton, Image, Heading, Text, VStack} from '@chakra-ui/react'

const LegendListCard = ({ data, isLoading, onClick, colorScheme }) => {
    
    const legendsData = data[1].data || [];

    return (
        <Flex justify='flex-start' align='center' gap='55px' _hover={{ bg: colorScheme+'.200' }} onClick={()=>{onClick(data)}}>
            <Skeleton isLoaded={!isLoading}>
                <Image boxSize='120px'
                objectFit='cover'
                src={data[1].ImgAssets.icon}
                alt='Arenas Rank' />
            </Skeleton>
            <VStack>
                <Skeleton isLoaded={!isLoading}>
                    <Heading as='h3' size='xl'>{data[0]}</Heading>
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                    <Text>Number of Trackers: {legendsData.length}</Text>
                </Skeleton>
            </VStack>
        </Flex>
    )
}


const LegendList = ({ data, isLoading, onClick, colorScheme }) => {
    data.sort()
  return (
    <Flex flex={1} direction='column' bg={colorScheme + '.100'} overflow='auto'>
        {data.map((legendEntry, index) => {
            return(
                <LegendListCard key={index} data={legendEntry} isLoading={isLoading} onClick={onClick} colorScheme={colorScheme}/>
            )
        })}
    </Flex>
  )
}

export default LegendList