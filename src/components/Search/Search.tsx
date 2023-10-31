import Form from "../Forms/Form/Form";
import InputText from "../Forms/InputText/InputText";
import "./Search.scss";

interface SearchData {
  search: string;
}

export default function Search() {
  const navigate = useNavigate();
  function onSubmit(data: SearchData) {
    navigate("/search?q=" + encodeURIComponent(data.search));
  }
  return (
    <div class="search-component">
      <Form initialData={{ search: "" }} onSubmit={onSubmit}>
        <InputText label="Search" name="search" type="search" />
      </Form>
    </div>
  );
}
