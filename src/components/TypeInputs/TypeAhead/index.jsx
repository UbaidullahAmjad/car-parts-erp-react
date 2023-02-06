import React from "react";
import "./TypeAhead.css"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from "react-bootstrap-typeahead";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export const TypeAheadToggleButton = ({ isOpen, onClick }) => (
  <button
    type="button"
    className="typehead_form_control_toggle_button rbt-aux_"
    onClick={onClick}
    onMouseDown={(e) => {
      // Prevent input from losing focus.
      e.preventDefault();
    }}
  >
    {/* {isOpen ? '▲' : '▼'} */}
    {/* <span className={isOpen ? "fa fa-angle-up" : "fa fa-angle-down"}></span> */}
    {isOpen ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
  </button>
);

const TypeAhead = (props) => {

  const { hideArrows } = props;

  return (
    <Typeahead
      className={`typehead_form_control ${props.disabled ? 'disabled' : ''}`}
      id="multiple-typeahead"
      ref={props.ref}
      defaultInputValue={props.defaultInputValue}
      key={props.key}
      filterBy={props.filterBy}
      placeholder={props.placeholder}
      labelKey={props.labelKey}
      options={props.options}
      selected={props.selected}
      defaultSelected={props.defaultSelected}
      onChange={props.onChange}
      paginate={props.paginate}
      onPaginate={props.onPaginate}
      clearButton={props.clearButton}
      multiple={props.multiple}
      disabled={props.disabled}
      maxResults={props.maxResults}
    >
      {({ isMenuShown, toggleMenu }) => (
        (!hideArrows || hideArrows == false) && (
          <TypeAheadToggleButton
            isOpen={isMenuShown}
            onClick={(e) => toggleMenu()}
          />
        )
      )}
    </Typeahead>
  );
};

export default TypeAhead;
