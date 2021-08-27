import React from 'react'
import { ThreeContainer } from './ThreeElements'
import { ThreeObject } from './Three'

export const Panel = new ThreeObject()

function ThreeD({ isActive }) {

    return (
      <>
        <ThreeContainer id="ThreeD" isActive={isActive}></ThreeContainer>
      </>
    );
}

export default ThreeD
