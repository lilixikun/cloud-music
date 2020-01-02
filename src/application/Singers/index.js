import React, { useState } from 'react';
import { NavContainer } from "./style";
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';

function Singers(props) {

  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
  }

  let handleUpdateCatetory = (val) => {
    setCategory(val);
  }

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={(val) => handleUpdateCatetory(val)}
        oldVal={category}
      />
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={(val) => handleUpdateAlpha(val)}
        oldVal={alpha}
      />
    </NavContainer>
  )
}

export default React.memo(Singers);