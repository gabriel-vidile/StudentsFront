import React, { useEffect, useRef, useState } from 'react';
import { Box, VStack, Flex, useColorModeValue } from '@chakra-ui/react';
import Carousel from '../components/Carousel';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  const vStackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentVStackRef = vStackRef.current;

    if (currentVStackRef) {
      observer.observe(currentVStackRef);
    }

    return () => {
      if (currentVStackRef) {
        observer.unobserve(currentVStackRef);
      }
    };
  }, []);

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <>
      <Flex alignContent="center" alignItems="center" justifyContent="center">
        <Carousel />
      </Flex>
      <VStack
        ref={vStackRef}
        align="center"
        justify="center"
        height="100vh"
        spacing={4}
        bg={bg}
        color={color}
        opacity={isVisible ? 1 : 0}
        transition="opacity 1s ease-in-out"
      >
        <Box textAlign="center">
          <Hero />
        </Box>
      </VStack>
    </>
  );
};

export default Home;
