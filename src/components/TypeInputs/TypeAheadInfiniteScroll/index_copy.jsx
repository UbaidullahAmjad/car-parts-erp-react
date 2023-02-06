import React from "react";
import "./TypeAheadInfiniteScroll.css"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Menu, MenuItem, Typeahead, Highlighter, } from "react-bootstrap-typeahead";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Spinner from "react-bootstrap/Spinner";
import { Button } from "reactstrap";
import styled from '@emotion/styled'

const TypeMenuButton = styled(Button)`
  padding-top: 2px;
  padding-bottom: 4px;
  margin-top: 5px;
  text-align: center;
  font-weight: 600;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TypeMenuButtonLoaderOverlay = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position:  absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #1d1d1d;
  background-color: hsla(0, 0%, 100%, 0.305);
`;

export const TypeAheadToggleButton = ({ isOpen, onClick }) => (
  <button
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

const TypeAheadInfiniteScroll = (props) => {

  const { hideArrows, handleLoadMore, loadMoreLoading, disableLoadMore } = props;

  return (
    <Typeahead
      className={`typehead_form_control typehead_infinite_scroll ${props.disabled ? 'disabled' : ''}`}
      id="multiple-typeahead"
      ref={props.ref}
      key={props.key}
      placeholder={props.placeholder}
      filterBy={props.filterBy}
      labelKey={props.labelKey}
      options={props.options || []}
      selected={props.selected}
      defaultSelected={props.defaultSelected}
      onChange={props.onChange}
      maxResults={props.options ? props.options.length : 0}
      paginate={false}
      onPaginate={props.onPaginate}
      clearButton={props.clearButton}
      multiple={props.multiple}
      disabled={props.disabled}
      //------------------
      renderMenu={(results, menuProps) => (
        <Menu {...menuProps}>
          {/* {console.log("renderMenu-results",results)} */}
          {/* {console.log("renderMenu-menuProps",menuProps)} */}
          {results.map((result, index) => (
            <>
              <MenuItem option={result} position={index} key={index}>
                {result}
              </MenuItem>
              {
                (results.length - 1) == index && (!disableLoadMore || disableLoadMore == false) && (
                  <div style={{ paddingLeft: 10, paddingRight: 10, }}>
                    <TypeMenuButton color="primary" onClick={handleLoadMore} disabled={loadMoreLoading}>
                      <span style={{ display: 'inline-block' }}>Load More...</span>
                      {
                        loadMoreLoading && <TypeMenuButtonLoaderOverlay>
                          <Spinner style={{ height: 20, width: 20, }} />
                        </TypeMenuButtonLoaderOverlay>
                      }
                    </TypeMenuButton>
                  </div>
                )
              }
            </>
          ))}
        </Menu>
      )}
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

export default TypeAheadInfiniteScroll;
