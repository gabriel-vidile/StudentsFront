import React from 'react';
import { Box, Heading, Text, Image, Flex, useColorModeValue } from '@chakra-ui/react';

const Hero: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box
      width="full"
      height="full"
      alignItems="center"
      maxWidth={1218}
      overflow="hidden"
      bg={bg}
      color={color}
    >
      <Flex
        flexDir={["column", "column", "row"]}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src="/images/Jan-Business_team_3.jpg"
          width={[300, 400, 800]}
          height="full"
        />
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={[4, 6, 10]}
        >
          <Heading mb={10}>Bem-vindo ao sistema Aluno!</Heading>
          <Text>
            Esta aplicação permite gerenciar informações de estudantes de forma
            eficiente.
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Hero;
