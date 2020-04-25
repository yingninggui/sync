import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Row, Col } from 'reactstrap';
import { PhoneMissed, MicOff } from 'react-feather';
import url from 'url';

import Avatar from '../../common/Avatar';
import RoundButton from '../../common/RoundButton';
import Checkbox from '../../common/Checkbox';
import { BorderRadius, DarkHover } from '../../../constants/Styles';

const SyncPage: React.FC<any> = ({ theme }) => {
  // const [publicFeed, setPublicFeed] = useState<boolean>(true);
  const users: Array<any> = [
    { bgColor: theme.red, height: 100, width: 100 },
    { bgColor: theme.red, height: 100, width: 100 },
  ];
  const [cSelected, setCSelected] = useState<Array<any>>([]);
  const onCheckboxBtnClick = (selected: any) => {
    const index: number = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };

  const items: Array<string> = ['Item one', 'item two'];

  return (
    <SyncPageWrapper>
      <div></div>
      <Row>{users.map(Avatar)}</Row>
      <Row>
        <Col style={{ padding: '0px 50px' }}>
          <SyncPageCard>
            <h3>Checkpoints</h3>
            {items.map((item) => (
              <Checkbox
                key={item}
                onClick={() => onCheckboxBtnClick(item)}
                active={cSelected.includes(item)}
                text={item}
              />
            ))}
            <p>Selected: {JSON.stringify(cSelected)}</p>
          </SyncPageCard>
        </Col>
        <Col style={{ padding: '0px 50px' }}>
          <SyncPageCard>
            <h3>People who have finished:</h3>

            <h3>People who are still working:</h3>
          </SyncPageCard>
        </Col>
      </Row>
      <Row>
        <RoundButton
          textColor={theme.white}
          bgColor={theme.primary}
          dimension={100}
          margin="0px 20px"
        >
          <MicOff size={50} />
        </RoundButton>
        <RoundButton
          textColor={theme.white}
          bgColor={theme.error}
          dimension={100}
          margin="0px 20px"
        >
          <PhoneMissed size={50} />
        </RoundButton>
      </Row>
      <div></div>
    </SyncPageWrapper>
  );
};

const SyncPageWrapper = styled.div`
  background: url(${url.resolve(process.env.PUBLIC_URL || '', '/img/bg.jpg')})
    ${({ theme }) => theme.primary} no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: calc(100% - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ;
`;

const SyncPageCard = styled.div`
    ${BorderRadius}
    background-color: ${({ theme }) => `${theme.white}B0`};
    min-width: 300px;
    height: 100%;
    width: 30vw;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default withTheme(SyncPage);
