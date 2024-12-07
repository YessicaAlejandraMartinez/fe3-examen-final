import { useContext } from "react";
import Form from "../Components/Form";
import { ContextGlobal } from "../Components/utils/global.context";

const Contact = () => {
  const { state } = useContext(ContextGlobal);

  return (
    <div className={`contact ${state.theme}`}>
      <h1>¿Quieres conocer más?</h1>
      <p>Envíanos tus preguntas y te contactaremos</p>
      <Form />
    </div>
  );
};

export default Contact;
