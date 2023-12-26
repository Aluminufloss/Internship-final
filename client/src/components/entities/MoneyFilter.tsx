import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

type GenreFilterProps = {
  className?: string;
};

const MoneyFilter: React.FC<GenreFilterProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const [lowerValue, setLowerValue] = useState('0');
  const [higherValue, setHigherValue] = useState(lowerValue + 5);
  const router = useRouter();
  function handleSelectGenre(value: string) {
    const currentQuery = { ...router.query };

    currentQuery.genre = value;
    console.log("Val", value);

    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  }

  function handleSelectLowerChange(value: string) {
    setLowerValue(value);
  }

  function handleSelectHigherChange(value: string) {
    setHigherValue(value);
  }

  function handleClick() {
    setVisible(true);
  }

  return (
    <StyledGenreFilter className={props.className} onClick={handleClick}>
      Price
      {visible && (
        <div className="filter__select--money">
          <input
            value={lowerValue}
            min="0"
            max={higherValue}
            step="1"
            type="range"
            onChange={ev => handleSelectLowerChange(ev.target.value)}
            className="filter__select-input"
          />
          <input
            value={higherValue}
            min={lowerValue}
            max="30"
            step="1"
            type="range"
            onChange={ev => handleSelectHigherChange(ev.target.value)}
            className="filter__select-input"
          />
        </div>
      )}
      <span className="filter__select--icon"></span>
    </StyledGenreFilter>
  );
};

const StyledGenreFilter = styled.div<GenreFilterProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-bottom: 20px;
  padding: 10px 0 10px 15px;
  background-color: ${(props) => props.theme.colors.light};
  color: ${(props) => props.theme.colors.darkBlue};
  font-size: ${(props) => props.theme.colors.smallBig};
  font-weight: 500;
  border-radius: 16px;

  .filter__select--money {
    height: 150px;
    width: 290px;
    position: absolute;
    top: calc(100% + 24px);
    left: 0;
    background-color: ${(props) => props.theme.colors.light};
    border-radius: 16px;
    z-index: 300;
  }

  .filter__select-input {
    height: 12px;
    width: 260px;
    position: absolute;
    top: 50px;
    left: 15px;
    background-color: ${(props) => props.theme.colors.light};
    border-radius: 16px;
    background-color: ${(props) => props.theme.colors.light};
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

export default MoneyFilter;
