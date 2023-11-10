import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id="error-page" className="text-center">
      <h1>Opss!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <img src="https://http.cat/404" alt="not found" className="w-50" />
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
