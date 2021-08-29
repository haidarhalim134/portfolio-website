import React from 'react'
import { ThreeContainer } from './ThreeElements'
import { ThreeObject } from './Three'

export const Panel = new ThreeObject()

function ThreeD() {

    return (
      <>
        <ThreeContainer id="ThreeD" ></ThreeContainer>
      </>
    );
}

export default ThreeD
