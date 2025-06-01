import "./styles.scss";
import Icon from "../Icon";
import { useState } from "react";

interface SearchBar {
  filter?: boolean;
  placeholder?: string;
  filterActive?: boolean;
  handleOpenFIlterModal?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBar> = ({
  filter,
  onChange,
  placeholder,
  filterActive,
  handleOpenFIlterModal,
}) => {
  const [active, setActive] = useState(false);

  return (
    <div className="searchbar-container">
      <div
        className={`searchbar-wrapper ${active ? "active" : ""}`}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        <Icon name="RiSearchLine" size={18} />
        <input
          type="text"
          className="searchbar"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      {filter && (
        <div
          onClick={handleOpenFIlterModal}
          className={`searchbar-filter ${filterActive ? "active" : ""}`}
        >
          <Icon
            name="RiFilter2Line"
            fill={filterActive ? "#ffffff" : "#808080"}
            size={20}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
