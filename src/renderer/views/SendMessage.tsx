import React, { useState, useRef } from "react";
import styled from "styled-components";
import { HH, PP, Md } from "./HomeView";
import { AiOutlinePlus } from "react-icons/ai";

export function SendMessage(): JSX.Element {
	const [index, setIndex] = useState<number>(0);

	return (
		<Md>
			<HH>골라조</HH>
			<AddButton>
				새 골라조 추가... <Plus />
			</AddButton>
			<PickerDiv></PickerDiv>
		</Md>
	);
}

const AddButton = styled.button`
	margin: 2rem 0;
	padding: 0.5rem 1rem;
	background: ${(props) => props.theme.colors.foreground};
	color: ${(props) => props.theme.colors.primary.contrast};
	font-size: 1rem;
	border: none;
	border-radius: 4px;
	display: flex;
	align-content: center;
`;

const Plus = styled(AiOutlinePlus)`
	color: ${(props) => props.theme.colors.primary.contrast};
	margin-left: 0.5rem;
`;

const PickerDiv = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
	display: flex;
	justify-content: center;
`;
