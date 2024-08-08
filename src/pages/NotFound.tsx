
import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/'); 
  };

  return (
    <VStack
      align="center"
      justify="center"
      h="100vh"
      spacing={4}
      bg="background.100"
      color="text.800"
    >
      <Box textAlign="center">
        <Heading size="2xl" mb={4} color="primary.600">
          404
        </Heading>
        <Text fontSize="lg" mb={4}>
          Oops! Página não encontrada.
        </Text>
        <Button colorScheme="primary" onClick={goHome}>
          Voltar para a Página Inicial
        </Button>
      </Box>
    </VStack>
  );
};

export default NotFound;
