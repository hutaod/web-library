import React, { Component } from "react";
import { connect } from "react-redux";

class Counter extends Component {
  render() {
    const { counter, onIncrement, dispatch } = this.props;
    return (
      <div>
        <p>{counter}</p>
        <div>
          <button onClick={onIncrement}>+</button>
          <button
            onClick={() => {
              dispatch({
                type: "DECREMENT"
              });
            }}
          >
            -
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              dispatch({
                type: "INCREMENT_ASYNC",
                payload: 2
              });
              dispatch({
                type: "INCREMENT_ASYNC",
                payload: 2
              });
            }}
          >
            延迟 +2
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  dispatch => {
    return {
      dispatch,
      onIncrement: () => {
        dispatch({
          type: "INCREMENT"
        });
      }
    };
  }
)(Counter);
