import { useRouteError } from "react-router-dom";
import gif404 from '../assets/gif/404.gif'
import '../css/ErrorPage.css'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <img src={gif404} width="20%" className="img-fluid"/>
      <h1>Oops!</h1>
      <h2>404</h2>
      <p>Lo sentimos, la dirección que acaba de solicitar no esta disponible</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}