import '../Styles/Pages/App.css';
import { useState } from 'react'
import PlayerSearchInfoForm from '../LOC/PlayerSearchModal';
import APIQuerier from '../HOC/APIQuerier';
import DownloadJSON from '../HOC/DownloadJSON';
import { Flex, Heading, Text, Image, VStack, HStack,CircularProgress, CircularProgressLabel, Skeleton, useDisclosure, } from '@chakra-ui/react'
import LegendList from '../LOC/LegendList';
import LegendDisplay from '../LOC/LegendDisplay';
import SettingsModal from '../LOC/SettingsModal';
import InformationModal from '../LOC/InformationModal';

function App() {

  const defaultCurrentLegendData = [
    "Octane",
    {
      ImgAssets: {
        banner: "https://api.mozambiquehe.re/assets/banners/octane.jpg",
        icon: "https://api.mozambiquehe.re/assets/icons/octane.png"
      },
      gameInfo: {
        badges: [
          {
            name: 'Assassin',
            value: 3
          }
        ]
      },
      data: [
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
  ]

  const legendNames = ["ash", "bangalore", 'bloodhound', 'caustic', 'crypto', 'fuse', 'gibraltar', 'horizon', 'lifeline', 'loba', 'mad maggie', 'mirage', 'octane', 'pathfinder', 'rampart', 'revenant', 'seer', 'valkyrie', 'wattson', 'wraith']


  let defaultAllLegendData = legendNames.map(name => {
    let capitalizedName = ""
    const firstandlastnames = name.split(" ")
    firstandlastnames.forEach(firstorlastname => {
      capitalizedName += firstorlastname[0].toUpperCase() + firstorlastname.substring(1) + " "
    })
    return ([
      capitalizedName,
      {
        ...defaultCurrentLegendData[1],
        ImgAssets: {
          icon: "https://api.mozambiquehe.re/assets/icons/" + name + ".png",
          banner: "https://api.mozambiquehe.re/assets/banners/" + name + ".jpg"
        }
      }
    ])
  })

  defaultAllLegendData[10][1].ImgAssets.banner = "https://cdn1.dotesports.com/wp-content/uploads/2022/01/27090534/maggie-first-blood.png"

  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure()
  const { isOpen: isInformationOpen, onOpen: onInformationOpen, onClose: onInformationClose } = useDisclosure()
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure()
  const [colorScheme, setColorScheme] = useState('purple')
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('CHODECHODE')
  const [userLevel, setUserLevel] = useState(999)
  const [userPlatform, setUserPlatform] = useState('PS4')
  const [levelProgress, setLevelProgress] = useState(35)
  const [currentLegendImageSource, setCurrentLegendImageSource] = useState( "https://api.mozambiquehe.re/assets/icons/octane.png")
  const [battleRoyaleRankImageSource, setBattleRoyaleRankImageSource] = useState( "https://api.mozambiquehe.re/assets/ranks/unranked4.png")
  const [arenasRankImageSource, setArenasRankImageSource] = useState( "https://api.mozambiquehe.re/assets/ranks/unranked4.png")
  const [allLegendData, setAllLegendData] = useState(defaultAllLegendData)
  const [currentSelectedLegend, setCurrentSelectedLegend] = useState(defaultCurrentLegendData)

  const handleSearchSubmit = ({username, platform}) => {
    setLoading(true)
    setUserName(username)
    setUserPlatform(platform === 'X1' ? 'XBOX' : platform)
    APIQuerier.fetchData({username, platform}).then( response => response.json() ).then( response => {
      setUserLevel(response.global.level)
      setLevelProgress(response.global.toNextLevelPercent)
      setCurrentLegendImageSource(response.legends.selected.ImgAssets.icon)
      setBattleRoyaleRankImageSource(response.global.rank.rankImg)
      setArenasRankImageSource(response.global.arena.rankImg)
      setAllLegendData(Object.entries(response.legends.all).slice(1))
      setCurrentSelectedLegend(Object.entries(response.legends.all).find(element => element[0] === response.legends.selected.LegendName))
      setLoading(false)
      //DownloadJSON.makeJSONAndDownload({data: response, filename: username+platform})
    }); 
    
  }

  const handleLegendListClick = (legendClickedData) => {
    setCurrentSelectedLegend(legendClickedData)
  }
  

  return (
    <div className="App">
      <Flex height='200px' bgGradient={'linear(to-r, ' + colorScheme + ", " + colorScheme + '.500, ' + colorScheme + '.300, ' + colorScheme + '.300)'}>
        <HStack flex='2' spacing={3} justify='space-evenly'>
          <Skeleton  isLoaded={!loading}>
            <Image boxSize='200px'
              objectFit='cover'
              src={currentLegendImageSource}
              alt='Dan Abramov'
            />
          </Skeleton>
          <VStack  h='130px' w='300px' >
            <Skeleton isLoaded={!loading}>
              <HStack border={'2px solid ' + colorScheme} bg='#1f1c1c' padding='4px' borderRadius='10px' color='white'>
                <Heading as='h3' size='md' >Username:</Heading>
                <Text>{userName}</Text>
              </HStack>
            </Skeleton>
            <Skeleton  isLoaded={!loading}>
              <HStack border={'2px solid ' + colorScheme} bg='#1f1c1c' padding='4px' borderRadius='10px' color='white'>
                <Heading as='h3' size='md'>Level:</Heading>
                <Text>{userLevel}</Text>
              </HStack>
            </Skeleton>
            <Skeleton  isLoaded={!loading}> 
              <HStack border={'2px solid ' + colorScheme} bg='#1f1c1c' padding='4px' borderRadius='10px' color='white'>
                <Heading as='h3' size='md'>Platform:</Heading>
                <Text>{userPlatform}</Text>
              </HStack>
            </Skeleton>
          </VStack>
        </HStack>
        <Flex  flex='1' align='center' justify='center'>
          <VStack padding='10px' border={'2px solid ' + colorScheme} bg='#2b2828' borderRadius='10px' color='white'>
            <Heading as='h3' size='md'>To Next Level:</Heading>
            <CircularProgress value={levelProgress} color={colorScheme+'.400'} size='120px' thickness='16px' isIndeterminate={loading} capIsRound>
              {!loading && <CircularProgressLabel>{levelProgress}%</CircularProgressLabel>}
            </CircularProgress>
          </VStack>
        </Flex>
        <Flex justify='center' align='center' height='100%' gap='10px' flex={3}> 
          <Heading as='h3' size='lg' border={'2px solid ' + colorScheme} bg='#1f1c1c' padding='10px' borderRadius='10px' color='white'>BR Rank:</Heading>
          <Skeleton isLoaded={!loading} >
            <Image boxSize='160px'
            objectFit='cover'
            src={battleRoyaleRankImageSource}
            alt='Battle Royale Rank' />
          </Skeleton>
          <Heading as='h3' size='lg' border={'2px solid ' + colorScheme} bg='#1f1c1c' padding='10px' borderRadius='10px' color='white'>Arenas Rank:</Heading>
          <Skeleton isLoaded={!loading}>
            <Image boxSize='160px'
            objectFit='cover'
            src={arenasRankImageSource}
            alt='Arenas Rank' />
          </Skeleton>
        </Flex>
        <Flex direction={"column"} flex={.35}>
          <Flex flex={1} align='center' justify='center' _hover={{ bg: `${colorScheme + '.500'}`, color: 'white' }} borderRadius='15px' onClick={onSettingsOpen}>
            <SettingsModal isOpen={isSettingsOpen} onClose={onSettingsClose} changeThemeColor={setColorScheme} colorScheme={colorScheme}/>
          </Flex>
          <Flex flex={1} align='center' justify='center' _hover={{ bg: 'red.500', color: 'white' }} borderRadius='15px' onClick={onInformationOpen}>
            <InformationModal isOpen={isInformationOpen} onClose={onInformationClose} colorScheme={colorScheme}/>
          </Flex>
          <Flex flex={1} align='center' justify='center' _hover={{ bg: 'gray.500', color: 'white' }} borderRadius='15px' onClick={onSearchOpen}>
            <PlayerSearchInfoForm isOpen={isSearchOpen} onClose={onSearchClose} onFormSubmit={handleSearchSubmit} colorScheme={colorScheme} loading={loading}/>
          </Flex>
        </Flex>        
      </Flex>
      <Flex height='78.5vh'>
        <Flex flex={1}>
          <LegendList data={allLegendData} isLoading={loading} onClick={handleLegendListClick} colorScheme={colorScheme}/>
        </Flex>
        <Flex flex={3}>
          <LegendDisplay data={currentSelectedLegend} isLoading={loading} colorScheme={colorScheme}/>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;