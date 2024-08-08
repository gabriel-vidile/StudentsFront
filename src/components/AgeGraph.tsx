import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from '../services/api';
import Student from '../interfaces/student.interface';
import AgeData from '../interfaces/age.interface';


const AgeGraph: React.FC = () => {
  const [ageData, setAgeData] = useState<AgeData[]>([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get('/api/students');
        const data = response.data;
        const formattedData = getAgeData(data);
        setAgeData(formattedData);
      } catch (error) {
        console.error('Erro ao buscar dados dos estudantes:', error);
      }
    };

    fetchStudentData();
  }, []);

  const getAgeData = (students: Student[]): AgeData[] => {
    const ageMap: { [key: number]: number } = {};

    students.forEach((student) => {
      if (ageMap[student.idade]) {
        ageMap[student.idade] += 1;
      } else {
        ageMap[student.idade] = 1;
      }
    });

    return Object.keys(ageMap).map((age) => ({
      age: Number(age),
      count: ageMap[Number(age)],
    }));
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={ageData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barCategoryGap="10%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" label={{ value: 'Idade', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Quantidade', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" name="Quantidade de Alunos" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgeGraph;
