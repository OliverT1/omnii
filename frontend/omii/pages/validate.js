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


export function Validate() {
  return (

    <div className='wrapper'>
            <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Task Creation
        </chakra.h1>
        <Stack>
        <Button
              mt={4}
              colorScheme='teal'
              type='submit'
            >
              Submit
            </Button>
        </Stack>
        </div>
            
  )
}

