import React, { useState } from "react";
import { HH, PP, Md } from "./HomeView";
import styled from "styled-components";
import { dialog } from "@electron/remote";
import fs from "fs";
import { ProgressPlugin } from "webpack";

export function GradeManage() {
	const [text, setText] = useState<string>("");
	const [stu, setStu] = useState<string[]>([]);

	const handleOpenFileClick = async () => {
		try {
			const result = await dialog.showOpenDialog({ properties: ["openFile"] });
			const { filePaths } = result;
			if (filePaths.length != 1) return;

			const response = await fs.promises.readFile(filePaths[0], {
				encoding: "utf-8",
			});
			setText(response);
		} catch (error) {
			setText((error as Error).message);
		}
	};

	return (
		<Md>
			<HH>학생 성적관리 V1</HH>
			<Field>
				<SetDiv>
					<Setfieldex>
						<Title>엑셀 불러오기</Title>
						<Line />
					</Setfieldex>
					<Setfieldco>
						<Title>테이블 설정</Title>
						<Line />
					</Setfieldco>
				</SetDiv>
				<Tablediv>
					<Ttitle>테이블</Ttitle>
					<Table>
						<Th>
							<Td>순위</Td>
							<Td>이름</Td>
							<Td>점수</Td>
						</Th>
						<Tr>
							<Td></Td>
							<Td></Td>
							<Td>
								<div contentEditable="true"></div>
							</Td>
						</Tr>
					</Table>
				</Tablediv>
			</Field>
		</Md>
	);
}

const Field = styled.div`
	margin-top: 2rem;
	overflow: auto;
	display: flex;
	overflow-x: auto;
`;

const SetDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
`;

const SetField = styled.fieldset`
	width: 22rem;
	margin-bottom: 0.6rem;
	border-radius: 6px;
	border: none;
	background: ${(props) => props.theme.colors.brand2.main};
`;

const Setfieldex = styled(SetField)`
	min-height: 12rem;
`;

const Setfieldco = styled(SetField)`
	min-height: 28rem;
`;

const Title = styled.legend`
	color: ${(props) => props.theme.colors.primary.contrast};
	font-size: 1rem;
	font-weight: 200;
	position: relative;
	top: 1.4rem;
	left: 1rem;
`;

const Line = styled.div`
	margin: 2rem 0 2rem;
	height: 2px;
	width: 100%;
	background: ${(props) => props.theme.colors.background};
`;

const Filebutton = styled.button``;

const Tablediv = styled.div`
	margin: 0.5rem 0 0 1.2rem;
	padding: 0 3rem;
	width: 42rem;
	max-height: calc(12rem + 28rem);
	background: ${(props) => props.theme.colors.brand2.main};
	border-radius: 6px;
`;

const Table = styled.table`
	border: 1px solid black;
	border-collapse: collapse;
	width: 100%;
	background: ${(props) => props.theme.colors.background};
	table-layout: fixed;
`;

const Th = styled.tr``;

const Tr = styled.tr``;

const Td = styled.td`
	height: 2rem;
	border: 1px solid black;
	text-align: center;
	color: ${(props) => props.theme.colors.primary.contrast};
`;

const Ttitle = styled(PP)`
	font-size: 2.2rem;
	text-align: center;
	margin: 1.5rem;
`;
