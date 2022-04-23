import Head from 'next/head'
import Image from 'next/image'
import React from 'react';

import styles from '../styles/Home.module.css'
import {
  Center,
  Textarea,
  Heading,
  Input,
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
  chakra
} from '@chakra-ui/react'

export default function Home() {
  
  const [value, setValue] = React.useState('');
  const [showNFT, setShowNFT] = React.useState(false);

  function onSubmit(){

  }

  function input(){
    return (
    <div className='task-creation-app'>
        <Stack>
          <Input 
          placeholder="Vintage Token ID"
          value={value}
           onChange={(e)=> setValue(e.currentTarget.value)}/>
        <Button
              mt={4}
              colorScheme='teal'
              type='submit'
              onClick={() => {setShowNFT(true);}}
            >
              Submit
            </Button>
        </Stack>
        </div>
    )
  }
  function getComponent(){
    if (showNFT){
      return "";
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
          Vintage Verification
        </chakra.h1>
          {getComponent()}
        </div>
            
  )
}
