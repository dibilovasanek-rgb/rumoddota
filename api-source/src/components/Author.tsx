import React from "react";
import styled from "styled-components";
import { mix } from "polished";

const TextMessageAuthor = styled.div`
  max-width: 600px;
  border: 3px solid ${(props) => props.theme.authorEpitaph};
  border-radius: 3px;
  background: linear-gradient(
    to bottom,
    ${(props) => mix(0.15, props.theme.authorEpitaph, props.theme.group)},
    ${(props) => props.theme.group}
  );
  box-shadow: 2px 2px 4px #00000030;
  padding: 15px;
  margin: 50px 20px;
  align-self: center;
  font-size: 18px;
  color: ${(props) => props.theme.text};
  overflow-y: auto;
`;

export function Author() {
  return (
    <TextMessageAuthor>
      <p>
        Эту страницу создал <b>ark120202</b>, который, к сожалению, ушёл из жизни 29 ноября 2020 года в возрасте
        18.
      </p>
      <p>
        ark120202 was a pillar and champion of this community, he spent countless hours helping others, developing
        tools, and selflessly sharing his brilliance and intelligence to all that asked for help.
      </p>
      <p>Мы всегда будем помнить тебя. — сообщество ModdotaRU</p>
    </TextMessageAuthor>
  );
}
