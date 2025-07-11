import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Form() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // either the form is add or update mode!
  const [updateMode, setUpdateMode] = useState(false);

  const dispatch = useAppDispatch();

  // const { isLoading, isError } = useAppSelector(state => state.task);
  const task = useAppSelector(state => state.task);

  console.log(task);

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      {/* <form onSubmit={updateMode ? handleUpdate : handleCreate}> */}
      <form>
        <div className="form-group">
          <label htmlFor="transaction_name">Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="enter title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          {/* <div className="radio_group">
            <input
              type="radio"
              placeholder="Income"
              required
              name="type"
              value="income"
              checked={type === "income"}
              onChange={e => setType("income")}
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              placeholder="Expense"
              required
              name="type"
              value="expense"
              checked={type === "expense"}
              onChange={e => setType("expense")}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div> */}
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Description</label>
          <input
            type="text"
            placeholder="enter description"
            required
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <button
          // disabled={isLoading}
          className="btn"
          type="submit"
        >
          {updateMode ? 'Update' : 'Add'} Transaction
        </button>

        {/* Error message */}
        {/* {
          !isLoading && isError && (
            <p className="error">
              An error occurred
            </p>
          )
        } */}

      </form>

      {/* {
        updateMode && (
          <button
            onClick={cancelUpdateMode}
            className="btn cancel_update"
          >
            Abort the Update
          </button>
        )
      } */}
    </div>
  )
}
