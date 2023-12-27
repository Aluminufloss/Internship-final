import { useRouter } from "next/router";
import styled from "styled-components";

type CustomFilterProps = {
  className?: string;
};

type QueryProps = {
  filter: string | undefined;
};

const CustomFilter: React.FC<CustomFilterProps> = (props) => {
  const router = useRouter();

  function handleSelectFilter(value: string) {
    const currentQuery = { ...router.query } as QueryProps;
    currentQuery.filter = value;

    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { 
        shallow: false,
        scroll: false,
      }
    );
  }

  return (
    <StyledGustomFilter className={props.className}>
      <div className="filter__select--container">
        <select
          className="filter__select--custom"
          onChange={(ev) => handleSelectFilter(ev.target.value)}
        >
          <option value="Price">Price</option>
          <option value="Name">Name</option>
          <option value="Author name">Author name</option>
          <option value="Rating">Rating</option>
          <option value="Date of issue">Date of issue</option>
        </select>
        <span className="filter__select--icon"></span>
      </div>
    </StyledGustomFilter>
  );
};

const StyledGustomFilter = styled.div<CustomFilterProps>`
  position: relative;
  width: 100%;
  height: 48px;

  select {
    height: 48px;
    position: relative;
    width: 100%;
    padding: 10px 0 10px 15px;
    background-color: ${(props) => props.theme.colors.light};
    border-radius: 16px;
    border: none;
    appearance: none;
    color: ${(props) => props.theme.colors.darkBlue};
    font-size: ${(props) => props.theme.colors.smallBig};
    font-weight: 500;
  }

  .filter__select--icon {
    position: absolute;
    top: 12px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: transparent;
    background-image: url("/images/icons/Select.svg");
    background-repeat: no-repeat;
  }
`;

export default CustomFilter;
