import { useState } from 'react'

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  function addExpense() {
    if (!name.trim() || !amount) return
    setExpenses([
      ...expenses,
      { id: crypto.randomUUID(), name: name.trim(), amount: Number(amount) },
    ])
    setName('')
    setAmount('')
  }

  function removeExpense(id) {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="tracker">
      <h1>💰 Expense Tracker</h1>
      <div className="form">
        <input
          type="text"
          placeholder="What did you spend on?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (₦)"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <h2>Expenses</h2>
      <ul className="expense-list">
        {expenses.length === 0 && (
          <li className="empty">No expenses yet. Add one above!</li>
        )}
        {expenses.map((e) => (
          <li key={e.id}>
            <span className="expense-name">{e.name}</span>
            <span className="expense-amount">₦{e.amount.toLocaleString()}</span>
            <button className="remove-btn" onClick={() => removeExpense(e.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="total">
        <strong>Total:</strong> ₦{total.toLocaleString()}
      </div>
    </div>
  )
}

export default ExpenseTracker
