import Student from "./student.interface";
 export default interface StudentListProps {
    token: string;
    onEdit: (student: Student) => void;
  }