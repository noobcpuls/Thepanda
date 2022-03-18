import React, { useState } from "react";
import styled from "styled-components";

export default function HomeView() {
  return (
    <Md>
      <HH>끝까지 판다, 판다교육입니다.</HH>
      <PP1>
        최고의 강사가 최고의 강의를, 모든 학생이 최고의 교육을 들을 수 있도록
        하겠습니다. 위례 최고의 입시전문학원, 판다교육학원 입니다.
      </PP1>
      <PP2>
        교육특구에서 수 많은 학생들을 가르치면서 한가지 생각이 들었습니다. 왜
        이곳의 학생들이 더 좋은 학교에 진학할까? 다른 지역에서의 학생들은 어떻게
        공부하고 있을까? 온라인 수업을 하면서 이 궁금증은 어느정도
        해결되었습니다.
      </PP2>
      <PP2>
        심화된 수업, 입시에 대한 제대로된 정보를 알 수 없는 타 지역 학생들은
        뒤쳐질 수 밖에 없다고 확신했습니다. 저희는 이러한 현실을 알고 모든
        학생에게 공평한 기회를 제공하고자 판다교육학원을 개원하게 되었습니다.
      </PP2>
      <PP2>
        더 많은 정보, 심화된 수업, 제대로된 강사. 그리고 즐겁게 일하는 공간.
        판다교육학원에서는 이 모든것들이 가능하도록 최선을 다하고 있습니다. 위례
        최고의 수학, 과학, 국어, 입시학원 판다교육학원 입니다.
      </PP2>
    </Md>
  );
}

export const Md = styled.div`
  padding: 32px;
`;

export const HH = styled.h1`
  font-size: 2.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.primary.contrast};
`;

export const PP = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.primary.contrast};
`;

export const PH = styled.p`
  font-size: 1.6rem;
  font-weight: 200;
  color: ${(props) => props.theme.colors.primary.contrast};
`;

const PP1 = styled(PP)`
  font-size: 1.1rem;
  margin: 2.4rem 0;
  padding: 0 2.7rem;
  line-height: 24px;
  border-left: 1px solid ${(props) => props.theme.colors.primary.contrast};
`;

const PP2 = styled(PP)`
  font-size: 1.1rem;
  margin: 2.4rem 0;
  padding: 0 0.7rem;
  line-height: 24px;
`;
