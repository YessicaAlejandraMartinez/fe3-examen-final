import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errors = {};
    if (name.length <= 5) {
      errors.name = "El nombre debe tener más de 5 caracteres.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "El email no es válido.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Por favor verifique su información nuevamente");
    } else {
      console.log({ name, email });
      setSubmitted(true);
    }
  };

  return (
    <div>
      {submitted ? (
        <p>Gracias {name}, te contactaremos cuando antes vía mail.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre Completo:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <button className="favButton" type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default Form;


