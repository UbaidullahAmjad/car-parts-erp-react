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

const TypeAheadInfiniteScroll = (props) => {

  const { hideArrows, handleLoadMore, loadMoreLoading, disableLoadMore, onInputChangeValue } = props;

  // console.log("options ------------",props.options);

  return (
    <Typeahead
      className={`typehead_form_control typehead_infinite_scroll ${props.disabled ? 'disabled' : ''}`}
      id="multiple-typeahead"
      ref={props.ref}
      key={props.key}
      placeholder={props.placeholder}
      // filterBy={props.filterBy}
      labelKey={props.labelKey}
      options={props.options || []}
      selected={props.selected}
      defaultSelected={props.defaultSelected}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
      // maxResults={props.maxResults ? props.maxResults.length : 0}
      // maxResults={props.maxResults ? props.maxResults : 0}
      maxResults={false}
      // paginate={onInputChangeValue ? true : false}
      paginate={false}
      onPaginate={props.onPaginate}
      paginationText={"Display more records..."}
      clearButton={props.clearButton}
      multiple={props.multiple}
      disabled={props.disabled}
      onInputChange={props.onInputChange}
      onKeyDown={props.onKeyDown}
      //------------------
      renderMenu={(results, menuProps) => (
        <Menu {...menuProps}>
          {/* {console.log("renderMenu-results", results)} */}
          {/* {console.log("renderMenu-menuProps",menuProps)} */}
          {/* {console.log("renderMenu-defaultValue", props.defaultValue)} */}
          {/* {console.log("renderMenu-defaultSelected", props.defaultSelected)} */}
          {/* {console.log("renderMenu-value", props?.value)} */}
          {/* {console.log("renderMenu-onChange", props?.onChange)} */}
          {
            results.length == 0 && <MenuItem disabled className="mb-0">No matches found</MenuItem>
          }
          {results.map((result, index) => (
            <>
              {
                result.paginationOption == true ?
                  <MenuItem option={result} position={index} key={index} className="border border-top border-3">
                    {"Display more records..."}
                  </MenuItem>
                  :
                  <MenuItem option={result} position={index} key={index}>
                    {result}
                  </MenuItem>
              }
              {
                (results.length - 1) == index && (!disableLoadMore || disableLoadMore == false)
                && (!onInputChangeValue || onInputChangeValue == "" || onInputChangeValue == null) && props.value == "" && (
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
      )
      }
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
