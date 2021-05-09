import React, { VFC, useState, useCallback, memo } from "react";
import { db } from "../../firebase";
import { nowDate, restrictDateInput } from "../../const/index";
import styled from "styled-components";

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;
type Props = InputProps & {
  date: string;
  id: string | undefined;
};

export const TodoDate: VFC<Props> = memo(
  ({ date, id, onChange, ...inputProps }) => {
    const [isEdited, setIsEdited] = useState<boolean>(false);

    const updateFirebaseDB = useCallback(
      async (id: string | undefined) => {
        if (restrictDateInput(date)) {
          await db
            .collection("todos")
            .doc(id)
            .update({
              date: date,
            })
            .then(() => {
              // console.log(`update date ${date} !`);
            });
          setIsEdited(false);
        }
      },
      [date]
    );

    const onClickEditOn = useCallback(() => {
      setIsEdited(true);
    }, []);

    const onKeyUpUpdate = useCallback(
      async (id: string | undefined) => {
        updateFirebaseDB(id);
      },
      [updateFirebaseDB]
    );

    const onClickUpdate = useCallback(
      async (id: string | undefined) => {
        updateFirebaseDB(id);
      },
      [updateFirebaseDB]
    );

    const dateFormatted = (date: string | undefined) => {
      if (date) {
        return date.split("-").join("/");
      }
    };

    const editForm = isEdited ? (
      <>
        <SDateInput
          type="date"
          value={date}
          min="1900-01-01"
          max={nowDate}
          required
          onChange={onChange}
          onKeyUp={() => onKeyUpUpdate(id)}
          {...inputProps}
        />
        <button>
          <SIconUpdate
            className="fas fa-redo-alt"
            onClick={() => onClickUpdate(id)}
          ></SIconUpdate>
        </button>
      </>
    ) : (
      <>
        <SDateText onClick={onClickEditOn}>
          <span>{dateFormatted(date)}</span>
          <button>
            <SIconEdit className="fas fa-pen" />
          </button>
        </SDateText>
      </>
    );

    return <>{editForm}</>;
  }
);

const SDateInput = styled.input`
  padding: 0 0.25em;
  min-height: 30px;
  outline: 1px solid #ccc;
  background-color: #fff;
`;

const SDateText = styled.span`
  min-height: 30px;
  display: inline-flex;
  align-items: center;
`;

const SIcon = styled.i`
  cursor: pointer;
  color: #ccc;
`;

const SIconUpdate = styled(SIcon)`
  margin-left: 0.5em;
`;

const SIconEdit = styled(SIcon)`
  margin-left: 0.5em;
`;
