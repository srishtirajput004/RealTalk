import {styled} from "@mui/material"
import {Link as LinkComponent} from "react-router-dom"
import { grayColor, matBlack } from "../../constants/color";
export const VisuallyHiddenInput=styled("input")({
    border:0,
    clip:"rect(0 0 0 0)",
    height:1,
    margin:-1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,

});

export const Link=styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover{
  background-color: rgba(0,0,0,0.1);
  }
`;


export const InputBox = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  outline: "none",
  padding: "0.8rem 1.5rem",
  borderRadius: "1.5rem",
  backgroundColor: grayColor,
  fontSize: "1rem",
  flex: 1,
  transition: theme.transitions.create(["box-shadow", "background-color"]),
  "&:focus": {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    backgroundColor: "#fff",
  },
  "&::placeholder": {
    color: theme.palette.text.secondary,
  },
}));

export const SearchField=styled("input")`
padding: 1rem 2rem;
width:20vmax;
border:none;
outline:none;
border-radius:1.5rem;
background-color:#f1f1f1;
font-size:1.1rem;
`;

export const CurveButton=styled("button")`
border-radius:1.5rem;
padding: 1rem 2rem;
border:none;
outline:none;
cursor:pointer;
background-color:${matBlack};
color:white;
font-size:1.1rem;
&:hover{
background-color:rgba(0,0,0,0.8);
}
`;
