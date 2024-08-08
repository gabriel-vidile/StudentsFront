import React, { useState, useEffect } from 'react';
import { Heading, VStack, Button, useColorModeValue, Spinner, Stack, Flex } from '@chakra-ui/react';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import { useAuth } from '../hooks/useAuth';
import Student from '../interfaces/student.interface';
import { useNavigate } from 'react-router-dom';

const dummyStudent: Student = {
  id: 0,
  nome: '',
  idade: 0,
  serie: 0,
  notaMedia: 0,
  endereco: '',
  nomePai: '',
  nomeMae: '',
  dataNascimento: '',
};

const Students: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [selectedStudent, setSelectedStudent] = useState<Student>(dummyStudent);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleSave = (student: Student) => {
    setSelectedStudent(dummyStudent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedStudent(dummyStudent);
    setIsEditing(false);
    navigate('/students');
  };

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, []);

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
      p={[2,8]}
      bg={bg}
      minH="100vh"
      color={color}
    >
      <Heading size="xl" mb={6} color={color}>
        Gerenciar Estudantes
      </Heading>
      <Flex width="100%" justifyContent={['center', 'flex-start']}>
        <Button
          colorScheme="primary"
          onClick={() => {
            if (isEditing) {
              handleCancel();
            } else {
              setSelectedStudent(dummyStudent);
              setIsEditing(true);
            }
          }}
          mb={4}
        >
          {isEditing ? 'Cancelar' : 'Adicionar Novo Estudante'}
        </Button>
      </Flex>
      {isEditing ? (
        <StudentForm
          token={token!}
          student={selectedStudent}
          onSave={handleSave}
        />
      ) : (
        <StudentList token={token!} onEdit={handleEdit} />
      )}
    </VStack>
  );
};

export default Students;
