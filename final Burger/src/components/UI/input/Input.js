import React from 'react'
import classes from './Input.css'

const Input = (props) => {

    let InputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType){
        case('input'):
        InputElement=<input className={inputClasses.join(' ')} 
         {...props.elementConfig} 
         value={props.value}
         onChange={props.changed}/>
        break;

        case('textarea'):
        InputElement= <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
         value={props.value}
         onChange={props.changed}/>
        break;

        case('select'):
        InputElement =(
            <select
            className={inputClasses.join(' ')} value={props.value}  onChange={props.changed}>
            {props.elementConfig.options.map(option=>(
                <option key={option.value} value={option.value}
               >
                    {option.displayvalue}
                </option>
            ))}
            </select>
        );
        break;

        default:
            InputElement= <input  className={inputClasses.join(' ')}{...props.elementConfig} value={props.value}/>
    }

   return(
    <div className={classes.Input} >
        <label className={classes.label}>{props.lebal}</label>
        {InputElement}
    </div>
  )
   }

export default Input