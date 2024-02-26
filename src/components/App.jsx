import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    parsedContacts && setContacts(parsedContacts);
  }, []);

  useEffect(
    prev => {
      if (prev !== contacts)
        localStorage.setItem('contacts', JSON.stringify(contacts));
    },
    [contacts]
  );

  const addContact = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);

      return;
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(prev => [...prev, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = ({ target }) => {
    setFilter(target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>

      {contacts[0] ? (
        <Filter value={filter} onFilter={handleFilterChange} />
      ) : (
        <Notification message="No contacts added" />
      )}
      {contacts[0] && !filteredContacts[0] && (
        <Notification message="No contact found" />
      )}
      {filteredContacts[0] && (
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      )}
    </div>
  );
}
