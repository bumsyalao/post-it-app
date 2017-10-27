import React from 'react';

const Input = (props) => ({
  render() {
    return (
        <div className='form-group'>
            <input
              name={props.name}
              type={props.type}
              className={props.className} 
              placeholder={props.placeholder}
              pattern={props.pattern}
              value={props.value}
              onChange={props.action}
              required        
            />
        </div>
    );
  }

});
export default Input;