import React, { PropTypes } from 'react';

const SelectInput = ({ name, label, onChange, defaultOption, value, error, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select name={name}
                onChange={onChange}
                className="form-control"
                value={value}>
          <option value="">{defaultOption}</option>
          {options.map(option => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

const { string, func, arrayOf, object } = PropTypes;

SelectInput.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  onChange: func.isRequired,
  defaultOption: string,
  value: string,
  error: string,
  options: arrayOf(object)
};

export default SelectInput;
