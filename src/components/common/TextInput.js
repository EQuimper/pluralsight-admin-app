import React, { PropTypes } from 'react';

const TextInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = 'form-group';

  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input type="text"
               name={name}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               className="form-control" />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

const { string, func } = PropTypes;

TextInput.propTypes = {
  name:  string.isRequired,
  label:  string.isRequired,
  onChange:  func.isRequired,
  placeholder:  string.isRequired,
  value:  string,
  error: string
};

export default TextInput;
