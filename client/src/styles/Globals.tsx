import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  transition: background-color 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  color: black;
  font-family: 'Poppins', sans-serif;

  margin: 0;
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
}

*:disabled {
  cursor: not-allowed;
}

/* select:disabled,
input:disabled {
  background-color: black;
  color: white;
} */

input {
  border: none;
}

/* input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid black;
  outline-offset: -1px;
} */

input[type="file"] {
  display: none;
}

input:focus {
  outline: none;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style-type: none;
}

select:focus {
  border: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

`;

export default GlobalStyles;