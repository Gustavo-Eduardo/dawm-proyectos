import Redirect from "../../components/Redirect"

function NotFound() {
  return (
    <Redirect path={"/customers"} />
  );
}

export default NotFound;
