import{
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Box,
}from  "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) =>{
  const [name, setName] = useState(dataEdit.name || "");
  const [email, setEmail] = useState(dataEdit.email || "");  

  const handSave = () => {
    if(!name || !email) return;

    if(emailAlreadyExists()){
      return alert("Email já Cadastrado")
    }

    if(Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, email };
    }

    const newDataArray = !Object.keys(dataEdit).length
    ? [...(data ? data : []), { name, email }]
    : [...(data ? data : [])];

    localStorage.setItem("card_cliente", JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();
  };

  const emailAlreadyExists = () =>{
    if(dataEdit.email !== email && data?.length){
      return data.find((item) => item.email === email);
    }
  }

  return <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Cadastro de Clientes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>
                    <Input 
                    Input="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    />
                    
                  </FormLabel>
                </Box>
                <Box>
                <FormLabel>
                 <Input 
                  Input="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                      />
    
                </FormLabel>
               </Box>
              </FormControl>
            </ModalBody>
            <ModalFooter justifyContent="start">
              <Button colorScheme="green" mr={3} onClick={handleSave}>
                  Salvar
              </Button> 
              <Button colorScheme="red" mr={3} onClick={handleSave}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
  </>
};

export default ModalComp;