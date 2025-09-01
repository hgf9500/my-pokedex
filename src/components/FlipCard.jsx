import React, { useState } from 'react';
import styled from 'styled-components';

const FlipContainer = styled.div`
  background-color: transparent;
  width: 192px; /* 이미지 크기에 맞게 조정 */
  height: 192px;
  perspective: 1000px;
  margin: 1rem 0;
`;

const FlipInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const FlipButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  background-color: #3b82f6;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2563eb;
  }
`;

const FlipCard = ({ frontImage, backImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <FlipContainer>
        <FlipInner isFlipped={isFlipped}>
          <CardFace>
            <img src={frontImage} alt="앞모습" className="w-48 h-48" />
          </CardFace>
          <CardBack>
            <img src={backImage} alt="뒷모습" className="w-48 h-48" />
          </CardBack>
        </FlipInner>
      </FlipContainer>
      <FlipButton onClick={() => setIsFlipped(!isFlipped)}>
        뒤집기
      </FlipButton>
    </div>
  );
};

export default FlipCard;