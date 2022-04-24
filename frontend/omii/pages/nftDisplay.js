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

export default function NFTDisplay(props) {

    return (
        <Center bg="#0D192C" h="100vh">
        <Box bg="#15263F" color="white" borderRadius="2xl" p={6} w={350}>
        <Box
          position="relative"
        >
          <Image
            src={equil}
            borderRadius="8px"
            marginBottom={6}
          >
          </Image>
          <Box 
          zIndex="1"
          position="absolute"
          backgroundColor={cyan}
          width="100%"
          height="100%"
          top="0"
          borderRadius="8px"
          opacity="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{
            opacity: "50%"
          }}
          >
            <Image src={view}
            height="48px"
            width="48px">
            </Image>
          </Box>
        </Box>
        <Heading 
          as="h2" 
          fontSize="22px" 
          mb={4}
          cursor="pointer"
          _hover={{
            color: "#00FFF8"
          }}>
          Equilibrium #3429
        </Heading>
        <Text color={textColor} mb={6} fontSize="18px">
          Our Equilibrium collection promotes balance and calm.
        </Text>
        <HStack justify="space-between">
          <Flex align="center">
            <Image
              src={eth}
              marginRight="6px"
              height="18px"
              alt="ETH logo"
            >
            </Image>
            <Text color="#00FFF8" fontWeight="bold">
              0.041 ETH
            </Text>
          </Flex>
          <Flex align="center">
            <Image
                src={clock}
                marginRight="6px"
                height="16px"
                alt="clock icon"
              >

            </Image>
            <Text color={textColor}>
              3 days left
            </Text>
          </Flex>
        </HStack>
        <Divider borderColor="#2E405A" mt={6} mb={4}/>
        <Flex>
          <Image
              border="1px"
              borderColor="white"
              borderRadius="50px"
              boxSize='30px'
              objectFit='cover'
              src={avatar}
              alt='Profile Picture'
              marginRight={4}
            />
          <Text color={textColor}>
            Creation of{' '}
            <Link 
              color='white' 
              href='#'
              _hover={{
                color: "#00FFF8"
              }}>
              Jules Wyvern
            </Link>
          </Text>
        </Flex>
        </Box>
        </Center>
    )
}