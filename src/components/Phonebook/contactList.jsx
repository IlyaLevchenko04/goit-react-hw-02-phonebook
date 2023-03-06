import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const ContactList = ({ handleDelete, contacts, filter }) => {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => {
        const lowerName = name.toLowerCase();
        return (
          lowerName.includes(`${filter.trim()}`) && (
            <li key={nanoid()} id={id}>
              {`${name}: ${number}`}
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            </li>
          )
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
