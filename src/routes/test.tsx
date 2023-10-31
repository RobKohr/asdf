import { loading, setLoading } from "../components/Loading/Loading";

export default function Test() {
  function onClick() {
    setLoading(true);
  }

  return <div onClick={onClick}>{loading} test</div>;
}
