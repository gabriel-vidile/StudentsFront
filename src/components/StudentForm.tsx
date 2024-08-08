import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import api from '../services/api';
import Student from '../interfaces/student.interface';
import StudentFormProps from '../interfaces/studentFormProps.interface';

const StudentForm: React.FC<StudentFormProps> = ({ token, student, onSave }) => {
  const [formData, setFormData] = useState<Student>({
    id: student?.id || 0,
    nome: student?.nome || '',
    idade: student?.idade || 0,
    serie: student?.serie || 0,
    notaMedia: student?.notaMedia || 0,
    endereco: student?.endereco || '',
    nomePai: student?.nomePai || '',
    nomeMae: student?.nomeMae || '',
    dataNascimento: student ? student.dataNascimento.split('T')[0] : '',
  });

  const toast = useToast();

  useEffect(() => {
    if (student) {
      setFormData({
        ...student,
        dataNascimento: student.dataNascimento.split('T')[0],
      });
    } else {
      setFormData({
        id: 0,
        nome: '',
        idade: 0,
        serie: 0,
        notaMedia: 0,
        endereco: '',
        nomePai: '',
        nomeMae: '',
        dataNascimento: '',
      });
    }
  }, [student]);

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      idade: name === 'dataNascimento' ? calculateAge(value) : prev.idade,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        nome: formData.nome,
        idade: parseInt(formData.idade.toString(), 10),
        serie: parseInt(formData.serie.toString(), 10),
        notaMedia: parseFloat(formData.notaMedia.toString()),
        endereco: formData.endereco,
        nomePai: formData.nomePai,
        nomeMae: formData.nomeMae,
        dataNascimento: new Date(formData.dataNascimento).toISOString(),
      };

      if (formData.id) {
        // Update existing student
        const payloadAtt = { ...payload, id: formData.id };
        const response = await api.put(`/api/students/${formData.id}`, payloadAtt);
        onSave(response.data);
        toast({
          title: 'Estudante atualizado.',
          description: 'As informações do estudante foram atualizadas com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new student
        const response = await api.post('/api/students', payload);
        console.log('Create response:', response.data);
        onSave(response.data);
        toast({
          title: 'Estudante criado.',
          description: 'Um novo estudante foi criado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        title: 'Erro ao salvar estudante.',
        description: 'Houve um problema ao salvar as informações do estudante.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      bg={bg}
      color={color}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Flex flexDir={['column', 'row']}>
            <FormControl id="nome" isRequired>
              <FormLabel>Nome</FormLabel>
              <Input type="text" name="nome" value={formData.nome} onChange={handleChange} />
            </FormControl>

            <FormControl id="dataNascimento" ml={['none', '10px']} isRequired>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Flex flexDir={['column', 'row']} justifyContent="space-between" w="full">
            <FormControl id="idade" w={['full', '75%']} isRequired>
              <FormLabel>Idade</FormLabel>
              <Input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="serie" w={['full', '75%']} ml={['none', '10px']} isRequired>
              <FormLabel>Série</FormLabel>
              <Input type="number" name="serie" value={formData.serie} onChange={handleChange} />
            </FormControl>
            <FormControl id="notaMedia" w={['full', '75%']} ml={['none', '10px']} isRequired>
              <FormLabel>Nota Média</FormLabel>
              <Input
                type="number"
                name="notaMedia"
                step="0.1"
                value={formData.notaMedia}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>

          <FormControl id="endereco" isRequired>
            <FormLabel>Endereço</FormLabel>
            <Input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
          </FormControl>
          <Flex flexDir={['column', 'row']}>
            <FormControl id="nomePai" isRequired>
              <FormLabel>Nome do Pai</FormLabel>
              <Input type="text" name="nomePai" value={formData.nomePai} onChange={handleChange} />
            </FormControl>
            <FormControl id="nomeMae" ml={['none', '10px']} isRequired>
              <FormLabel>Nome da Mãe</FormLabel>
              <Input type="text" name="nomeMae" value={formData.nomeMae} onChange={handleChange} />
            </FormControl>
          </Flex>

          <Button type="submit" colorScheme="primary" width="full">
            {formData.id ? 'Atualizar' : 'Criar'} Estudante
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default StudentForm;
