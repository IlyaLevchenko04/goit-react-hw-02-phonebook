import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './form';
import { ContactList } from './contactList';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  handlerChange = evt => {
    const currentTarget = evt.currentTarget;
    this.setState(() => {
      return {
        [currentTarget.name]: currentTarget.value,
      };
    });
  };

  handlerSubmit = evt => {
    evt.preventDefault();
    const arrOfNames = [...this.state.contacts].map(({ name }) =>
      name.toLowerCase()
    );
    arrOfNames.includes(this.state.name.toLowerCase())
      ? alert('Person already in contacts')
      : this.setState(({ contacts, name, number }) => {
          const arrOf = [
            ...contacts,
            { name: name, number: number, id: nanoid() },
          ];
          return {
            contacts: arrOf,
          };
        });
  };

  handleFilter = evt => {
    const currentTarget = evt.currentTarget;
    this.setState(() => {
      return {
        [currentTarget.name]: currentTarget.value.toLowerCase(),
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
          <ContactForm
            handlerSubmit={this.handlerSubmit}
            handlerChange={this.handlerChange}
          />
        </div>

        <div>
          <h2>Contacts</h2>
          <input type="text" name="filter" onChange={this.handleFilter} />
          <ContactList
            contacts={this.state.contacts}
            filter={this.state.filter}
            handleDelete={this.handleDelete}
          />
        </div>
      </>
    );
  }
}
