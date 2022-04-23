import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import { useRef } from 'react';
import image from './certified.png'
import styles from '../styles/Home.module.css'
import { useToast } from '@chakra-ui/react'

import {
  Center,
  Box,
  Divider,
  HStack,
  Textarea,
  Text,
  Heading,
  Input,
  Link,
  Flex,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Button,
  FormErrorMessage,
  FormHelperText,
  Stack,
  chakra,
  useColorMode,
  useColorModeValue,
  Spinner
} from '@chakra-ui/react'



export default function Home() {
  
  const [value, setValue] = React.useState('');
  const [showNFT, setShowNFT] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const timeOut = useRef(null)

  function onSubmit(){

  }

  function displayNFT() {
        return (
            <Center py={12}>
              <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                  rounded={'lg'}
                  mt={-12}
                  pos={'relative'}
                  height={'230px'}
                  _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: {image},
                    filter: 'blur(15px)',
                    zIndex: -1,
                  }}
                  _groupHover={{
                    _after: {
                      filter: 'blur(20px)',
                    },
                  }}>
                    <Center>
                  <Image
                    rounded={'lg'}
                    height={220}
                    width={220}
                    objectFit={'fill'}
                    src={image}
                  />
                  </Center>
                </Box>
                <Stack pt={10} align={'center'}>
                  <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                    Certified
                  </Text>
                  <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                   #1418
                  </Heading>
                  <Stack align={'center'}>
                  
                    <Link href={'ipfs://QmbF3Ffq6Dh23WFuAcJWzrqzjfuw5KGzTZfhkPSjHJPUXr'} color={'gray.600'}>
                    ipfs://Qmb...UXr
                    </Link>
                    <Link href={'https://mumbai.polygonscan.com/address/0x9c3a0bde02a2e32e0a6beac9013fecc9f5648748'} color={'gray.600'}>
                    0x9c3...8748
                    </Link>
                  </Stack>
                </Stack>
              </Box>
            </Center>
        )
  }
  function getSpinner(){
    if (working) {
        return <Center><Spinner></Spinner></Center>
    }
  }
  const toast = useToast()

  function input(){
    return (
    <div className='task-creation-app'>
        <Stack 
        spacing={8}>
          <Input 
          placeholder="Vintage Token ID"
          value={value}
           onChange={(e)=> setValue(e.currentTarget.value)}/>
        <Button
              mt={4}
              className='submit'
              colorScheme='teal'
              type='submit'
              onClick={() => {setWorking(true);
                timeOut.current = setTimeout(() => {
                  setWorking(false);setShowNFT(true);
                  toast({
                    title: 'Project Vintage Verified.',
                    description: "A verified NFT has been minted.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
              }, 5000);
              
              }}
            >
              Submit
            </Button>
            {getSpinner()}
        </Stack>
        </div>
    )
  }
  function getComponent(){
    if (showNFT){
      return displayNFT();
    }
    else{
      return input();
    }
       
    }
  
  
  return (

    <div className='wrapper'>
            <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Omnii Project Vintage Verification
        </chakra.h1>
          {getComponent()}
        </div>
            
  )
}
