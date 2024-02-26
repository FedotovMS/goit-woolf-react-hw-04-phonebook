import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value.trim());
    }
    if (name === 'number') {
      setNumber(value.trim());
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name, number });

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' ][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onInput={handleInput}
          className={styles.input}
          placeholder="Name"
        />
        <input
          type="tel"
          name="number"
          value={number}
          pattern="(\(\d{3}\) \d{3}-\d{2}-\d{2}|\d{3} \d{3} \d{2} \d{2}|\d{5,12})"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onInput={handleInput}
          className={styles.input}
          placeholder="Number"
        />
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </form>
    </div>
  );
}
