import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Box, Heading, Text, Button, Image, VStack } from '@chakra-ui/react';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box width="full"  borderRadius={24} height={450} background="gray.100" alignItems="center" marginTop={10} maxWidth={1218} overflow="hidden">
      <Slider {...settings} >
        <Box bg="gray.400" color="white" px={12} py={8} textAlign="center" height={450} borderRadius={24} position="relative">
          <Image src="/images/pexels-pixabay-159775.jpg" alt="Slide 1" position="absolute" left={0} top={0} width="full" height="full" objectFit="cover" opacity={0.5} />
          <VStack spacing={4} position="relative" height={300} zIndex="1">
            <Heading mb={20}>Transforme a Gestão da Sua Escola</Heading>
            <Text mb={10}>Aumente a eficiência e garanta o futuro financeiro da sua instituição com nossas soluções personalizadas."</Text>
            <Button colorScheme="teal" size="lg">Descubra Mais</Button>
          </VStack>
        </Box>
        <Box bg="gray.400" color="white" px={12} py={8} textAlign="center" height={450} borderRadius={24} position="relative">
          <Image src="/images/pexels-max-fischer-5212345.jpg" alt="Slide 1" position="absolute" left={0} top={0} width="full" height="full" objectFit="cover" opacity={0.5} />
          <VStack spacing={4} position="relative" height={300}  zIndex="1">
            <Heading mb={20}>Facilite a Administração da Escola</Heading>
            <Text mb={10}>Automatize processos financeiros e concentre-se no que realmente importa: a educação</Text>
            <Button colorScheme="red" size="lg">Veja Como Funciona</Button>
          </VStack>
        </Box>
        <Box bg="gray.400" color="white" px={12} py={8} textAlign="center" height={450}  borderRadius={24} position="relative">
          <Image src="/images/pexels-yankrukov-8613089.jpg" alt="Slide 1" position="absolute" left={0} top={0} width="full" height="full" objectFit="cover" opacity={0.5} />
          <VStack spacing={4} position="relative" height={300} zIndex="1">
            <Heading mb={20}>Inovação para o Setor Educacional</Heading>
            <Text mb={10}>Simplifique a gestão de recursos e assegure a sustentabilidade da sua escola.</Text>
            <Button colorScheme="blue" size="lg">Entre em Contato</Button>
          </VStack>
        </Box>
      </Slider>
    </Box>
  );
};

export default Carousel;