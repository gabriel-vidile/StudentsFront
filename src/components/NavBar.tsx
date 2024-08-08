import React from 'react';
import {
  Box,
  Flex,
  Button,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
  Image,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa'; 
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';

const Navbar: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.800', 'white');
  const { token, logout } = useAuth();
  const navigate = useNavigate(); 

  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <Image src="/logo.svg" alt="Logo" boxSize="50px" mr={2} />
          </RouterLink>
          <ChakraLink as={RouterLink} to="/" color={color}>
            Início
          </ChakraLink>
        </HStack>

        <Flex alignItems="center">
          <ColorModeSwitcher />
          <Flex display={{ base: 'none', md: 'flex' }}>
            {!token ? (
              <Button as={RouterLink} to="/login" colorScheme="blue" size="sm">
                Entrar
              </Button>
            ) : (
              <>
                <Button as={RouterLink} to="/dashboard" colorScheme="blue" size="sm" mr={2}>
                  Dashboard
                </Button>
                <Button as={RouterLink} to="/students" colorScheme="blue" size="sm" mr={2}>
                  Estudantes
                </Button>
                <Button onClick={handleLogout} colorScheme="red" size="sm">
                  Logout
                </Button>
              </>
            )}
          </Flex>
          <IconButton
            aria-label="Open Menu"
            icon={<FaBars />} 
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            ml={2}
          />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <ChakraLink as={RouterLink} to="/" onClick={onClose} color={color}>
                Início
              </ChakraLink>
              {token && (
                <>
                  <Button as={RouterLink} to="/dashboard" colorScheme="blue" size="sm" onClick={onClose}>
                    Dashboard
                  </Button>
                  <Button as={RouterLink} to="/students" colorScheme="blue" size="sm" onClick={onClose}>
                    Estudantes
                  </Button>
                  <Button onClick={() => { handleLogout(); onClose(); }} colorScheme="red" size="sm">
                    Logout
                  </Button>
                </>
              )}
              {!token && (
                <Button as={RouterLink} to="/login" colorScheme="blue" size="sm" onClick={onClose}>
                  Entrar
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
