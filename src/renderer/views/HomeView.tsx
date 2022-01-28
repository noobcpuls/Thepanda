import React, { useState } from 'react'
import styled from 'styled-components';

export default function HomeView() {
    
    return (
        <Md>
            <HH>끝까지 판다, 판다교육입니다.</HH>
            <PP1>최고의 강사가 최고의 강의를, 모든 학생이 최고의 교육을 들을 수 있도록 하겠습니다. 위례 최고의 입시전문학원, 판다교육학원 입니다.</PP1>
            <PP2>교육특구에서 수 많은 학생들을 가르치면서 한가지 생각이 들었습니다. 왜 이곳의 학생들이 더 좋은 학교에 진학할까? 다른 지역에서의 학생들은 어떻게 공부하고 있을까? 온라인 수업을 하면서 이 궁금증은 어느정도 해결되었습니다.</PP2>
            <PP2>심화된 수업, 입시에 대한 제대로된 정보를 알 수 없는 타 지역 학생들은 뒤쳐질 수 밖에 없다고 확신했습니다. 저희는 이러한 현실을 알고 모든 학생에게 공평한 기회를 제공하고자 판다교육학원을 개원하게 되었습니다.</PP2>
            <PP2>더 많은 정보, 심화된 수업, 제대로된 강사. 그리고 즐겁게 일하는 공간. 판다교육학원에서는 이 모든것들이 가능하도록 최선을 다하고 있습니다. 위례 최고의 수학, 과학, 국어, 입시학원 판다교육학원 입니다.</PP2>
            <HH>제품 소개</HH>
            <PP2>
                판다교육에서 현재 사용하고 있는 프로그램입니다. 선생님들과 조교들의 편의를 위해, 그리고 학원의 체계적인 시스템 구축을 위해 사용하고 있습니다. 
            </PP2>
            <HH>QR 코드 생성</HH>
            <PP1>QR 코드를 생성합니다.</PP1>
            <PP2>기존의 QR 코드를 만들어주는 홈페이지들은 한 번에 하나씩밖에 얻을 수 없었습니다. 이 프로그램을 이용하면 한번에 여러 QR 코드를 다운로드할 수 있습니다. 대량의 QR 코드를 생성하고 싶을 때 유용합니다.</PP2>
            <PP2>
                링크 입력 : 입력 칸에 동영상 링크 또는 홈페이지 링크를 입력하세요. 유튜브 플레이리스트의 경우 플레이리스트 갯수만큼 생성됩니다.
            </PP2>
            <PP2>
                변환 : Convert 버튼을 누르면 링크가 QR 코드로 변환됩니다.
            </PP2>
            <PP2>
                모두 다운로드 : 생성된 QR 코드를 zip 파일로 모두 다운로드합니다. 이때 파일명은 모두 'QR 코드 모음집' 이므로 여러 개의 zip 파일을 다운로드할 경우 파일 이름을 바꿔주세요.
            </PP2>
            <PP2>
                모두 삭제하기 : 모든 QR 코드가 삭제됩니다.
            </PP2>
            <PP2>
                개별 다운로드 : QR 코드를 변환하면 화면상에 각각의 QR 코드가 나옵니다. QR 코드를 눌러 다운로드하거나 X 버튼을 눌러 개별 삭제할 수 있습니다.
            </PP2>
        </Md>
    );
}

export const Md = styled.div `
    padding: 32px;
`

export const HH = styled.h1`
    font-size: 2.2rem;
    font-weight: 400;
    color: ${props => props.theme.colors.primary.contrast};
`

export const PP = styled.p`
    font-size: 1rem;
    font-weight: 300;
    color: ${props => props.theme.colors.primary.contrast};
`

export const PH = styled.p`
    font-size: 1.6rem;
    font-weight: 200;
    color: ${props => props.theme.colors.primary.contrast};
`

const PP1 = styled(PP)`
    font-size: 1.1rem;
    margin: 2.4rem 0;
    padding: 0 2.7rem;
    line-height: 24px;
    border-left: 1px solid ${props => props.theme.colors.primary.contrast};
`

const PP2 = styled(PP)`
    font-size: 1.1rem;
    margin: 2.4rem 0;
    padding: 0 0.7rem;
    line-height: 24px;
`

