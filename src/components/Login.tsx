import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  useToast,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.900", "gray.100");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        // Armazena o token no localStorage
        localStorage.setItem("token", response.data.token);

        // Atualiza o estado de autenticação e configura o header de autorização
        login(response.data.token);
        setAuthToken(response.data.token);

        // Verifica se o token está definido corretamente
        const storedToken = localStorage.getItem("token");
        if (storedToken && storedToken === response.data.token) {
          toast({
            title: "Login bem-sucedido.",
            description: "Você foi autenticado com sucesso.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/dashboard"); // Redireciona para o dashboard
        } else {
          throw new Error("Token storage verification failed");
        }
      } else {
        throw new Error("Token not found");
      }
    } catch (error: any) {
      toast({
        title: "Falha de login",
        description: "Por favor, verifique seu usuário e senha.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg={bg}
      height="400px"
      minHeight="400px"
      backgroundImage="url('/images/rm435-028.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex"
      width={["300px", "600px"]}
      mb={[10, 0]}
      alignItems="center"
      justifyContent="center"
      color={textColor}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel color="gray.700">Usuário</FormLabel>
            <Input
              type="text"
              value={username}
              background="white"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel color="gray.700">Senha</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                background="white"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputRightElement width="4.5rem" background="none">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={toggleShowPassword}
                  variant="ghost"
                  css={{
                    "&:hover": {
                      background: "none",
                    },
                  }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Entrar
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
