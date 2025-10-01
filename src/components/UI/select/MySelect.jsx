import cl from "./MySelect.module.css";

export default function MySelect({ options, defaultValue, value, onChange }) {
    // console.log(options)
  return (
    <select
        value={value} className={cl.MySelect}
        onChange={e => onChange(e.target.value)}
    >
      <option disabled value=''>{defaultValue}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.name}</option>
      ))}
    </select>
  );
}
