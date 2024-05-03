import { Fragment, memo } from 'react';

// тут из-за того что каждый раз изменяется ссылка на функцию компонент перерисовывается
// нужно функцию обернуть в useCallback что бы сохранять/кэшировать ссылку на функцию
// вторым параметрам передаем пустой массив так как нету внешних значении
const MainComponent = () => {
    const makeLog = useCallback(() => console.log('hi from MainComponent'), []); // function to make logs from MainComponent

    return (
        <Fragment>
            <ChildComponent makeLog={makeLog} />
        </Fragment>
    );
};

// memoized component
const ChildComponent = memo(({ makeLog }) => (
    <button onClick={makeLog}>say Hi from ChildComponent</button>
));
