import cl from "./Pagination.module.css";
import { getPageArray} from "../../../utils/pages";

const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = getPageArray(totalPages);

  return (
    <div className={cl.page__wrapper}>
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={
            page === p ? `${cl.page} ${cl.page__current}` : `${cl.page}`
          }
        >
          {p}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
