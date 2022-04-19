import '../Styles/Components/LegendDisplay.css'
import { Flex, Image, Heading, HStack, VStack, Box, CircularProgress, CircularProgressLabel, Skeleton,
          Slider, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb} from '@chakra-ui/react'
import { useState } from 'react';

const LegendTrackerCard = ({ data, isLoading, background, bgData, colorScheme }) => {

  const [sliderValue, setSliderValue] = useState(10)
  const [showTooltip, setShowTooltip] = useState(false)

  const yValue = (bgData.index*((bgData.length*10)+10)) + '%'

    return (
        <Flex flex={1} margin='3px' border='1px solid gray' borderRadius='10px' padding='10px' justify='space-evenly' align='center' backgroundImage={background} backgroundPosition={"50% " + yValue}>
            <Skeleton isLoaded={!isLoading}>
              <Heading size='xl' border={'2px solid ' + colorScheme} bg='#2b2828' padding='10px' borderRadius='10px' color='white'>{data.name} :: {data.value}</Heading>
            </Skeleton>
            <VStack padding='7px' border={'2px solid ' + colorScheme} bg='#2b2828' color='white' borderRadius='10px'>
                <Heading as='h6' size='sm'>Overall Rank Percentile:</Heading>
                {/* <Slider
                  id='slider'
                  defaultValue={data.rank.topPercent}
                  min={0}
                  max={100}
                  colorScheme='teal'
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  isReadOnly
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg='teal.500'
                    color='white'
                    placement='top'
                    isOpen={showTooltip}
                    label={`${data.rank.topPercent}%`}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider> */}
                <CircularProgress value={data.rank.topPercent} color={colorScheme + '.400'} size='100px' thickness='15px' capIsRound isIndeterminate={isLoading}>
                    {!isLoading && <CircularProgressLabel fontSize='md'>{data.rank.topPercent}%</CircularProgressLabel>}
                </CircularProgress>
            </VStack>
            <VStack padding='7px' border={'2px solid ' + colorScheme} bg='#2b2828' color='white' borderRadius='10px' >
                <Heading as='h6' size='sm'>Platform Rank Percentile:</Heading>
                <CircularProgress value={data.rankPlatformSpecific.topPercent} color={colorScheme+'.400'} size='100px' thickness='15px' capIsRound isIndeterminate={isLoading}>
                    {!isLoading && <CircularProgressLabel fontSize='md'>{data.rankPlatformSpecific.topPercent}%</CircularProgressLabel>}
                </CircularProgress>
            </VStack>
        </Flex>
    )
}

const LegendDisplay = ({ data, isLoading, colorScheme }) => {

  const colors = ['red', 'orange', 'green','blue', 'purple']

  const colorIndex = colors.findIndex((element) => element === colorScheme)

  let nextColor = colorIndex === 0 ? colors[4] : colors[colorIndex - 1]

  let legendsData = data[1].data

  if(legendsData === undefined) {
    legendsData = [
      {
        key: 'defaultTrackerName',
        name: 'Default Tracker Name',
        value: 999,
        rank: {
          rankPos: 193930,
          topPercent: 55.55
        },
        rankPlatformSpecific: {
          rankPos: 193930,
          topPercent: 55.55
        }
      },
      {
        key: 'defaultTrackerName',
        name: 'Default Tracker Name',
        value: 999,
        rank: {
          rankPos: 193930,
          topPercent: 55.55
        },
        rankPlatformSpecific: {
          rankPos: 193930,
          topPercent: 55.55
        }
      },
      {
        key: 'defaultTrackerName',
        name: 'Default Tracker Name',
        value: 999,
        rank: {
          rankPos: 193930,
          topPercent: 55.55
        },
        rankPlatformSpecific: {
          rankPos: 193930,
          topPercent: 55.55
        }
      }
    ]
  }

  let totalRank = 0;
  let totalPlatformRank = 0;

  legendsData.forEach(trackerData => {
    totalRank += trackerData.rank.topPercent
    totalPlatformRank += trackerData.rankPlatformSpecific.topPercent
  })

  const avgLegendRank = Math.round((totalRank/legendsData.length) * 100)/100;
  const avgLegendPlatformRank = Math.round((totalPlatformRank/legendsData.length)*100)/100;

  return (
    <Flex flex={1} direction='column' >
      <Box w='100%' h='135px'  bgGradient={'linear(to-r, ' + colorScheme + '.500, ' + colorScheme + '.500, ' + colorScheme + '.400, ' + colorScheme + '.400, ' + colorScheme + '.300, ' + colorScheme + '.300, ' + colorScheme + '.300, ' + colorScheme + '.300)'}>
        <HStack marginBottom='20px'>
            <Skeleton isLoaded={!isLoading}>
              <Image boxSize='120px'
              objectFit='cover'
              src={data[1].ImgAssets.icon}
              alt='Arenas Rank' />
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Heading as='h3' size='3xl'  borderRadius='10px' padding='5px 8px' color='white'>{data[0]}</Heading>
            </Skeleton>
            <Heading as='h6' size='md'  borderRadius='10px' padding='5px 8px' color='white'>{'Average Rank Percentile'}</Heading>
            <CircularProgress  value={avgLegendRank} color={colorScheme+'.800'} size='100px' thickness='15px' capIsRound isIndeterminate={isLoading}>
              <CircularProgressLabel fontSize='large' color={'white'}>
                {!isLoading && avgLegendRank + '%'}
              </CircularProgressLabel>
            </CircularProgress>
            <Heading as='h6' size='md'  borderRadius='10px' padding='5px 8px' color='white'>{'Average Rank Percentile (Platform)'}</Heading>
            <CircularProgress  value={avgLegendPlatformRank} color={colorScheme+'.800'} size='100px' thickness='15px' capIsRound isIndeterminate={isLoading}>
              <CircularProgressLabel fontSize='large' color={'white'}>
                {!isLoading &&  avgLegendPlatformRank + '%'}
              </CircularProgressLabel>
            </CircularProgress>
        </HStack>
        <Flex direction='column' flex={1} gap='5px' overflow='auto' height='63vh'>
            {legendsData.map((legend, index) => {
                return <LegendTrackerCard data={legend} isLoading={isLoading} background={data[1].ImgAssets.banner} bgData={{index, length: legendsData.length}} key={index} colorScheme={colorScheme}/>
            })}
        </Flex>   
      </Box>
    </Flex>
  )
}

export default LegendDisplay
