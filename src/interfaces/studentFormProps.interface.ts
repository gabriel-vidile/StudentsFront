import Student from "./student.interface";
export default interface StudentFormProps {
    token: string;
    student?: Student; // Torne a propriedade opcional
    onSave: (student: Student) => void;
  }