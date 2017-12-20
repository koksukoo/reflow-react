import React from 'react';
import PropTypes from 'prop-types';
import { Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';

/**
 * Slider handle
 */
const SliderHandle = (props) => {
  const {
    value, dragging, index, ...rest
  } = props;

  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...rest} />
    </Tooltip>
  );
};

SliderHandle.propTypes = {
  value: PropTypes.number,
  dragging: PropTypes.bool,
  index: PropTypes.node,
};

export default SliderHandle;
