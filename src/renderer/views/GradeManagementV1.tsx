import React, { useState, useRef } from "react";
import { HH, PP, Md } from "./HomeView";
import styled from "styled-components";
import { dialog } from "@electron/remote/";
import fs from "fs";
import { BsPlusLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export function GradeManage() {
  interface student {
    id: number;
    grade: number;
    name: string;
    score: string;
  }

  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [tableTitle, setTableTitle] = useState<string>("");
  const [maxsco, setMaxsco] = useState<number>(100);
  const [minsco, setMinsco] = useState<number>(80);
  const [isPercent, setIsPercent] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");
  const [stu, setStu] = useState<student[]>([]);
  const [isChangeName, setIsChangeName] = useState<boolean>(false);
  const [changeText, setChangeText] = useState<string>("");
  const [isHideName, setIsHideName] = useState<boolean>(false);
  const nextId = useRef(1);
  const nextGrade = useRef(0);
  const prevGrade = useRef(1);

  async function handleClickReadToExcel() {
    try {
      setIsHideName(false);
      const result = await dialog.showOpenDialog({ properties: ["openFile"] });
      const { filePaths } = result;
      if (filePaths.length != 1) return;
      const file = filePaths[0];

      const response = await fs.promises.readFile(file);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(response.buffer);
      const sheet = workbook.getWorksheet("성적표");

      const _stu: student[] = [];

      const rowLength: number = Number(sheet.getCell("A206").value) || 0;
      const leng: number = Number(sheet.getCell("A205").value) || 1;

      if (rowLength > 0) {
        handleClickClearTable();
        for (let i = 0; i <= rowLength; i++) {
          const row = sheet.getRow(i + 300);
          if (row.getCell(leng + 1).value !== null) {
            const _stud: student = {
              id: nextId.current,
              grade: 0,
              name: "",
              score: "",
            };
            _stud.name = row.getCell(leng + 1).value?.toString() || "";
            _stud.score = row.getCell(leng + 2).value?.toString() || "";
            _stu.push(_stud);
            nextId.current++;
          }
        }
        setStu(_stu);
      }

      nextId.current = 1;

      setMaxsco(Number(sheet.getCell("A201").value) || 100);
      setMinsco(Number(sheet.getCell("A202").value) || 80);
      setIsPercent(
        sheet.getCell("A203").value?.toString() === "false" ? false : true
      );
      setColor(sheet.getCell("A204").value?.toString() || "");
    } catch (error) {
      throw error;
    }
  }

  function Al(num: number): string | undefined {
    let s = "",
      t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = ((num - t) / 26) | 0;
    }
    return s || undefined;
  }

  async function handleClickSaveToExcel() {
    try {
      const result = await dialog.showOpenDialog({ properties: ["openFile"] });
      const { filePaths } = result;
      if (filePaths.length != 1) return;
      const file = filePaths[0];

      const response = await fs.promises.readFile(file);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(response.buffer);
      const sheet = workbook.getWorksheet("성적표");

      const leng: number = Number(sheet.getCell("A205").value) + 5 || 1;
      const rowLength: number = Number(sheet.getCell("A206").value) || 0;
      const rowIndex: number = stu.length < 40 ? 40 : stu.length;
      sheet.pageSetup = {
        printArea: `${Al(leng)}1:${Al(leng + 3)}${rowIndex + 4}`,
        paperSize: 9,
        orientation: "portrait",
        horizontalCentered: true,
        verticalCentered: true,
        scale: stu.length > 52 ? 80 : 100,
        margins: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          header: 0,
          footer: 0,
        },
      };

      for (let i = 2; i <= rowIndex + 4; i++) {
        for (let j = leng; j <= leng + 3; j++) {
          sheet.getCell(`${Al(j)}${i}`).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        }

        sheet.getRow(i).height = 15;
      }

      sheet.getColumn(leng).header = "순위";
      sheet.getColumn(leng + 1).header = "이름";
      sheet.getColumn(leng + 2).header = "점수";
      sheet.getColumn(leng + 3).header = "순위 변동";

      sheet.getColumn(leng).key = "grade";
      sheet.getColumn(leng + 1).key = "name";
      sheet.getColumn(leng + 2).key = "score";
      sheet.getColumn(leng + 3).key = "change";

      sheet.getColumn(leng).width = 15;
      sheet.getColumn(leng + 1).width = 20;
      sheet.getColumn(leng + 2).width = 20;
      sheet.getColumn(leng + 3).width = 15;

      sheet.mergeCells(`${Al(leng)}1:${Al(leng + 3)}1`);
      const A1 = sheet.getCell(`${Al(leng)}1`);
      A1.value = tableTitle !== "" ? tableTitle : "테이블 이름";
      const fontColor: string =
        color === "" ? "000000" : color.slice(1).toUpperCase();
      A1.style.font = {
        size: 22,
        bold: true,
      };
      A1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF" + fontColor },
        bgColor: { argb: "FF" + fontColor },
      };

      sheet.getRow(2).getCell(leng).value = "순위";
      sheet.getRow(2).getCell(leng + 1).value = "이름";
      sheet.getRow(2).getCell(leng + 2).value = "점수";
      sheet.getRow(2).getCell(leng + 3).value = "순위 변동";

      sheet.getRow(2).getCell(leng).style.font = {
        bold: true,
      };
      sheet.getRow(2).getCell(leng + 1).style.font = {
        bold: true,
      };
      sheet.getRow(2).getCell(leng + 2).style.font = {
        bold: true,
      };
      sheet.getRow(2).getCell(leng + 3).style.font = {
        bold: true,
      };

      for (let i = 0; i < stu.length; i++) {
        const row = sheet.getRow(i + 3);
        const dataRow = sheet.getRow(i + 300);
        if (stu[i].grade > 0) {
          row.getCell(leng).value = stu[i].grade;
          row.getCell(leng + 1).value = isHideName
            ? hideName(9999, stu[i].name)
            : stu[i].name;
          row.getCell(leng + 2).value = isPercent
            ? roundToTwo(stu[i].score, maxsco)
            : Number(stu[i].score);
          if (leng > 1) {
            const preLeng = leng - 5;
            for (let j = 0; j <= rowLength; j++) {
              const prevRow = sheet.getRow(j + 3);
              const prevDataRow = sheet.getRow(j + 300);
              if (
                prevDataRow.getCell(preLeng + 1).value?.toString() ===
                stu[i].name
              ) {
                console.log(prevDataRow.getCell(preLeng + 1).value?.toString());
                const preGrade: number =
                  prevRow.getCell(preLeng)?.toString() !== "미응시"
                    ? Number(prevRow.getCell(preLeng))
                    : 9999;
                if (stu[i].grade > 0) {
                  const varGrade = preGrade - stu[i].grade;
                  if (preGrade === 9999) {
                    row.getCell(leng + 3).value = "지난주 미응시";
                  } else if (Math.sign(varGrade) === 1) {
                    row.getCell(leng + 3).value = `▲ ${varGrade}`;
                    row.getCell(leng + 3).font = {
                      color: { argb: "FFF72585" },
                    };
                  } else if (Math.sign(varGrade) === -1) {
                    row.getCell(leng + 3).value = `▼ ${varGrade * -1}`;
                    row.getCell(leng + 3).font = {
                      color: { argb: "FF4361EE" },
                    };
                  } else {
                    row.getCell(leng + 3).value = "변동 없음";
                  }
                }
                break;
              }
            }
          }
        }
        dataRow.getCell(leng + 1).value = stu[i].name;
        dataRow.getCell(leng + 2).value = stu[i].score;
      }

      let index: number = rowIndex + 3;
      for (let stud of stu) {
        if (stud.grade <= 0) {
          const row = sheet.getRow(index);
          row.getCell(leng).value = "미응시";
          row.getCell(leng + 1).value = stud.name;
          index--;
        }
      }

      if (stu.length > 0) {
        let total: number = 0;
        let exist: number = 0;
        stu.forEach((stud) => {
          if (stud.grade > 0) {
            total += Number(stud.score);
            exist++;
          }
        });
        const avg: number = isPercent
          ? roundToTwo(total / exist, maxsco)
          : Math.round((total / exist + Number.EPSILON) * 100) / 100;
        sheet.mergeCells(
          `${Al(leng)}${rowIndex + 4}:${Al(leng + 2)}${rowIndex + 4}`
        );
        sheet.getCell(`${Al(leng)}${rowIndex + 4}`).value = "전체 평균";
        sheet.getCell(`${Al(leng + 3)}${rowIndex + 4}`).value = avg;
      }

      for (let i = 1; i <= leng + 3; i++) {
        sheet.getColumn(i).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      }

      sheet.getCell("A200").value = tableTitle;
      sheet.getCell("A201").value = maxsco;
      sheet.getCell("A202").value = minsco;
      sheet.getCell("A203").value = isPercent;
      sheet.getCell("A204").value = color;
      sheet.getCell("A205").value = leng;
      sheet.getCell("A206").value = rowIndex;

      const mimeType = {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], mimeType);
      saveAs(blob, tableTitle !== "" ? tableTitle : "테이블 이름" + ".xlsx");
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeStuname(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function isNumber(s: any) {
    s += ""; // 문자열로 변환
    s = s.replace(/^\s*|\s*$/g, ""); // 좌우 공백 제거
    if (s == "" || isNaN(s)) return false;
    return true;
  }

  function handleChangeInitScore(e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;
    const input: boolean = isNumber(value);
    if (!input) {
      return;
    } else {
      setScore(value);
    }
  }

  function handleChangeScore(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    const value: string = e.target.value;
    const input: boolean = isNumber(value);
    if (!input && value !== "") {
      return;
    }
    setStu(
      stu.map((stud) => (stud.id === id ? { ...stud, score: value } : stud))
    );
  }

  function handleClickAddStu() {
    const student: student = {
      id: nextId.current,
      grade: 0,
      name: text,
      score: score,
    };
    nextId.current++;
    setStu([...stu, student]);
    setText("");
    setScore("");
  }

  function handleKeyPressAddStu(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleClickAddStu();
    }
  }

  function handleChangeTableTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.length > 30) {
      setTableTitle(value.slice(0, 31) + "...");
    } else {
      setTableTitle(value);
    }
  }

  function handleChangeMaxscore(e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;
    const input: number = value === "" ? 100 : parseFloat(value);
    if (isNaN(input)) {
      return;
    } else {
      setMaxsco(input);
    }
  }

  function handleClickClearTable(): void {
    setStu([]);
    setMaxsco(0);
    setMinsco(80);
    setColor("");
  }

  function handleClickDeleteItem(id: number) {
    setStu(stu.filter((stud) => stud.id !== id));
  }

  function handleClickChangeName(id: number) {
    setStu(
      stu.map((stud) => (stud.id === id ? { ...stud, name: changeText } : stud))
    );
  }

  function handleClickSortByScore() {
    const _stu = stu
      .concat()
      .sort((a: student, b: student) => Number(b.score) - Number(a.score));

    setStu(
      _stu.map((stud: student, index: number) => {
        nextGrade.current++;
        if (stud.score === "") {
          return { ...stud, grade: 0 };
        }
        if (index > 0 && stud.score === stu[index - 1].score) {
          return { ...stud, grade: prevGrade.current };
        }
        prevGrade.current = nextGrade.current;
        return { ...stud, grade: nextGrade.current };
      })
    );

    nextGrade.current = 0;
  }

  function handleClickSortByName() {
    const _stu = [...stu].sort((a: student, b: student) =>
      a.name.localeCompare(b.name)
    );

    setStu(_stu);
  }

  function hideName(score: string | number, name: string): string {
    if (score === 9999) {
      return name.slice(0, 1) + "**";
    }
    if (isPercent && roundToTwo(score, maxsco) < minsco) {
      return name.slice(0, 1) + "**";
    }
    if (!isPercent && Number(score) < minsco) {
      return name.slice(0, 1) + "**";
    }
    return name;
  }

  function handleChangeMinsco(e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;
    const input: number = value === "" ? 80 : parseFloat(value);
    if (isNaN(input)) {
      return;
    } else {
      setMinsco(input);
    }
  }

  function handleChangeCheckPrecent() {
    setIsPercent(!isPercent);
  }

  function roundToTwo(num1: number | string, num2: number) {
    const num: number = Number(num1);
    var m = Number((Math.abs((num * 100) / num2) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  function handleChangeSetColor(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  }

  async function handleClickSaveToExcelNew() {
    const rowIndex = stu.length < 40 ? 40 : stu.length;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("성적표", {
      pageSetup: {
        paperSize: 9,
        orientation: "portrait",
        printArea: `A1:D${rowIndex + 4}`,
        horizontalCentered: true,
        verticalCentered: true,
        scale: stu.length > 52 ? 75 : 100,
        margins: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          header: 0,
          footer: 0,
        },
      },
    });

    sheet.columns = [
      { header: "순위", key: "grade", width: 15 },
      { header: "이름", key: "name", width: 20 },
      { header: "점수", key: "score", width: 20 },
      { header: "순위 변동", key: "change", width: 15 },
    ];

    sheet.getRow(1).height = 32;

    sheet.mergeCells("A1:D1");
    const A1 = sheet.getCell("A1");
    A1.value = tableTitle !== "" ? tableTitle : "테이블 이름";
    const fontColor: string =
      color === "" ? "000000" : color.slice(1).toUpperCase();
    A1.style.font = {
      size: 22,
      bold: true,
    };
    A1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF" + fontColor },
      bgColor: { argb: "FF" + fontColor },
    };

    sheet.getCell("A2").value = "순위";
    sheet.getCell("B2").value = "이름";
    sheet.getCell("C2").value = "점수";
    sheet.getCell("D2").value = "순위 변동";

    sheet.getCell("A2").style.font = {
      bold: true,
    };
    sheet.getCell("B2").style.font = {
      bold: true,
    };
    sheet.getCell("C2").style.font = {
      bold: true,
    };
    sheet.getCell("D2").style.font = {
      bold: true,
    };

    sheet.mergeCells(`D3:D${rowIndex + 3}`);
    sheet.getCell("D3").value = "ヽ（・＿・；)ノ";

    for (let i = 0; i < stu.length; i++) {
      const row = sheet.getRow(i + 3);
      const dataRow = sheet.getRow(i + 300);
      if (stu[i].grade !== 0) {
        row.getCell(1).value = stu[i].grade;
        row.getCell(2).value = isHideName
          ? hideName(9999, stu[i].name)
          : stu[i].name;
        row.getCell(3).value = isPercent
          ? roundToTwo(stu[i].score, maxsco)
          : Number(stu[i].score);
      }
      dataRow.getCell(2).value = stu[i].name;
      dataRow.getCell(3).value = stu[i].score;
    }

    let index: number = rowIndex + 3;
    for (let stud of stu) {
      if (stud.grade <= 0) {
        const row = sheet.getRow(index);
        row.getCell(1).value = "미응시";
        row.getCell(2).value = hideName(9999, stud.name);
        index--;
      }
    }

    if (stu.length > 0) {
      let total: number = 0;
      let exist: number = 0;
      stu.forEach((stud) => {
        if (stud.grade !== 0) {
          total += Number(stud.score);
          exist++;
        }
      });
      const avg: number = isPercent
        ? roundToTwo(total / exist, 100)
        : roundToTwo(total / exist, maxsco);
      sheet.mergeCells(`A${rowIndex + 4}:C${rowIndex + 4}`);
      sheet.getCell(`A${rowIndex + 4}`).value = "전체 평균";
      sheet.getCell(`D${rowIndex + 4}`).value = avg;
    }

    for (let i = 2; i <= rowIndex + 4; i++) {
      sheet.getRow(i).eachCell({ includeEmpty: true }, (cell) => {
        cell.style = {
          border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
        };
      });

      sheet.getRow(i).height = 15;
    }

    for (let i = 1; i <= 4; i++) {
      sheet.getColumn(i).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    }

    sheet.getCell("A200").value = tableTitle;
    sheet.getCell("A201").value = maxsco;
    sheet.getCell("A202").value = minsco;
    sheet.getCell("A203").value = isPercent;
    sheet.getCell("A204").value = color;
    sheet.getCell("A205").value = 1;
    sheet.getCell("A206").value = rowIndex;

    const mimeType = {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], mimeType);
    saveAs(blob, tableTitle !== "" ? tableTitle : "테이블 이름" + ".xlsx");
  }

  return (
    <Md>
      <HH>주간 학생 성적관리</HH>
      <Field>
        <Setfieldex>
          <Titlediv>
            <Title>엑셀 불러오기</Title>
          </Titlediv>
          <Line />
          <Input>
            <ButtonDiv>
              <SetTableButton onClick={handleClickReadToExcel}>
                파일 불러오기
              </SetTableButton>
              <SetTableButton onClick={handleClickSaveToExcel}>
                기존 파일에 저장
              </SetTableButton>
              <SetTableButton onClick={handleClickSaveToExcelNew}>
                새 파일에 저장
              </SetTableButton>
            </ButtonDiv>
          </Input>
        </Setfieldex>
        <Setfieldco>
          <Titlediv>
            <Title>학생 설정</Title>
            <TPlus onClick={handleClickAddStu} />
          </Titlediv>
          <Line />
          <Input>
            <Inputdiv>
              <PP>학생 이름 :</PP>
              <Addstudent
                type="text"
                placeholder="학생 이름을 입력해주세요."
                onChange={handleChangeStuname}
                onKeyPress={handleKeyPressAddStu}
                value={text}
              />
            </Inputdiv>
            <Inputdiv>
              <PP>점수 :</PP>
              <AddMaxScore
                type="text"
                placeholder="점수를 입력해주세요."
                onChange={handleChangeInitScore}
                onKeyPress={handleKeyPressAddStu}
                value={score}
              />
            </Inputdiv>
          </Input>
        </Setfieldco>
        <Setfieldco2>
          <Titlediv>
            <Title>테이블 설정</Title>
            <ColorInput
              type="color"
              onChange={handleChangeSetColor}
              value={color}
            />
          </Titlediv>
          <Line />
          <Input>
            <Inputdiv>
              <PP>테이블 이름 :</PP>
              <AddTableTitle
                type="text"
                placeholder="표 이름을 입력해주세요."
                onChange={handleChangeTableTitle}
              />
            </Inputdiv>
            <Inputdiv>
              <PP>최대 점수 :</PP>
              <AddMaxScore
                type="text"
                placeholder="최대 점수를 입력해주세요."
                onChange={handleChangeMaxscore}
              />
            </Inputdiv>
            <Inputdiv>
              <PP>최소 점수 :</PP>
              <AddTableTitle
                type="text"
                placeholder="이 점수 이하는 이름 가려짐."
                onChange={handleChangeMinsco}
              />
            </Inputdiv>
            <CheckBoxDiv>
              <input
                type="checkbox"
                id="cb"
                checked={isPercent}
                onChange={handleChangeCheckPrecent}
              />
              <CheckBoxLable htmlFor="cb">점수를 백분율로 표시</CheckBoxLable>
            </CheckBoxDiv>
            <ButtonDiv>
              <SetTableButton onClick={handleClickSortByScore}>
                표 점수로 정렬
              </SetTableButton>
              <SetTableButton onClick={handleClickSortByName}>
                표 이름으로 정렬
              </SetTableButton>
              <SetTableButton
                onClick={() => {
                  setIsHideName(!isHideName);
                }}
              >
                이름 가리기
              </SetTableButton>
              <ClearButton onClick={handleClickClearTable}>표 제거</ClearButton>
            </ButtonDiv>
          </Input>
        </Setfieldco2>
        <Tablediv>
          <Titlediv>
            <Title>{tableTitle !== "" ? tableTitle : "테이블 이름"}</Title>
            <TitleDivFlex>
              <PP>{"최대 점수 : " + maxsco}</PP>
              <PP>{"최소 점수 : " + minsco}</PP>
            </TitleDivFlex>
          </Titlediv>
          <Line />
          <Table>
            <thead>
              <Th color={color}>
                <Td>순위</Td>
                <Td>이름</Td>
                <Td>점수</Td>
              </Th>
            </thead>
            <tbody>
              {stu.map((stud) => (
                <Tr key={stud.id}>
                  <Td>{stud.grade === 0 ? "미응시" : stud.grade}</Td>
                  <Td>
                    {isHideName ? hideName(stud.score, stud.name) : stud.name}
                  </Td>
                  <Td>
                    {isPercent ? roundToTwo(stud.score, maxsco) : stud.score}
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Tablediv>
        <TScoreDiv>
          <Titlediv>
            <Title>점수 입력</Title>
          </Titlediv>
          <Line />
          {stu.map((stud) => (
            <TSInput key={stud.id}>
              {isChangeName ? (
                <ChangeNameInput
                  type="text"
                  onChange={(e) => {
                    setChangeText(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleClickChangeName(stud.id);
                      setIsChangeName(!isChangeName);
                    }
                  }}
                />
              ) : (
                <PP>{stud.name + " :"}</PP>
              )}
              <AddScore
                type="text"
                placeholder="점수"
                value={stud.score}
                onChange={(e) => handleChangeScore(e, stud.id)}
              />
              <IconDiv>
                <Pencil
                  size="1.25rem"
                  onClick={() => {
                    setIsChangeName(!isChangeName);
                  }}
                />
                <Trash onClick={() => handleClickDeleteItem(stud.id)} />
              </IconDiv>
            </TSInput>
          ))}
        </TScoreDiv>
      </Field>
    </Md>
  );
}

const Field = styled.div`
  margin-top: 2rem;
  height: auto;
  width: 100%;
  display: grid;
  grid-template-areas:
    "excel table score"
    "config table score"
    "config2 table score";
  grid-template-columns: 22rem 44rem 18rem;
  grid-template-rows: 7fr 8fr 15fr;
  justify-content: space-between;
`;

const SetField = styled.div`
  border-radius: 6px;
  border: none;
  background: ${(props) => props.theme.colors.brand2.main};
`;

const Setfieldex = styled(SetField)`
  grid-area: excel;
`;

const Setfieldco = styled(SetField)`
  grid-area: config;
  min-height: 12rem;
  margin-top: 1rem;
`;

const Setfieldco2 = styled(SetField)`
  grid-area: config2;
  min-height: 15rem;
  margin-top: 1rem;
`;

const Input = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Titlediv = styled.div`
  height: 1.5rem;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.legend`
  color: ${(props) => props.theme.colors.primary.contrast};
  font-size: 1rem;
  font-weight: 500;
`;

const Line = styled.div`
  margin-bottom: 2rem;
  height: 2px;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
`;

const TitleDivFlex = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Inputdiv = styled.div`
  width: calc(100% - 48px);
  margin: 0.5rem 0;
  padding: 0 24px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Addstudent = styled.input`
  margin-left: 1rem;
  padding: 2px;
  width: 60%;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.contrast};
  transition: all 0.25s ease-out;
  color: ${(props) => props.theme.colors.primary.contrast};
  &:focus {
    border-bottom: 1.4px solid ${(props) => props.theme.colors.primary.main};
  }
  ::placeholder {
    padding-left: 0.3rem;
    color: ${(props) => props.theme.colors.brand2.contrast};
  }
`;

const AddTableTitle = styled(Addstudent)``;

const AddMaxScore = styled(Addstudent)``;

const CheckBoxDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckBoxLable = styled.label`
  color: ${(props) => props.theme.colors.primary.contrast};
  margin-left: 0.2rem;
`;

const ButtonDiv = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const SetTableButton = styled.button`
  margin: 0.4rem;
  width: 40%;
  height: 2rem;
  border: none;
  border-radius: 8px;
  transition: all 0.25s ease-out;
  background: ${(props) => props.theme.colors.brand2.contrast};
  &:hover {
    background: ${(props) => props.theme.colors.primary.main};
  }
`;

const ClearButton = styled(SetTableButton)`
  &:hover {
    background: ${(props) => props.theme.colors.danger.main};
  }
`;

const Tablediv = styled.div`
  grid-area: table;
  margin-left: 1rem;
  width: 42rem;
  height: auto;
  background: ${(props) => props.theme.colors.brand2.main};
  border-radius: 6px;
`;

const Table = styled.table`
  margin: 0 3rem;
  margin-bottom: 2rem;
  border: 1px solid ${(props) => props.theme.colors.primary.contrast};
  border-collapse: collapse;
  width: calc(100% - 6rem);
  background: ${(props) => props.theme.colors.background};
  table-layout: fixed;
`;

const Th = styled.tr.attrs((props) => ({
  style: {
    background:
      props.color === "" ? props.theme.colors.background : props.color,
  },
}))``;

const Tr = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.colors.brand2.main};
  }
`;

const Td = styled.td`
  height: 2rem;
  border: 1px solid ${(props) => props.theme.colors.primary.contrast};
  text-align: center;
  color: ${(props) => props.theme.colors.primary.contrast};
`;

const TScoreDiv = styled.div`
  grid-area: score;
  width: 18rem;
  background-color: ${(props) => props.theme.colors.brand2.main};
  border-radius: 6px;
`;

const TSInput = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  &:last-child {
    margin-bottom: 2rem;
  }
`;

const AddScore = styled(Addstudent)`
  width: 30%;
  margin-left: 10px;
  text-align: center;
  &::placeholder {
    text-align: center;
  }
`;

const IconDiv = styled.div`
  margin-left: auto;
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Trash = styled(FaTrash)`
  color: ${(props) => props.theme.colors.primary.contrast};
  size: 0.5rem;
  transition: all 0.25s ease-out;
  &:hover {
    color: ${(props) => props.theme.colors.warning.main};
  }
`;

const Plus = styled(BsPlusLg)`
  color: ${(props) => props.theme.colors.primary.contrast};
  size: 0.5rem;
  transition: all 0.25s ease-out;
  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const Pencil = styled(RiPencilFill)`
  color: ${(props) => props.theme.colors.primary.contrast};
  transition: all 0.25s ease-out;
  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const TPlus = styled(Plus)`
  size: 1rem;
`;

const ColorInput = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  -webkit-appearance: none;
  background: transparent;
`;

const ChangeNameInput = styled.input`
  width: 40%;
  height: 1.4rem;
  border: 1px solid ${(props) => props.theme.colors.brand2.main};
  outline: none;
  border-radius: 3px;
  transition: border 0.2s ease-in-out;
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.brand1.main};
  }
`;
