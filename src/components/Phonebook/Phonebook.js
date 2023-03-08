import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './form';
import { ContactList } from './contactList';
import { Filter } from './Filter';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert('Person already in contacts');
      return;
    }

    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, { ...contact, id: nanoid() }],
      };
    });
  };

  handleFilter = evt => {
    this.setState(() => {
      return {
        filter: evt.target.value.toLowerCase(),
      };
    });
  };

  handleDelete = evt => {
    const target = evt.currentTarget;
    const id = target.closest('li').id;
    const index = this.state.contacts.findIndex(contact => {
      return contact.id === id;
    });
    this.setState(({ contacts }) => {
      const arr = [...contacts];
      arr.splice(index, 1);
      return {
        contacts: arr,
      };
    });
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  render() {
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
        </div>

        <div>
          <h2>Contacts</h2>
          <Filter onChange={this.handleFilter} />
          {this.state.contacts.length > 0 && (
            <ContactList
              contacts={this.state.contacts}
              filter={this.state.filter}
              handleDelete={this.handleDelete}
            />
          )}
        </div>
      </>
    );
  }
}
