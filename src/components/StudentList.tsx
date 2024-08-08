import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Button, Spinner, Stack, useToast, HStack, useColorModeValue } from '@chakra-ui/react';
import api from '../services/api';
import Student from '../interfaces/student.interface';
import StudentListProps from '../interfaces/studentListProps.interface';

const StudentList: React.FC<StudentListProps> = ({ onEdit }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const studentsPerPage = 10; 
  const toast = useToast();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/api/students');
        setStudents(response.data);
      } catch (error) {
        toast({
          title: 'Erro buscando os estudantes',
          description: "Ocorreu algum erro ao deletar os estudantes",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [toast]);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
      toast({
        title: 'Estudante deletado com sucesso',
        description: "O estudante foi deletado com sucesso",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao deletar estudante',
        description: "Ocorreu algum problema ao deletar",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <Stack align="center" justify="center" minH="100vh">
        <Spinner size="xl" />
      </Stack>
    );
  }

  return (
    <Box maxW="lg" mx="auto" mt={[4, 8]} p={[0, 6]} borderRadius="md" boxShadow="lg" bg={bg} color={color}>
      <List spacing={3}>
        {currentStudents.map((student) => (
          <ListItem
            key={student.id}
            p={3}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: 'md' }}
          >
            <HStack justify="space-between">
              <Box>
                {student.nome} - Série: {student.serie}, Nota Média: {student.notaMedia}
              </Box>
              <HStack spacing={2}>
                <Button colorScheme="blue" size="sm" onClick={() => onEdit(student)}>
                  Editar
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(student.id)}>
                  Deletar
                </Button>
              </HStack>
            </HStack>
          </ListItem>
        ))}
      </List>
      <HStack justify="center" mt={4}>
        {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
          <Button
            key={i}
            colorScheme="primary"
            variant={currentPage === i + 1 ? 'solid' : 'outline'}
            onClick={() => paginate(i + 1)}
            mx={1}
          >
            {i + 1}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default StudentList;
