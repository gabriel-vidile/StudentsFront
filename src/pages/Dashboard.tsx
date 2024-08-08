import React, { useEffect, useState } from 'react';
import {
  Heading,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Button,
  useColorModeValue,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AgeGraph from '../components/AgeGraph';
import api from '../services/api';
import Student from '../interfaces/student.interface';

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [averageGrade, setAverageGrade] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await api.get<Student[]>('/api/students');
        const data = response.data;
        setStudents(data);

        const totalGrades = data.reduce((sum, student) => sum + student.notaMedia, 0);
        const average = data.length ? totalGrades / data.length : 0;
        setAverageGrade(average);
      } catch (error) {
        console.error('Erro ao buscar dados dos estudantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  if (loading) {
    return (
      <Stack align="center" justify="center" minH="100vh">
        <Spinner size="xl" />
      </Stack>
    );
  }

  return (
    <VStack
      align="start"
      spacing={6}
      p={8}
      bg={bg}
      minH="100vh"
      color={color}
    >
      <Heading size="xl" mb={6} color="blue.600">
        Dashboard
      </Heading>
      <Text fontSize="lg" mb={6}>
        Bem-vindo ao painel de controle do sistema. Aqui você pode gerenciar estudantes e visualizar estatísticas.
      </Text>
      <StatGroup>
        <Stat>
          <StatLabel>Estudantes</StatLabel>
          <StatNumber>{students.length}</StatNumber>
          <StatHelpText>Atualizado recentemente</StatHelpText>
        </Stat>
        <Stat ml={10}>
          <StatLabel>Média de Notas</StatLabel>
          <StatNumber>{averageGrade.toFixed(2)}</StatNumber>
          <StatHelpText>Baseado em dados atuais</StatHelpText>
        </Stat>
      </StatGroup>
      <HStack spacing={4}>
        <Link to="/students">
          <Button colorScheme="blue">Gerenciar Estudantes</Button>
        </Link>
      </HStack>
      <AgeGraph />
    </VStack>
  );
};

export default Dashboard;
