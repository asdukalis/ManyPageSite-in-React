import MySelect from "../components/UI/select/MySelect";
import MyInput from "../components/UI/input/MyInput";

const PostFilter = ({filter, setFilter}) => {
  return (
    <>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({...filter, query: e.target.value})}
        placeholder="Search"
      />
      <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        defaultValue="Sort by"
        options={[
          { value: "title", name: "Sort by Name" },
          { value: "body", name: "Sort by Description" },
        ]}
      />
    </>
  );
};

export default PostFilter;
