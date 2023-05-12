import React, { useState, useEffect } from "react";
import styled from "styled-components";

function ListedFile(props) {
  const Item = styled.li`
    backgroundColour: ${props.selected ? "blue" : "blue"};
  `;
  return <Item key={props.file._id}>{props.file.name}</Item>;
}

export default ListedFile;
