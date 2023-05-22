import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import api from "../api";

const RemoveButton = styled.button`
  background-color: crimson;
  text-fill-color: white;
  color: white;
  margin-left: 7px;
  margin-right: 7px;
`;

function File(props) {
  return (
    <li>
                {props.image.key}
                <img
                  src={`http://localhost:8000/images/${props.image.key}`}
                  style={{ height: "100px" }}
                />
                <RemoveButton
                  id={props.image.key}
                  className="close"
                  type="button"
                  onClick={() => {
                    props.remove(props.image._id);
                    props.getData();
                  }}
                >
                  &#x2715;
                </RemoveButton>
              </li>
  )}
  export default File;