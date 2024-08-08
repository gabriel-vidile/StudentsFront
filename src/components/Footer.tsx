import { Box, Heading, Flex, Image } from "@chakra-ui/react";
import {
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialYoutubeCircular,
  TiSocialFacebookCircular,
} from "react-icons/ti";

const Footer = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      width="full"
      height={250}
      alignItems="center"
      alignContent="center"
    >
      <Box
        width="full"
        height="full"
        alignItems="center"
        background="blue.500"
        maxWidth={1218}
        borderRadius={[0, 12, 24]} 
        overflow="hidden"
      >
        <Flex
          flexDir={["column", "column", "row"]} 
          alignItems="center"
          justifyContent="space-around"
          height="full"
          p={[4, 6, 8]} 
        >
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mt={[2, 3, 5]} 
          >
            <Heading color="white" mb={5}>
              Siga nossas redes sociais
            </Heading>
            <Flex flexDir="row" justifyContent="center" gap={4}>
              <TiSocialInstagram fontSize={36} color="white" />
              <TiSocialFacebookCircular fontSize={36} color="white" />
              <TiSocialLinkedin fontSize={36} color="white" />
              <TiSocialYoutubeCircular fontSize={36} color="white" />
            </Flex>
          </Flex>
          <Image src="/logo.svg" alt="Logo" boxSize={["80px", "90px", "100px"]} mt={[4, 0, 0]} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Footer;
