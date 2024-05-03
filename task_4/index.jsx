import { useState } from "react";

export const Block1 = ({ mouseEnterCallback, imgSrc, imgAlt }) => {
  return (
    <BlockWrapper mouseEnterCallbak={mouseEnterCallback}>
      <img src={imgSrc} alt={imgAlt} />
    </BlockWrapper>
  );
};

export const Block2 = ({ mouseEnterCallback, content }) => {
  return (
    <BlockWrapper mouseEnterCallbak={mouseEnterCallback}>
      <p>{content}</p>
    </BlockWrapper>
  );
};

export const Block3 = ({ mouseEnterCallback, userData }) => {
  return (
      <BlockWrapper mouseEnterCallbak={mouseEnterCallback}>
        <address>
          country: {userData.country}, street: {userData.street}
        </address>
      </BlockWrapper>
  );
};

// создам обертку для блока который будет возвращать children компонент, и у которого есть своя логика
// так же добавил кастомный хук с логикой isActive
const BlockWrapper = (props) => {
  const {children, mouseEnterCallback} = props;
  const {isActive, mouseEnterHandler} = useMouseEnterActive(mouseEnterCallback);

  return (
      <div onMouseEnter={mouseEnterHandler} className={isActive ? "active" : ""}>
        {children}
      </div>
  )
}

const useMouseEnterActive = (mouseEnterCallback) => {
  const [isActive, setActive] = useState(false);

  const mouseEnterHandler = () => {
    setActive(true);
    mouseEnterCallback();
  };

  return {
    isActive,
    mouseEnterHandler
  }
}