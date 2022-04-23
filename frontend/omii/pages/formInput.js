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
  import React from 'react';
export default function FormInput(props){
    const [value, setValue] = React.useState('');

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
          onClick={() => {console.log(value)}}
        >
          Submit
        </Button>
    </Stack>
    </div>
    )
}